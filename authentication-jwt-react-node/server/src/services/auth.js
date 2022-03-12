const bcrypt = require('bcryptjs');


// Algoritmo reversível de criptografia
// XOR
// Base64

export const createPasswordHash = async (password) => {
    return bcrypt.hash(password, 8);
}

export const checkPassword = (user, password) => 
    bcrypt.compare(password, user.password);