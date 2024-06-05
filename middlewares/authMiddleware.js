const admin = require('firebase-admin');

// Middleware para validar o token do Firebase
exports.verifyFirebaseToken = (req, res, next) => {
  // Extrair o token do cabeçalho de autorização
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  // Separar a palavra-chave "Bearer" do token
  const token = authHeader;
  console.debug('token => ', token)
  if (!token) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  // Verificar e validar o token do Firebase
  admin.auth().verifyIdToken(token)
    .then(decodedToken => {
      // Se o token for válido, você pode acessar as informações do usuário
      req.userId = decodedToken.uid;
      next();
    })
    .catch(error => {
      console.error('Erro ao verificar o token do Firebase:', error);
      return res.status(401).json({ error: 'Token do Firebase inválido' });
    });
};
