const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// REGISTRO
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      nombre,
      email,
      password: hashedPassword
    });

    await user.save();
    res.json({ message: "Usuario registrado correctamente" });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuario no existe" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "secreto_super_seguro",
      { expiresIn: "1h" }
    );

    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/verify", (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "No token" });
    }

    // quitar "Bearer " si viene incluido
    const cleanToken = token.replace("Bearer ", "");

    const decoded = jwt.verify(cleanToken, "secreto_super_seguro");

    res.json({
      ok: true,
      user: decoded
    });

  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
});

module.exports = router;