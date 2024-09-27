const bcrypt = require('bcrypt')
const User = require("../models/user");
const jwt = require('jsonwebtoken');

const signUpUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "name, email and password are required"
            })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "user with this email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save()

        return res.status(201).json({
            message: 'user created successfully'
        })
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "email and password are required"
            })
        }

        const userDetails = await User.findOne({ email })

        if (!userDetails) {
            return res.status(400).json({
                message: "invalid email"
            });
        }

        const passwordMatch = await bcrypt.compare(password, userDetails.password);

        if (!passwordMatch) {
            return res.status(400).json({
                message: "password is incorrect"
            });
        }

        const token = jwt.sign(
            { userId: userDetails._id, name: userDetails.name, email: userDetails.email },
            process.env.SECRET_KEY
        )

        return res.status(200).json({
            message: "User successfully logged in",
            token: token
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { signUpUser, loginUser };