const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/biometricsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define user schema and model
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    biometrics: [Array], // Array of face descriptors
    profilePicture: String, // Base64 string or image URL
    signature: String, // Base64 string or image URL
    createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model('User', userSchema);

// API to register a user
app.post('/register', async (req, res) => {
    const { firstName, lastName, biometrics, profilePicture, signature } = req.body;
    try {
        const user = new User({ firstName, lastName, biometrics, profilePicture, signature });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error registering user', error });
    }
});

// API to get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching users', error });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
