  🎓 Student Management System — SQL & NoSQL Assignment

This project demonstrates basic CRUD operations, data relationships, and queries using both   MongoDB   (NoSQL) and   PostgreSQL   (SQL). It simulates a student management system with tables/collections for students, courses, enrollments, marks, and addresses.

---

   📁 Project Structure

 
student-management-system/
├── mongodb/
│   ├── sampleData.js         Sample student, course, and enrollment documents
│   ├── queries.js            MongoDB queries for updates, retrievals, and aggregations
├── postgresql/
│   ├── schema.sql            SQL schema for tables and relationships
│   ├── queries.sql           SQL queries for CRUD operations and analysis
│   ├── reset.sql             Script to drop all tables for fresh re-runs


---

   🟢 MongoDB Setup

       1. Start MongoDB Server
bash
mongod
 

       2. Open Another Terminal and Enter Shell
bash
mongosh
 

       3. Load Sample Data
bash
mongosh < mongodb/sampleData.js
 

       4. Run MongoDB Queries
bash
mongosh < mongodb/queries.js
 

---

   🟣 PostgreSQL Setup

       1. Create the Database
Connect to PostgreSQL and run:
 sql
CREATE DATABASE student_db;
 

       2. Apply Schema
From terminal:
bash
psql -U postgres -d student_db -f postgresql/schema.sql
 

       3. Run Queries
bash
psql -U postgres -d student_db -f postgresql/queries.sql
 

       4. (Optional) Reset Tables
If you want to reset the database by dropping all tables:

bash
psql -U postgres -d student_db -f postgresql/reset.sql
 

---

  📌 Features Covered

- Student data insertion and updates
- Address handling (1:1 mapping)
- Course management
- Enrollment (Many-to-Many relationships)
- Marks (Composite keys)
- Aggregations and filters (e.g., average scores, top scorers, grouping by city)

---

  🧑‍💻 Author

  Renusree    
