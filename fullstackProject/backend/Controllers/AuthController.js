const bcrypt = require('bcrypt');
const UserModel = require("../Models/user");
const jwt = require('jsonwebtoken');
const authRouter = require('../Routes/authRouter');



const signup = async (req, res) => {
    try {
        console.log("message", req.body)
        const obj = req.body;
        const { firstname, email, password, mobileno } = obj;
        const user = await UserModel.findOne({ "email": email });
        if (user) {
            return res.status(400)
                .json({ message: "user Already exists", success: false });
        }

        const userModel = new UserModel({ firstname: firstname, email: email, password: password, mobileno: mobileno });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({ message: "signup successfully", success: true })
    } catch (err) {
        res.status(500)
        console.log("err", err)
            .json({
                message: "internal server error",
                success: false
            })
    }
}
const login = async (req, res) => {
    try {
        // console.log("error part", req.body);
        // const obj2 = req.body;
        const { email, password } = req.body; //pass come from db
        const user = await UserModel.findOne({ "email": email });
        const errorMessage = "auth is failed email or password is wrong";
        if (!user) {
            console.log("error part",);
            return res.status(403)
                .json({ message: errorMessage, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password); // comes from client
        if (!isPassEqual) {
            console.log("error part 2");
            return res.status(403)
                .json({ message: errorMessage, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,

        )
        res.status(200)
            .json({

                message: "login success",
                success: true,
                jwtToken,
                email,
                firstname: user.firstname
            })
    } catch (err) {
        console.log("err", err)
        res.status(500)
            .json({
                message: "internal server error",
                success: false
            })
    }
};
// for mail verify

// const forgotPassword = async (req, res) => {
//     const { email } = req.body;
//     try {
//         const oldUser = await UserModel.findOne({ email });
//         if (!oldUser) {
//             return res.json({ status: "user not exists" });
//         }
//         const secret = JWT_SECRET + oldUser.password;
//         const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '5m' });
//         const link = `http://localhost:4000/resetpassword/${oldUser._id}/${token}`;
//         console.log(link);
//     }


// const { id, token } = req.params;
//         console.log(req.params);
// const oldUser = await UserModel.findOne({ email });
//         if (!oldUser) {
//             return res.json({ status: "user not exists" });
//         }
//         const secret = JWT_SECRET + oldUser.password;
// try {

//     const verify = jwt.verify(token, secret);
// const encryptedPassword = await bcrypt.hash(password,10);
// await UserModel.updateOne(
//     {_id:id,},
//     {$set:{
//         password:encryptedPassword
//     },}
// );
//     res.json({status:"password verified"});
// }
// catch (error) {
//     res.send(" not verified");
// }
const Resetpassword = async (req, res) => {
    try {
        const token = req.query.token;
        if (req.query.token != undefined) {
            return res.render('404');
        }
        const tokenData = await UserModel.findOne({ token: token });
        if (tokenData) {
            const password = req.body.password;
            const newPassword = await encryptedPassword(password);
            const userData = await UserModel.findByIdAndUpdate({ _id: tokenData._id },
                { $set: { password: newPassword, token: '' } },
                { new: true });
            res.status(200).send({ success: true, msg: "user password has been reset", data: tokenData });

        }
        else {
            res.status(200).send({ success: true, msg: "this link is expired " });

        }
    }
    catch (error) {
        res.status(400).send({ success: false, msg: error.message });

    }
}

module.exports = {
    signup,
    login,
    Resetpassword
}






















