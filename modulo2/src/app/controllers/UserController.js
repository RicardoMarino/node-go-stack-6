const { User } = require("../models");
class UserController {
  create(req, res) {
    return res.render("auth/signup");
  }

  async store(req, res) {
    let avatar = "vazio.jpg";
    if (req.file) {
      avatar = req.file.filename;
    }

    await User.create({ ...req.body, avatar });
    return res.redirect("/");
  }
}

module.exports = new UserController();
