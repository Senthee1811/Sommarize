-- Failed query:
CREATE extension IF NOT exists "uuid-ossp"; 

--USER TABLE 
CREATE TABLE  IF NOT EXISTS  users(
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     email varchar(255) unique NOT NULL,
     created_at timestamptz  default current_timestamp,
     updated_at timestamptz  default current_timestamp,
     fullname varchar(255) ,
     customer_id varchar(255) unique ,
     price_id varchar(255),
     status varchar(50) default 'inactive'
     );
     
  --PDF SUMMARIES TABLE 
  CREATE TABLE IF NOT EXISTS pdf_summaries(
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id varchar(255)  NOT NULL,
     original_file_url TEXT NOT NULL,
     summarytext TEXT NOT NULL,
     created_at timestamptz  DEFAULT current_timestamp,
     updated_at timestamptz  DEFAULT current_timestamp,
     title TEXT ,
     file_name TEXT ,
     status varchar(50) default 'completed'
     ); 

--PAYMENTS TABLE 
CREATE TABLE IF NOT EXISTS  payments(
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     amount integer  NOT NULL,
     status varchar(50) NOT NULL,
     stripe_payment_id varchar(255) unique NOT NULL,
     price_id varchar(255) NOT NULL,
     user_email varchar(255) NOT NULL references users(email),
     created_at timestamptz default current_timestamp,
     updated_at timestamptz default current_timestamp
     );  

--CREATE TRIGGER FUNCTION 
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := current_timestamp;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--DROPPING TRIGGERS 
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_pdf_summaries_updated_at ON pdf_summaries;
DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;

--ADD TRIGGER FUNCTION 

CREATE TRIGGER   update_users_updated_at 
BEFORE UPDATE ON users 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column(); 

CREATE TRIGGER update_pdf_summaries_updated_at 
BEFORE UPDATE ON pdf_summaries 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column(); 

CREATE TRIGGER update_payments_updated_at 
BEFORE UPDATE ON payments 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();


  