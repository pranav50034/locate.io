"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
if (process.env.MONGODB_URI) {
    mongoose_1.default
        .connect(process.env.MONGODB_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.error("Error connecting to MongoDB:", err));
}
const UserModel = mongoose_1.default.model("users", new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: Object, required: true },
}));
const app = (0, express_1.default)();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Specify the allowed origin
    credentials: true, // Allow credentials
}));
app.use((0, cookie_parser_1.default)());
// Register route
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user already exists
        const existingUser = yield UserModel.findOne({
            username: req.body.username,
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 10);
        // Create a new user object
        const user = new UserModel({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
            location: req.body.location,
        });
        // Save the user to the database
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user._id, location: user.location, name: user.name, username: user.username }, JWT_SECRET);
        return res
            .status(201)
            .json({ token, message: "User registered successfully!" });
    }
    catch (_a) {
        return res.status(500).send();
    }
}));
// Login route
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel.findOne({ username: req.body.username });
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    try {
        if (yield bcryptjs_1.default.compare(req.body.password, user.password)) {
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET);
            res.status(201).json({ token });
        }
        else {
            return res.json({ message: "Incorrect Password!" });
        }
    }
    catch (_b) {
        return res.status(500).json({ message: "Network Error!" });
    }
}));
app.get("/userdata", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies["authToken"];
    if (!token) {
        return res.status(401).json({ message: "No token provided!" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = yield UserModel.findById(decoded.userId);
        return res.status(200).json({ username: user === null || user === void 0 ? void 0 : user.username, name: user === null || user === void 0 ? void 0 : user.name, location: user === null || user === void 0 ? void 0 : user.location });
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}));
app.get('/get-all-users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel.find();
    res.status(200).json(users);
}));
app.put("/update-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, newName, newUsername } = req.body;
        let user;
        if (newName) {
            user = yield UserModel.findOneAndUpdate({ username }, {
                name: newName,
            }, {
                new: true,
            });
        }
        else if (newUsername) {
            user = yield UserModel.findOneAndUpdate({ username }, {
                username: newUsername,
            }, {
                new: true,
            });
        }
        else if (newName && newUsername) {
            user = yield UserModel.findOneAndUpdate({ username }, {
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
        }
        else {
            return res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}));
app.post("/logout", (req, res) => {
    try {
        res.clearCookie("authToken");
        return res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
