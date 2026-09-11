import User from '../db/models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config';

const jwtSecret = process.env.JWT_SECRET

export async function showRegister(req, res){
    res.render('auth/register')
}

export async function register(req, res) {
    try {
        const { name, username, password } = req.body;

        // Immediate JSON responses for validation failures
        if (!username || username.trim() === '') {
            return res.status(400).json({ message: 'Username is required.' });
        }
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Name is required.' });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, username, password: hashedPassword });

        return res.status(201).json({ 
            message: 'User created successfully', 
            user: { id: user._id, username: user.username } 
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Username already in use' });
        }
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function login(req, res){

    return res.render('auth/login')
}

export async function checkLogin(req, res) {
    try {
        const { username, password } = req.body;

        // Immediate JSON responses for validation failures
        if (!username || username.trim() === '') {
            return res.status(400).json({ message: 'Username is required.' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required.' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, is_admin: user.is_admin, username: user.username }, 
            jwtSecret, 
            { expiresIn: '1h' }
        );

        return res.status(200).json({ 
            message: 'Login successful', 
            token 
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export function logout(req, res){
    res.clearCookie('token');
    //res.json({ message: 'Logout successful.'});
    res.status(200).json({msg: "user logged out successfully"});
}