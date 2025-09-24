-- Employee Attendance & Activity Tracking DB Schema
-- PostgreSQL

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) UNIQUE NOT NULL -- Admin, HR, Manager, Employee
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    role_id INTEGER REFERENCES roles(id),
    phone VARCHAR(32),
    department VARCHAR(64),
    join_date DATE,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE shifts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_rotational BOOLEAN DEFAULT FALSE
);

CREATE TABLE rosters (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    shift_id INTEGER REFERENCES shifts(id),
    date DATE NOT NULL
);

CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    checkin_time TIMESTAMP,
    checkout_time TIMESTAMP,
    method VARCHAR(32), -- manual, qr, rfid, gps
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    is_late BOOLEAN DEFAULT FALSE,
    is_early_exit BOOLEAN DEFAULT FALSE,
    overtime_minutes INTEGER DEFAULT 0
);

CREATE TABLE leaves (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    type VARCHAR(32), -- sick, casual, etc
    start_date DATE,
    end_date DATE,
    status VARCHAR(16) DEFAULT 'pending', -- pending, approved, rejected
    applied_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_by INTEGER REFERENCES employees(id)
);

CREATE TABLE leave_balances (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    leave_type VARCHAR(32),
    balance INTEGER DEFAULT 0
);

CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    project VARCHAR(128),
    task VARCHAR(128),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    description TEXT,
    idle_minutes INTEGER DEFAULT 0,
    break_minutes INTEGER DEFAULT 0
);

CREATE TABLE policies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    value TEXT,
    description TEXT
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    message TEXT,
    sent_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(32) -- email, push
);

CREATE TABLE integrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64),
    config JSONB
);

-- For bulk import/export logs
CREATE TABLE import_export_logs (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    action VARCHAR(32), -- import, export
    file_name VARCHAR(128),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- For geofencing
CREATE TABLE geofences (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    radius_meters INTEGER
);

-- For screen/app/website usage logs (optional, MongoDB recommended)
-- If using PostgreSQL, you can add:
CREATE TABLE usage_logs (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    log_time TIMESTAMP,
    app_name VARCHAR(128),
    website_url VARCHAR(256),
    duration_minutes INTEGER
);