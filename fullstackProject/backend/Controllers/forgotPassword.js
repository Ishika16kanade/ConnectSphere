const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const UserModel = require("../Models/user");
const jwt = require('jsonwebtoken');


const sendMail = async (req, res) => {
    // let testAccount = await nodemailer.createTransport();
    try {
        console.log("working", req.body);
        const { email } = req.body;
        if (!email) {
            return res.status(400)
                .json({ message: 'Please Enter  registered mail id ' });
        }

        // const oldUser = await UserModel.findOne({ email });
        // if (!oldUser) {
        //     return res.json({ status: "user not exists" });
        // }
        // const jwtToken = jwt.sign(
        //     { email: UserModel.email },
        //     process.env.JWT_SECRET,
        // )
        // const secret = JWT_SECRET + oldUser.password;
        // const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '5m' });
        // const link = `http://localhost:4000/forgotpassword/${oldUser._id}/${token}`;
        // console.log(link);
        // const { id } = req.params;
        // console.log(req.params);4
        // res.send("Done");

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'kanadeisha@gmail.com',
                pass: 'arqkpwswqtkmauth'
            }
        });
        let info = await transporter.sendMail({
            from: '"Ishika Kanade"  <ishikakanade123@gmail.com>',
            to: "diksha.chakravedi13@gmail.com",
            subject: 'Hello ',
            text: "Email Container",
            html: "<b>Hello How are You change something </b>"
        }, (error) => {
            if (error) {
                console.log("err", error);
            }
        });
        res.json(info);
    }
    catch (error) {

        console.log("err", error);
    }
}
module.exports = sendMail;