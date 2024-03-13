import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();


interface User extends mongoose.Document {
   username: string;
   password: string;
   name: string;
   location: { lat: number; long: number };
}
if (process.env.MONGODB_URI) {
   mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("Error connecting to MongoDB:", err));
}

const UserModel = mongoose.model<User>(
   "users",
   new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String, required: true },
      location: { type: Object, required: true },
   })
);

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(
   cors({
      origin: "http://localhost:5173", // Specify the allowed origin
      credentials: true, // Allow credentials
   })
);
app.use(cookieParser());

// Register route
app.post("/register", async (req, res) => {
   try {
      // Check if user already exists
      const existingUser = await UserModel.findOne({
         username: req.body.username,
      });
      if (existingUser) {
         return res.status(400).json({ message: "User already exists!" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user object
      const user = new UserModel({
         name: req.body.name,
         username: req.body.username,
         password: hashedPassword,
         location: req.body.location,
      });

      // Save the user to the database
      await user.save();
      const token = jwt.sign(
         { userId: user._id, location: user.location, name: user.name, username: user.username },
         JWT_SECRET
      );
      return res
         .status(201)
         .json({ token, message: "User registered successfully!" });
   } catch {
      return res.status(500).send();
   }
});

// Login route
app.post("/login", async (req, res) => {
   const user = await UserModel.findOne({ username: req.body.username });
   if (!user) {
      return res.status(404).json({ message: "User not found!" });
   }
   try {
      if (await bcrypt.compare(req.body.password, user.password)) {
         const token = jwt.sign({ userId: user._id }, JWT_SECRET);
         res.status(201).json({ token });
      } else {
         return res.json({ message: "Incorrect Password!" });
      }
   } catch {
      return res.status(500).json({ message: "Network Error!" });
   }
});

interface DecodedToken {
   [key: string]: any;
}

app.get("/userdata", async (req, res) => {
   const token = req.cookies["authToken"];
   if (!token) {
      return res.status(401).json({message: "No token provided!"})
   }

   try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
      const user = await UserModel.findById(decoded.userId);
      
      return res.status(200).json({username: user?.username, name: user?.name, location: user?.location});
   } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
   }
});

app.get('/get-all-users', async (req, res) => {
   const users = await UserModel.find();
   res.status(200).json(users);
})

app.put("/update-user", async (req, res) => {
   try {
      const { username, newName, newUsername } = req.body;

      let user;
      if(newName) {
         user = await UserModel.findOneAndUpdate({username}, {
            name: newName,
         }, {
            new: true,
         });
      }else if(newUsername){
         user = await UserModel.findOneAndUpdate({ username }, {
            username: newUsername,
         }, {
            new: true,
         });
      }else if (newName && newUsername) {
         user = await UserModel.findOneAndUpdate({ username }, {
            name: newName,
            username: newUsername,
         }, {
            new: true,
         });
      }

      if (user) {
         return res
            .status(200)
            .json({ message: "User updated successfully", user });
      } else {
         return res.status(404).json({ message: "User not found" });
      }
   } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
   }
});

app.post("/logout", (req, res) => {
   try {
      res.clearCookie("authToken");
      return res.status(200).json({ message: "Logged out successfully" });
   } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
   }
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});

