-- 1. Insert student
INSERT INTO student (id, name, email, phone)
VALUES (1, 'Renusree', 'renusree@gitam.edu', '9440112233');
INSERT INTO student (id, name, email, phone)
VALUES (2, 'shyam', 'shyam@gitam.edu', '9420412234');

-- 2. Insert address
INSERT INTO address (student_id, street, city, state)
VALUES (1, '12 MG Road', 'Bengaluru', 'KA');

-- 3. Fetch by name
SELECT * FROM student WHERE name = 'Renusree';

-- 4. Update phone
UPDATE student SET phone = '9440543707' WHERE name = 'Renusree';

-- 5. Insert a course
INSERT INTO course (id, name, description)
VALUES (101, 'Data Structures', 'Stacks, queues, trees, graphs');

-- 6. Enroll Renusree
INSERT INTO enrollment (student_id, course_id) VALUES (1, 101);

-- 7. Students in a course
SELECT s.* FROM student s
JOIN enrollment e ON s.id = e.student_id
WHERE e.course_id = 101;

-- 8. Insert marks
INSERT INTO marks (student_id, course_id, score) VALUES (1, 101, 95);

-- 9. Address by student ID
SELECT * FROM address WHERE student_id = 1;

-- 10. Courses for Renusree
SELECT c.* FROM course c
JOIN enrollment e ON c.id = e.course_id
WHERE e.student_id = 1;

-- 11. Marks for Renusree in a course
SELECT score FROM marks WHERE student_id = 1 AND course_id = 101;

-- 12. Students with >3 enrollments
SELECT s.id, s.name, COUNT(*) AS count
FROM student s
JOIN enrollment e ON s.id = e.student_id
GROUP BY s.id, s.name
HAVING COUNT(*) > 3;

-- 13. Delete Renusree
DELETE FROM student WHERE name = 'Renusree';

-- 14. Remove enrollment
DELETE FROM enrollment WHERE student_id = 1 AND course_id = 101;

-- 15. Update address city
UPDATE address SET city = 'Bangalore' WHERE city = 'Bengaluru';

-- 16. Students per course
SELECT course_id, COUNT(*) AS total
FROM enrollment
GROUP BY course_id;

-- 17. Students from Bangalore
SELECT s.* FROM student s
JOIN address a ON s.id = a.student_id
WHERE a.city = 'Bangalore';

-- 18. Sort by name
SELECT * FROM student ORDER BY name;

-- 19. Add graduated column
ALTER TABLE student ADD COLUMN graduated BOOLEAN DEFAULT FALSE;

-- 20. Students scoring >90
SELECT DISTINCT s.* FROM student s
JOIN marks m ON s.id = m.student_id
WHERE m.score > 90 AND s.name = 'Renusree';

-- 21. Average marks
SELECT s.id, s.name, AVG(m.score) AS avg_score
FROM student s
JOIN marks m ON s.id = m.student_id
WHERE s.name = 'Renusree'
GROUP BY s.id, s.name;

-- 22. Group by city
SELECT a.city, COUNT(*) AS count
FROM address a
JOIN student s ON s.id = a.student_id
GROUP BY a.city;

-- 23. Check if enrolled
SELECT EXISTS (
  SELECT 1 FROM enrollment
  WHERE student_id = 1 AND course_id = 101
);

-- 24. Bulk enroll
INSERT INTO course (id, name, description)
VALUES 
  (102, 'Operating Systems', 'Threads, memory, scheduling'),
  (103, 'DBMS', 'SQL, transactions, indexing'),
  (104, 'Computer Networks', 'Protocols, TCP/IP, routing');
INSERT INTO enrollment (student_id, course_id)
VALUES (2, 102), (2, 103), (2, 104);

-- 25. Students with no enrollment
SELECT s.* FROM student s
LEFT JOIN enrollment e ON s.id = e.student_id
WHERE e.course_id IS NULL;

-- 26. Top 3 scorers in a course
SELECT s.name, m.score
FROM student s
JOIN marks m ON s.id = m.student_id
WHERE m.course_id = 101
ORDER BY m.score DESC
LIMIT 3;

-- 27. Students + total marks
SELECT s.name, SUM(m.score) AS total
FROM student s
JOIN marks m ON s.id = m.student_id
GROUP BY s.name;

-- 28. Students + number of enrollments
SELECT s.name, COUNT(e.course_id) AS course_count
FROM student s
LEFT JOIN enrollment e ON s.id = e.student_id
GROUP BY s.name;

-- 29. Students who failed
SELECT DISTINCT s.name
FROM student s
JOIN marks m ON s.id = m.student_id
WHERE m.score < 40;

-- 30. Delete all marks for course
DELETE FROM marks WHERE course_id = 101;
