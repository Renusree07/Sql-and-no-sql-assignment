use student_management;

db.dropDatabase(); // clean start

// Add two courses
const courseId = ObjectId();
const extraCourseId = ObjectId();

db.courses.insertMany([
  {
    _id: courseId,
    name: 'Data Structures',
    description: 'Stacks, queues, graphs'
  },
  {
    _id: extraCourseId,
    name: 'Operating Systems',
    description: 'Threads, memory, scheduling'
  }
]);

// Insert one student
db.students.insertOne({
  name: 'Renusree',
  email: 'renusree@gitam.edu',
  phone: '9440112233',
  address: {
    street: '12 MG Road',
    city: 'Bengaluru',
    state: 'KA',
    pincode: '560001'
  },
  enrollments: [courseId],
  marks: [{ courseId: courseId, score: 95 }],
  graduated: false
});

