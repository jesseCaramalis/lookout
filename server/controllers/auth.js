import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Store from "../models/Store.js";

//REGISTER USER
export const register = async (req, res) => {
    try {
        console.log(req.body)
        const {
            firstName,
            lastName,
            email,
            password,
            store,
        } = req.body;

        //Hash password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            store: await Store.findOne({ storeName: store })._id,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); //if something has been created, sends json version of savedUser.

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// LOGGING IN

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email }); //finds user in db with email matching login email
        if (!user) return res.status(400).json({ msg: "User does not exist. "});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. "});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET) //creates jwt sign in token
        delete user.password; //deletes user password in scope of this try block, so it isn't sent back to the front end unencrypted.
        res.status(200).json({ token, user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}