CREATE DATABASE courses_students;

DROP TABLE students, courses, student_courses

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone BIGINT UNIQUE NOT NULL
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  level VARCHAR(50) DEFAULT 'Standart'
);

CREATE TABLE student_courses (
  student_id INTEGER REFERENCES students(id) NOT NULL,
  course_id INTEGER REFERENCES courses(id) NOT NULL,
  PRIMARY KEY (student_id, course_id)
)


INSERT INTO courses(title, level) VALUES
('Backend Node.js', 'Bootcamp'),
('Frontend React.js', 'Standart'),
('QA', 'Beginner'),
('SMM', 'Beginner'),
('React Native', 'Advanced');

SELECT * FROM courses

INSERT INTO students(name, phone) VALUES
('Akbar', 900990099),
('Kamal', 777000777),
('Nimajon', 777020777),
('Kimjon', 700020777),
('Mario', 977999797) RETURNING *;

SELECT * FROM students

INSERT INTO student_courses(student_id, course_id) VALUES
(1, 2),
(2, 2),
(3, 4),
(5, 5),
(4, 5),
(3, 3);

SELECT * FROM student_courses

SELECT
    students.id student_id,
    courses.id course_id,
    name student_name,
    phone student_phone,
    title course_title,
    level course_level
FROM student_courses
JOIN students
ON student_courses.student_id = students.id
JOIN courses
ON student_courses.course_id = courses.id


BEGIN;
WITH inserted_student AS (
  INSERT INTO students(name, phone)
  VALUES ('Black boy 👨🏿', 110111101)
  RETURNING id
),

inserted_courses AS (
  INSERT INTO courses(title, level)
  VALUES 
    ('Prompt Engineering', 'Bootcamp'),
    ('Graphic Design', DEFAULT)
  RETURNING id
)

INSERT INTO student_courses(student_id, course_id) SELECT s.id, c.id FROM inserted_student s, inserted_courses c;

COMMIT;


SELECT
 c.id,
 c.title,
 c.level,
 COUNT(sc.student_id) AS students_count
 FROM student_courses AS sc
 JOIN courses AS c
 ON sc.course_id = c.id
 GROUP BY c.id, c.title, c.level
 ORDER BY students_count DESC
 LIMIT 1;