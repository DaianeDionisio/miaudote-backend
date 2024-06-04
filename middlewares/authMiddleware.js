const jwt = require('jsonwebtoken');

// Middleware para validar o token JWT
exports.verifyToken = (req, res, next) => {
  // Extrair o token do cabeçalho de autorização
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  // Separar a palavra-chave "Bearer" do token
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  // Verificar e validar o token JWT
  jwt.verify(token, 'secreto', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    } else {
      // Se o token for válido, você pode acessar as informações do usuário
      req.userId = decodedToken.userId;
      next();
    }
  });
}