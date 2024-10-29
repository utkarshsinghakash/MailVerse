import express from "express";
import Email from "../Models/email.js";
import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // to generate user token
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/register", isAuthenticated, async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    console.log(user);
    return res.status(200).json({
      message: "Account created successfully",
      user,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", isAuthenticated, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,

      password: user.password,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      }); // protect from hacker or unauthorized access
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/save", async (req, res) => {
  try {
    console.log(req.body);
    const email = new Email(req.body);
    await email.save();
    return res
      .status(200)
      .json({ message: "email saved successfully", email, success: true });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/draft", async (req, res) => {
  try {
    console.log(req.body);
    const email = new Email(req.body);
    await email.save();
    return res
      .status(200)
      .json({ message: "Email saved as Draft", email, success: true });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/bin", async (req, res) => {
  console.log(req.body);
  try {
    await Email.updateMany(
      { _id: { $in: req.body } },
      { bin: true, starred: false, type: "" }
    );
    return res.status(200).json("Emails deleted Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

//delete  mail permanently
router.post("/delete", async (req, res) => {
  try {
    const email = await Email.deleteMany({ _id: { $in: req.body } });

    return res.status(200).json({ message: "Emails deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

router.post("/starred", async (req, res) => {
  try {
    const email = await Email.updateOne(
      { _id: req.body.id },
      { $set: { starred: req.body.value } }
    );
    return res.status(200).json({ message: "email is set as Starred", email });
  } catch (er) {
    console.log(er);
    res.status(500).json(er.message);
  }
});

router.get("/email/:type", async (req, res) => {
  try {
    const type = req.params.type;

    let emails;
    if (type === "bin") {
      emails = await Email.find({ bin: true });
    } else if (type === "allmails") {
      emails = await Email.find({ bin: false });
    } else if (type === "starred") {
      emails = await Email.find({ starred: true, bin: false });
    } else if (type === "inbox") {
      emails = await Email.find({ type: "inbox", bin: false });
    } else {
      emails = await Email.find({ type: type });
    }

    return res.status(200).json({ emails });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;
