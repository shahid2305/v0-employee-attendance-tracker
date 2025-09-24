-- Create tables for the employee attendance tracker

-- Roles table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Employees table
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance table
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id),
    check_in TIMESTAMP WITH TIME ZONE NOT NULL,
    check_out TIMESTAMP WITH TIME ZONE,
    method VARCHAR(50),
    location GEOGRAPHY(Point, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leaves table
CREATE TABLE leaves (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    type VARCHAR(50) NOT NULL,
    reason TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities table
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id),
    project_id UUID REFERENCES projects(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaves ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for employees table
CREATE POLICY "Employees can view their own record." ON employees
    FOR SELECT
    USING (id = auth.uid());

CREATE POLICY "Employees can update their own record." ON employees
    FOR UPDATE
    USING (id = auth.uid());

-- Create RLS policies for attendance table
CREATE POLICY "Attendance records can be viewed by the employee." ON attendance
    FOR SELECT
    USING (employee_id = auth.uid());

CREATE POLICY "Attendance records can be inserted by the employee." ON attendance
    FOR INSERT
    WITH CHECK (employee_id = auth.uid());

CREATE POLICY "Attendance records can be updated by the employee." ON attendance
    FOR UPDATE
    USING (employee_id = auth.uid());

-- Create RLS policies for leaves table
CREATE POLICY "Leaves can be viewed by the employee." ON leaves
    FOR SELECT
    USING (employee_id = auth.uid());

CREATE POLICY "Leaves can be inserted by the employee." ON leaves
    FOR INSERT
    WITH CHECK (employee_id = auth.uid());

CREATE POLICY "Leaves can be updated by the employee." ON leaves
    FOR UPDATE
    USING (employee_id = auth.uid());

-- Create RLS policies for activities table
CREATE POLICY "Activities can be viewed by the employee." ON activities
    FOR SELECT
    USING (employee_id = auth.uid());

CREATE POLICY "Activities can be inserted by the employee." ON activities
    FOR INSERT
    WITH CHECK (employee_id = auth.uid());

CREATE POLICY "Activities can be updated by the employee." ON activities
    FOR UPDATE
    USING (employee_id = auth.uid());

-- Create RLS policies for projects table
CREATE POLICY "Projects can be viewed by the employee." ON projects
    FOR SELECT
    USING (EXISTS (SELECT 1 FROM activities WHERE activities.project_id = projects.id AND activities.employee_id = auth.uid()));

-- Seed data for roles table
INSERT INTO roles (name) VALUES
('Admin'),
('HR'),
('Manager'),
('Employee');
