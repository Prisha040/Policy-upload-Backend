-- Create database
CREATE DATABASE policy_db;

-- Use database
\c policy_db;

-- =========================================
-- Table: documents
-- =========================================
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  file_name TEXT NOT  NULL,
  file_type TEXT,
  file_size INT,
  status TEXT CHECK (status IN ('pending','approved','rejected')) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now(),
  Created_by TEXT,
  reviewed_at TIMESTAMP,
  reviewed_by TEXT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL
);

INSERT INTO users (email, password, role)
VALUES
('hr@test.com','123456','HR'),
('manager@test.com','123456','MANAGER'),
('emp@test.com','123456','EMPLOYEE');
 


