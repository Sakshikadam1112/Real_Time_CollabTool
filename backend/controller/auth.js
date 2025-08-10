import User from "../model/user.js"
import jwt from "jsonwebtoken"
const secKey = "Rakshitb";


const handleSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        
        await User.create({
            name,
            email,
            password
        })
        // const token = jwt.sign(
        //     { email: user.email, _id: user._id },
        //     secKey,
        //     { expiresIn: '1h' }
        // )
        res.status(201)
            .json({
                message: "Signup successfully",
                // token:token,
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false,
                
                err:err
            })
    }
}


const handleSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password});
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const token = jwt.sign(
            { email: user.email, _id: user._id },
            secKey,
            { expiresIn: '1h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                token:token,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

export {
    handleSignUp,
    handleSignIn
}