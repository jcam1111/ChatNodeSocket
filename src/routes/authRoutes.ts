import { Router } from 'express';
import { register, login, getUserProfile } from '../controllers/authController';
import { verifyToken } from '../middleware/authMiddleware'; // Si tienes un middleware para verificar el token

const router = Router();

// Rutas de autenticación
router.post('/register', register); // Ruta para registrar un nuevo usuario
router.post('/login', login); // Ruta para iniciar sesión
router.get('/profile', verifyToken, getUserProfile); // Ruta para obtener el perfil del usuario

export default router;
