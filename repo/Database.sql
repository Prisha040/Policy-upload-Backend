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



