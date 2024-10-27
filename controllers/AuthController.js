const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;
    // find user
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash("message", "User does not exist. Try register!");
      res.render("auth/login");
      return;
    }
    
    // check if the passwords match
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      req.flash("message", "Invalid password!");
      res.render("auth/login");
      return;
    }

    // initializize session
    req.session.userId = user.id;
    req.flash("message", "Login successful!");
    req.session.save(() => {
      res.redirect("/");
    });

  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    // password match validation
    if (password != confirmpassword) {
      req.flash("message", "Passwords do not match. Try again!");
      res.render("auth/register");
      return;
    }

    // check if user exists
    const checkIfUserExists = await User.findOne({ where: { email: email } });

    if (checkIfUserExists) {
      req.flash("message", "User already exists. Try login!");
      res.render("auth/register");
      return;
    }

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createdUser = await User.create(user);
      // initialize session
      req.session.userId = createdUser.id;
      req.flash("message", "User created successfully!");
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async logout(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
};
