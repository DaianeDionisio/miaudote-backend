const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
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
        const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });

        res.json({ token, userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
};
