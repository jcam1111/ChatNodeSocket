import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Importa la instancia de sequelize

// Define la interfaz del modelo User
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define la interfaz para crear un usuario (sin el ID porque lo genera la DB)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public avatar?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
