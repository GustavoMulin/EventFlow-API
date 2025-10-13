import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido ou inválido." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "segredo_temporario");
    req.user = decoded; // Armazena os dados do usuário no request
    next(); // Libera o acesso à rota
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
}
