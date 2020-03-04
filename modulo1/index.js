const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

/**
 * Extensão para criação de templates no nodejs
 */
nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

/**
 * No caso o parâmetro next é não blocante, caso não seja passado a execução se
 * manterá no fluxo do middleware inicial.
 */
const logMiddleware = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  );
  return next();
};
/**
 * Os middlewares pode ser registrados com use, ou ser passado na function
 * da rota.
 */
app.use(logMiddleware);
app.set("view engine", "njk");
app.use(express.urlencoded({ extended: false }));
const users = ["Ricardo Marino", "Matheus Fernandes", "Malakoi ispertinho"];

app.get("/", (req, res) => {
  return res.render("list", { users });
});

app.get("/new", (req, res) => {
  return res.render("new");
});

app.post("/create", (req, res) => {
  users.push(req.body.user);
  return res.redirect("/");
});

app.get("/nome/:name", (req, res) => {
  return res.json({ mensagem: `Bem vindo, ${req.params.name}` });
});
app.listen(3000);
