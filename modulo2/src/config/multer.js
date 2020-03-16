const path = require("path");
const crypto = require("crypto");
const multer = require("multer");

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    filename: (req, file, calback) => {
      crypto.randomBytes(16, (erro, raw) => {
        if (erro) return calback(erro);
        calback(null, raw.toString("hex") + path.extname(file.originalname));
      });
    }
  })
};
