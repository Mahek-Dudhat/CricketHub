const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

console.log("MongoDB URI:", process.env.MONGODB_URL);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Player Schema
const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    team: { type: String, required: true },
    role: { type: String, required: true },
    battingStyle: String,
    bowlingStyle: String,
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    matches: { type: Number, default: 0 },
    image: String,
    createdAt: { type: Date, default: Date.now }
});

const Player = mongoose.model('Player', playerSchema);

// Team Schema
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ranking: { type: Number, required: true },
    points: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    flag: String,
    createdAt: { type: Date, default: Date.now }
});

const Team = mongoose.model('Team', teamSchema);

// Match Schema
const matchSchema = new mongoose.Schema({
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
    time: String,
    status: { type: String, enum: ['live', 'upcoming', 'completed'], default: 'upcoming' },
    result: String,
    createdAt: { type: Date, default: Date.now }
});

const Match = mongoose.model('Match', matchSchema);

// Middleware to verify token
const verifyToken = (req, res, next) => {
    //  console.log("Verifying Token: ",process.env.JWT_SECRET);
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });


    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        req.userId = decoded.id;
        req.isAdmin = decoded.isAdmin;
        next();
    });
};

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
    if (!req.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

// ========== AUTH ROUTES ==========

// Register
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ========== PLAYER ROUTES ==========

// Get all players
app.get('/api/players', async (req, res) => {
    try {
        const players = await Player.find().sort({ createdAt: -1 });
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Add player (Admin only)
app.post('/api/players', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const player = new Player(req.body);
        await player.save();
        res.status(201).json(player);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update player (Admin only)
app.put('/api/players/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const player = await Player.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(player);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete player (Admin only)
app.delete('/api/players/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        await Player.findByIdAndDelete(req.params.id);
        res.json({ message: 'Player deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ========== TEAM ROUTES ==========
// Get all teams
app.get('/api/teams', async (req, res) => {
    try {

        const teams = await Team.find().sort({ ranking: 1 });
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Add team (Admin only)
app.post('/api/teams', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update team (Admin only)
app.put('/api/teams/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(team);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete team (Admin only)
app.delete('/api/teams/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        res.json({ message: 'Team deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ========== MATCH ROUTES ==========

// Get all matches
app.get('/api/matches', async (req, res) => {
    try {
        const matches = await Match.find().sort({ date: 1 });
        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Add match (Admin only)
app.post('/api/matches', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const match = new Match(req.body);
        await match.save();
        res.status(201).json(match);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update match (Admin only)
app.put('/api/matches/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const match = await Match.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(match);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete match (Admin only)
app.delete('/api/matches/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        await Match.findByIdAndDelete(req.params.id);
        res.json({ message: 'Match deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
