import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Banco de dados em memória para exemplo
const users = [];

// Criar Usuário
export async function register(req, res) {
   try {
        const { name, email, password } = req.body;

        // Validação simples
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }
    
        // Verificar se já existe email registrado
        const userExists = users.find(user => user.email === email);
        if (userExists) {
            return res.status(400).json({ message: "Email já registrado." });
        }
        
        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar novo usuário
        const newUser = {
            id: users.length + 1,
            name,
            email,
            password: hashedPassword
        }

        // Adicionar ao array
        users.push(newUser);

        res.status(201).json({
            message: `Usuário ${name} cadastrado com sucesso!`,
            user: {id: newUser.id, name: newUser.name, email: newUser.email}
        });

    } catch (error) {
        res.status(500).json ({
            message: "Erro ao registrar usuário.",
            error: error.message
        })
    }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Verifica se o usuário existe
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    // Verifica senha
    const validPassword =  bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Senha incorreta!" });
    }

    // Gera token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "segredo_temporario",
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login realizado com sucesso!",
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao realizar login.",
      error: error.message
    });
  }
}

// Endpoint opcional para listar usuários
export function listUsers(req, res) {
  res.json(users.map(u => ({ id: u.id, name: u.name, email: u.email })));
}