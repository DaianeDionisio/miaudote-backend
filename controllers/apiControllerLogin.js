const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const admin = require('firebase-admin');

// Função para verificar e autenticar o token do Firebase
async function verifyFirebaseToken(firebaseToken) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    return decodedToken;
  } catch (error) {
    console.error('Erro ao verificar token do Firebase:', error);
    throw new Error('Token do Firebase inválido');
  }
}

exports.login = async (req, res) => {
    console.debug(req)
    const { email, password, firebaseToken, userId} = req.body;

    try {
        console.debug('fire => ', firebaseToken)
        const decodedFirebaseToken = await verifyFirebaseToken(firebaseToken);

        // Verificar se o usuário existe
        const user = await User.findOne({ 'email':  email});
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Verificar a senha quando estiver com criptografia
        // const passwordMatch = await bcrypt.compare(password, user.password);
        // console.debug(passwordMatch)
        // if (!passwordMatch) {
        //   return res.status(401).json({ error: 'Credenciais inválidas' });
        // }

        if (password !== user.password) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Gerar token de autenticação
        // const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });

        // res.json({ token, userId: user._id });
        res.json({ token: firebaseToken, userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
};
