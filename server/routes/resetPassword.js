const express = require("express");
const User = require("../models/user");
const { id } = require("date-fns/locale");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const router = express.Router();


router.post("/:id/:token", async (req, res) => {
  const {id, token} = req.params;
  const {password} = req.body;

  jwt.verify(token, "jwt_secret_key", (err, decoded ) => {
    if(err) {
        return res.json({Status: "Error with token"})
    } else {
        
    }
  })
});
