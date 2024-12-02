import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Definir el tipo de las propiedades de la solicitud
interface CustomRequest extends Request {
  userId?: string;
}

// Middleware para verificar el token JWT
export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Obtener el token del encabezado Authorization

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verificar y decodificar el token JWT
    const decoded = jwt.verify(token, 'your_jwt_secret') as jwt.JwtPayload; // 'your_jwt_secret' es tu clave secreta

    // Agregar el ID del usuario a la solicitud
    req.userId = decoded.userId; // Suponiendo que tu token contiene el campo 'userId'
    
    next(); // Continuar con la siguiente función de middleware o ruta
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};
