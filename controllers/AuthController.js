var db = require("../models");
var bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.login = async function (req, res) {
  try {
    //search user
    const user = await db.User.findOne({ where: { email: req.body.email } });


    if (!user) {
      res.status(404).json("user not found");
    } else {
      //verify that password are the same
      const password_valid = await bcrypt.compare(
        req.body.password,
        user.password
      );
     
      if (password_valid) {

        //generate token
        const token = jwt.sign(
          {
            email: user.email,
            userId: user.id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        console.log(token);

        res.status(200).json({
          message: "Authentication successful",
          token: token,
        });
      } else {
        res.status(400).json("Wrong password");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.register = async function (req, res) {
  try {
    //verify if user exists
    const user = await db.User.findOne({ where: { email: req.body.email } });
    const salt = await bcrypt.genSalt(10);

    if (!user) {
      //save user and send status
      const newuser = await db.User.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        roles: req.body.roles,
        password: await bcrypt.hash(req.body.password, salt),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log(newuser);
      res.status(200).json(newuser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
