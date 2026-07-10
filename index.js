const express = require("express");
const mong = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
// 1. Load and configure dotenv
require('dotenv').config();

const { User,Course,Teacher,Student } = require('./model');

const app = express();
app.use(express.json()); // middleware to parse JSON bodies

// Database connection
mong.connect("mongodb://127.0.0.1:27017/Collegedbs2")
  .then(() => console.log("Connected to Collegedbs database successfully!"))
  .catch((err) => console.error("Database connection error:", err));



//Get Method implemention 

app.get('/api/students', async (req, res) => {
    try {
        const liststudents = await Student.find();
        res.status(200).json({
            message1:"list of students",
            data : liststudents
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// GET a Specific Student by ID
app.get('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        //4 = > True
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        
        res.status(200).json(student);
    } catch (error) {
        // Catches casting errors if the passed ID string is invalid
        res.status(500).json({ error: error.message });
    }
});



// UPDATE a Student (PUT)
app.put('/api/students/:id', async (req, res) => {
    try {
        // { new: true } returns the modified document instead of the old one
        // { runValidators: true } ensures the update updates match your schema definitions
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id, 
            req.body
        )

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({msg:"student updated",
                      data:req.body
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// 🚀 NEW: Route to Add and Save a Student

app.post("/api/students", async (req, res) => {
  try {
    // 1. Create a new student instance using data sent in the request body
    const newStudent = new Student({
      name: req.body.name,
      rollno: req.body.rollno,
      email: req.body.email // If empty, it defaults to "xyz@gmail.com"
    });

    // 2. Save the document to the MongoDB database
    const savedStudent = await newStudent.save();

    // 3. Send back a success response
    res.status(201).json({
      message: "Student added successfully!",
      data: savedStudent
    });
  } catch (error) {
    // Handle validation or connection errors
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/students/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ 
            message: "Student record deleted successfully", 
            deletedStudent 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// REGISTER API Implementation
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // const name = req.body.name
        // const email = req.body.email

        // 1. Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already registered with this email" });
        }
        // 2. Hash the password (Salt rounds = 10)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // 3. Create and save the user
        const newUser = new User({
            name:name,
            email:email,
            password: hashedPassword,
            role:role
        });
        await newUser.save();//save changes into the db
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Implementing login api 

// LOGIN User & Generate JWT Token
app.post('/api/auth/login', async (req, res) => {
    try {
        console.log("inside the login server");
        const { email, password } = req.body;
        // 1. Verify if user exists
        //hasing 
        const user = await User.findOne({ email:email});//true false
        if (!user) {
            return res.status(400).json({ message: "Invalid Email " });
        }
        // 2. Check if the password matches the hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid  Password" });
        }
    
        // 3. Generate a JWT Token
        // Payload contains the user ID and role
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
             process.env.JWT_SECRET, 
            { expiresIn: '1h' } // Token expires in 1 hour
        );
        // 4. Send token back to the client
        res.status(200).json({
            message: "Login successful!",
            token: token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});