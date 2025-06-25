CREATE TABLE student (
  id INT PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT 
);

CREATE TABLE address (
  student_id INT PRIMARY KEY,
  street TEXT,
  city TEXT,
  state TEXT,
  FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE
);

CREATE TABLE course (
  id INT PRIMARY KEY,
  name TEXT,
  description TEXT
);

CREATE TABLE enrollment (
  student_id INT,
  course_id INT,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES course(id)
);

CREATE TABLE marks (
  student_id INT,
  course_id INT,
  score INT,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES course(id)
);
