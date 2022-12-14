var bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require('jsonwebtoken');
const {registerSchema} = require('../validations/RegisterRequest');
const {loginSchema} = require('../validations/LoginRequest');

exports.login = async function (req, res) {
  try {

    //validation of the requests
    const result = await loginSchema.validateAsync(req.body,{
      abortEarly: false
     });

    //search user
    const user = await db.User.findOne({ where: { email: result.email } });


    if (!user) {
      res.status(404).json("user not found");
    } else {
      //check that password are the same
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

     //check if error comes from joi validation
     if (err.isJoi === true) {
      err.status = 422;
      res.status(422).json(err.details);
    }
    res.status(500).json(err);
  }
};

exports.register = async function (req, res) {
  try {

    //validation of the requests

     const result = await registerSchema.validateAsync(req.body,{
      abortEarly: false
     });
     
    //verify if user exists
    const user = await db.User.findOne({ where: { email: result.email } });
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

      res.status(200).json(newuser);
    }
  } catch (err) {
    //check if error comes from joi validation
    if (err.isJoi === true) {
      err.status = 422;
      res.status(422).json(err.details);
    }
    res.status(500).json(err);
  }
};
