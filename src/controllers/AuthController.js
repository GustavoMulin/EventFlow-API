import jwt from "jsonwebtoken";
import Users from "../models/UsersModels.js";

const JWT_SECRET = process.env.JWT_SECRET || "segredo_temporario";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "E-mail inválido." });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "A senha deve ter no mínimo 8 caracteres." });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email já registrado." });
    }

    const newUser = new Users({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar usuário.", error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      message: "Login realizado com sucesso!",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login.", error: error.message });
  }
}

export const getProfile = (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao carregar perfil" });
  }
};
