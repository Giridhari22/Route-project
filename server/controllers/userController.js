const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const Seq = userModel.create({ firstName, lastName, email, password });
  res.json({ Seq });
  console.log(Seq);
};

exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(req.body.password, salt);
    var usr = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashPwd,
    };
    created_user = await userModel.create(usr);
    res.status(201).json(created_user);
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    console.log(req.body);
    const user = await userModel.findOne({ where: { email: req.body.email } });
    console.log(user);

    if (user) {
      const password_valid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      console.log(password_valid);
      if (password_valid) {
        let token = jwt.sign({ user: user }, "mynameisgiri");
        console.log(token);
        return res
          .status(200)
          .json({
            success: true,
            token: token,
            user: user,
            msg: "login successfully",
          });
      } else {
        return res
          .status(200)
          .json({ success: false, error: "Password Incorrect" });
      }
    } else {
      return res
        .status(200)
        .json({ success: false, error: "email doesnot exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

// make A JAVASCRIPT function for generate random otp
function generateRandomPassword(length = 10) {
  var password = "";
  var str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

  for (let i = 1; i <= 8; i++) {
    var char = Math.floor(Math.random() * str.length + 1);

    password += str.charAt(char);
  }

  return password;
}

exports.forgotPassword = async (req, res) => {
  console.log(req.body);
  try {
    const { email } = req.body;

    // Find user with provided email address
    const user = await userModel.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const randompassword = generateRandomPassword();
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(randompassword, salt);
    const updatedPass = await userModel.update(
      { password: hashPwd },
      { where: { email: email } }
    );

    if (updatedPass) {
      let transporter = await nodemailer.createTransport({
        service: "gmail",
        port: 587,

        auth: {
          user: "testingsdd123@gmail.com",
          pass: "yuxuyofxyjmdezlk",
        },
      });
      // Send email to user with OTP
      const mailOptions = {
        from: '"Giridhari jha 👻" <testingsdd123@gmail.com>',
        to: email,
        subject: "Reset your password",
        text: `Your OTP is ${randompassword}. It will expire in ${
          120000 / 1000
        } seconds.`,
      };
      await transporter.sendMail(mailOptions);

      res.send("OTP sent to your email");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.verifyPassword = async (req, res) => {
  console.log("Body:", req.body)
  try {
    const { email, currentPassword, newPassword, confirmNewPassword } = req.body;
    console.log("body hai", req.body);
    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ error: "New password and confirm new password don't match" });
    }
    const user = await userModel.findOne({ where: { email: email } });
    console.log(user);
    if (user) {
      const password_valid = await bcrypt.compare(currentPassword, user.password);
      // console.log("PASS VALID",password_valid)
      if (password_valid) {
        const salt = bcrypt.genSaltSync(10);
        const hashPwd = bcrypt.hashSync(newPassword, salt);
        console.log("hash", hashPwd);

        // Update user's password in database
        await user.update({ password: hashPwd }, { where: { email: email } }); // Replace 'user@example.com' with the actual email

        return res
          .status(200)
          .json({ success: true, msg: "verified successfully" });
      }
    }

    return res
      .status(200)
      .json({ success: false, msg: "Current password is wrong" });
  } catch (error) {
    console.log(error);
  }
};

// reset password
// exports.resetPassword = async (req, res) => {
//   const { email, newPassword } = req.body;

//   // Find user with provided email address and OTP
//   const user = await userModel.findOne({ where: { email } });
//   if (!user) {
//     return res.status(404).json({msg:'User not found or OTP is invalid'});
//   }

//   const salt = bcrypt.genSaltSync(10);
//   const hashPwd = bcrypt.hashSync(newPassword, salt);
//   // Update user's password in database
//   await user.update({ password: hashPwd });

//   return res.status(200).json({msg:'Password reset successfully'});
// }
