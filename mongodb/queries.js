
use student_management;


const courseId      = db.courses.findOne({ name: 'Data Structures' })._id;
const extraCourseId = db.courses.findOne({ name: 'Operating Systems' })._id;
// 1. Insert a student — Already done in sampleData.js

// 2. Update address (embedded)
db.students.updateOne(
  { name: 'Renusree' },
  { $set: { address: { street: '17 Brigade Rd', city: 'Bengaluru', state: 'KA', pincode: '560025' } } }
);

// 3. Find student by name
db.students.find({ name: 'Renusree' });

// 4. Update phone number
db.students.updateOne({ name: 'Renusree' },{ $set: { phone: '9440543707' } }
);

// 5. Add a new course (optional second course)
const extraCourseId = new ObjectId();
db.courses.insertOne({
  _id: extraCourseId,
  name: 'Operating Systems',
  description: 'Threads, memory, scheduling'
});

// 6. Enroll Renusree in a course
db.students.updateOne(
  { name: 'Renusree' },
  { $addToSet: { enrollments: courseId } }
);

// 7. Get all students enrolled in a specific course
db.students.find({ enrollments: courseId }).pretty();

// 8. Add marks for Renusree in a course
db.students.updateOne(
  { name: 'Renusree' },
  { $push: { marks: { courseId: courseId, score: 95 } } }
);

// 9. Get Renusree’s address
db.students.find({ name: 'Renusree' }, { _id: 0, address: 1 });

// 10. Get courses Renusree is enrolled in
const enrollments = db.students.findOne({ name: 'Renusree' }).enrollments;

db.courses.find({ _id: { $in: enrollments } }).pretty();


// 11. Get marks for a specific course
db.students.aggregate([
  { $match: { name: 'Renusree' } },
  { $unwind: '$marks' },
  { $match: { 'marks.courseId': courseId } },
  { $project: { score: '$marks.score', _id: 0 } }
]);

// 12. List students with more than 3 enrollments
db.students.aggregate([
  { $project: { name: 1, count: { $size: '$enrollments' } } },
  { $match: { count: { $gt: 3 } } }
]).pretty();

// 13. Delete a student
db.students.deleteOne({ name: 'Renusree' });

// Re inserted as we deleted earlier 
db.students.insertOne({
  name: 'Renusree',
  email: 'renusree@gitam.edu',
  phone: '9440543707',
  address: {
    street: '17 Brigade Rd',
    city: 'Bengaluru',
    state: 'KA',
    pincode: '560025'
  },
  enrollments: [],
  marks: [],
  graduated: false
});
db.students.updateOne(
  { name: 'Renusree' },
  { $push: { 
      marks: { $each: [
        { courseId: courseId, score: 95 },
        { courseId: extraCourseId, score: 91 }
      ]}
    }
  }
);
//  Re-add enrollments
db.students.updateOne(
  { name: 'Renusree' },
  { $addToSet: { enrollments: { $each: [courseId, extraCourseId] } } }
);


// 14. Remove a course from enrollment
db.students.updateOne(
  { name: 'Renusree' },
  { $pull: { enrollments: courseId } }
);

// 15. Update city in address
db.students.updateOne(
  { name: 'Renusree' },
  { $set: { 'address.city': 'Bangalore' } }
);

// 16. Count students per course
db.students.aggregate([
  { $unwind: '$enrollments' },
  { $group: { _id: '$enrollments', studentCount: { $sum: 1 } } }
]);

// 17. Students from a specific city
db.students.find({ 'address.city': 'Bangalore' });

// 18. Sort students by name
db.students.find().sort({ name: 1 });

// 19. Add 'graduated' field
db.students.updateMany({}, { $set: { graduated: false } });

// 20. Students scoring more than 90
db.students.find({ 'marks.score': { $gt: 90 } });

// 21. Average marks per student
db.students.aggregate([
  { $match: { name: 'Renusree' } },
  { $unwind: '$marks' },
  { $group: { _id: '$name', average: { $avg: '$marks.score' } } }
]);

// 22. Group students by city
db.students.aggregate([
  { $group: { _id: '$address.city', students: { $push: '$name' }, count: { $sum: 1 } } }
]);

// 23. Check if enrolled in course
db.students.findOne({ name: 'Renusree', enrollments: courseId }) !== null;

// 24. Add multiple courses
db.students.updateOne(
  { name: 'Renusree' },
  { $addToSet: { enrollments: { $each: [courseId, extraCourseId] } } }
);

// 25. Students not enrolled in any course
db.students.find({ enrollments: { $size: 0 } });

// 26. Top 3 scorers in a course
db.students.aggregate([
  { $unwind: '$marks' },
  { $match: { 'marks.courseId': courseId } },
  { $sort: { 'marks.score': -1 } },
  { $limit: 3 },
  { $project: { name: 1, score: '$marks.score' } }
]);

// 27. Students with total marks
db.students.aggregate([
  { $unwind: '$marks' },
  { $group: { _id: '$name', total: { $sum: '$marks.score' } } }
]);

// 28. Students with number of courses
db.students.aggregate([
  { $project: { name: 1, courseCount: { $size: '$enrollments' } } }
]);

// 29. Students who failed (score < 40)
db.students.find({ 'marks.score': { $lt: 40 } });

// 30. Delete marks for a specific course
db.students.updateMany(
  {},
  { $pull: { marks: { courseId: courseId } } }
);
