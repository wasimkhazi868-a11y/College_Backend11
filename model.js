const mong = require("mongoose");

// Schemas
const teacherSchema = new mong.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  experience: { type: Number, default: 0 }
});

const studentSchema = new mong.Schema({
  name: { type: String, required: true },
  rollno: { type: Number, required: true },
  email: { type: String, default: "xyz@gmail.com" }
});

const courseSchema = new mong.Schema({
  title: { type: String, required: true },
  code: { type: Number, required: true },
  credits: { type: Number, default: 100 }
});

const userSchema = new mong.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' }
});

// Models
const Teacher = mong.model('Teacher', teacherSchema);
const Student = mong.model('Student', studentSchema);
const Course = mong.model('Course', courseSchema);
const User =   mong.model('User', userSchema);

//export Teacher,Student,Course,User 
module.exports = { User, Course, Teacher, Student };