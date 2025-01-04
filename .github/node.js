const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Database setup
mongoose.connect('mongodb://localhost:27017/biometrics', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    faceImage: String, // Store as a Base64 string or a path to the image file
    digitalSignature: String
});

const User = mongoose.model('User', userSchema);

// File upload setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Save user data
app.post('/register', upload.single('faceImage'), async (req, res) => {
    try {
        const { firstName, lastName, digitalSignature } = req.body;
        const faceImage = req.file ? req.file.buffer.toString('base64') : null;

        const user = new User({ firstName, lastName, faceImage, digitalSignature });
        await user.save();
        res.status(200).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
