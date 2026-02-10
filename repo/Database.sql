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
  file_path TEXT NOT NULL,
  file_type TEXT,
  file_size INT,
  status TEXT CHECK (status IN ('pending','approved','rejected')) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now(),
  reviewed_at TIMESTAMP
);

-- Alter

ALTER TABLE documents
ADD COLUMN file_base64 TEXT;

ALTER TABLE documents
ALTER COLUMN file_path DROP NOT NULL;
