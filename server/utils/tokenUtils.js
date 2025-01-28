import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user_id, user_type) =>{
    let payLoad = {user_id, user_type}
    const token = jwt.sign(payLoad, process.env.TOKEN_KEY, {expiresIn: "5d"})
    return token
}

export const getIdFromToken = (token) =>{
    return jwt.decode(token).user_id
}

export const getUserTypeAndValidateToken = (authorization) => {
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new Error("Token no proporcionado o inválido");
  }

  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.TOKEN_KEY); 
  return decoded.user_type;
};