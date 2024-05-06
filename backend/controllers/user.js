import SendError from "../middleware/SendError.js";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res, next) => {
  
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    if (!name || !email || !password) {
      return SendError(res, 400, "Please Fill All Fields");
    }
    const existUser = await User.findOne( {email:email} );
    if (existUser) {
      return SendError(res, 400, "User Already Exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    const payload = {
      name: savedUser.name,
      email: savedUser.email,
      id: savedUser._id,
     isAdmin:savedUser.isAdmin
    };

    if (savedUser) {
      req.user = payload;
      const token = jwt.sign(payload, "akash", {
        expiresIn: "30d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 9000,
      });

      console.log(req.user);

      return res.status(200).json({
        message: "User Registered successfully",
        token,
        payload,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return SendError(res, 200, "Please Fill all Fieldes");
    }
    const existUser = await User.findOne({email:email});
    if (!existUser) {
      return SendError(res, 400, "User not Found");
    }
    const coparePassword = await bcrypt.compare(password, existUser.password);
    if (!coparePassword) {
      return SendError(res, 400, "Email or password is incoreect");
    }
    const payload = {
      name: existUser.name,
      email: existUser.email,
      id: existUser._id,
      isAdmin:existUser.isAdmin
    };
    const token = await jwt.sign(payload, "akash");

    req.user = payload;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 9000,
    });

    return res.status(200).json({
      message: "User Login Successfully",
      payload,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const Logout = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "User Logout Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existUser = await User.findById(id);
    const isAdmin = (existUser.isAdmin = true);

    if (!isAdmin) {
      return SendError(res, 400, "This User Cant Acess This Route");
    }

    const users = await User.find();

    res.status(200).json({
      message: "Here Is ALL Users",
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const myAcount = async (req, res, next) => {};

export const test = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    res.status(200).json({
      message: "Here is Your Profile",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const test2 = async (req, res, next) => {
  try {
    const { id } = req.user;
    const existUser = await User.findById(id);
    const isAdmin = existUser.isAdmin == true;

    console.log(isAdmin);

    if (!isAdmin) {
      console.log("error");
      return SendError(res, 400, "This User Cant Acess This Route");
    }

    const users = await User.find();

    res.status(200).json({
      message: "Here Is ALL Users",
      users,
    });
  } catch (error) {
    next(error);
  }
};
