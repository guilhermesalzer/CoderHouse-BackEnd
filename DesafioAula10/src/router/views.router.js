import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { message: "Primeira mensagem" });
});

export default router;
