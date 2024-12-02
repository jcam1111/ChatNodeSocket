import { Sequelize } from 'sequelize';

// Crea la instancia de Sequelize con las credenciales de la base de datos
export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'your-username',
  password: 'your-password',
  database: 'your-database',
});
