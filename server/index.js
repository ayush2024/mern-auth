const PORT = 8000;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('./Modals/User.js');

const app = express();
app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


require('./db.js')

app.post('/api/register', async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            res.status(400).send('Please fill all required fields');
        } else {
            const isExist = await User.findOne({ email });
            if (isExist)
                res.status(400).send('User already exists');
            else {
                // Create a new User object
                const newUser = new User({ fullName, email, loggedInTime: new Date() });

                // Set loggedInTime to the current time
                // const currentTime = new Date();
                // newUser.loggedInTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                // Hash the password
                bcrypt.hash(password, 10, async (err, hashPass) => {
                    if (err) {
                        return res.status(500).send('Error hashing password');
                    }
                    newUser.password = hashPass;

                    // Save the user to the database
                    await newUser.save();
                    next();
                });

                return res.status(200).send('User registered successfully...');
            }
        }
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).send('Internal server error');
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send('Please fill all required fields');
        } else {
            const user = await User.findOne({ email });
            if (!user) {
                res.status(400).send('User email or password is incorrect');
            } else {
                const validate = bcrypt.compare(password, user.password);
                if (!validate) {
                    res.status(400).send('User email or password is incorrect');
                } else {
                    // Update loggedInTime to the current time
                    // const currentTime = new Date();
                    // user.loggedInTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    user.loggedInTime = new Date();

                    // Generate JWT token
                    const payload = {
                        userId: user._id,
                        email: user.email
                    };
                    const JWT_SECRET_KEY = 'your_secret_key';
                    jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 43200 }, async (err, token) => {
                        if (err) {
                            console.error('Error generating token:', err);
                            res.status(500).send('Internal server error');
                        } else {
                            user.token = token;
                            await user.save();
                            res.status(200).json({ user: { id: user._id, email: user.email, fullName: user.fullName }, token });
                        }
                    });
                }
            }
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal server error');
    }
});

app.get('/api/logout/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Validate userId format
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Set the loggedOutTime to the current timestamp
        user.loggedOutTime = new Date();
        
        // Save the updated user document
        await user.save();

        res.clearCookie('jwtToken', { path: '/' });
        res.status(200).send("Logged Out");
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/api/dashboard', async (req, res) => {
    try {
        // Query the database to fetch all user data
        const allUsers = await User.find();

        // Send the data as a response to the frontend
        res.json(allUsers);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/favicon.ico', (req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})

