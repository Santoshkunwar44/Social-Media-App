const router = require("express").Router();
const User = require("../Model/User");
const bcrypt = require("bcrypt");

//REGISTERING THE NEW USER
router.post("/register", async (req, res) => {
  try {
    //generating a hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // creating the alias for the new user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // saving the user in in DB  and respond
    const registeredUser = await user.save();
    res.status(200).send({ success: true, registeredUser });
  } catch (err) {
    res.send(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).send({ success: false, message: "No user found" });

    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate &&
      res.status(400).send({ success: false, message: "Wrong Credentials" });

    const { password, ...others } = user._doc;
    res.status(200).send({ success: true, others });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
