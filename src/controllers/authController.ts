import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';  // Asumiendo que tienes un modelo de usuario

// Función para registrar un nuevo usuario
export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear un nuevo usuario
  const newUser = new User({
    email,
    password: hashedPassword,
    name
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Función para iniciar sesión
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Buscar el usuario por email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Verificar la contraseña
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generar un token JWT
  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
};

// Función para obtener el perfil del usuario autenticado
export const getUserProfile = async (req: Request, res: Response) => {
  const userId = req.userId;  // Suponiendo que tienes un middleware que agrega el ID del usuario al request

  try {
    const user = await User.findById(userId).select('-password'); // No enviar la contraseña
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user profile', error });
  }
};
