const { User } = require("../models");

class SessionController {
  async create(req, res) {
    return res.render("auth/signin");
  }

  async store(req, res) {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.flash("error", "Usuário inexistente");
      return res.redirect("/");
    }

    if (!(await user.checkPassword(password))) {
      req.flash("error", "Usuário ou senha incorretos.");
      return res.redirect("/");
    }
    req.session.user = user;
    return res.redirect("/app/dashboard");
  }

  async destroy(req, res) {
    req.session.destroy(() => {
      res.clearCookie("root");
      return res.redirect("/");
    });
  }
}

module.exports = new SessionController();
