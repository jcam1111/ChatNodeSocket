import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Instancia de Sequelize
import User from './user'; // Importar el modelo de usuario

interface MessageAttributes {
  id: number;
  text: string;
  userId: number;
  roomId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> {}

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number;
  public text!: string;
  public userId!: number;
  public roomId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'messages',
  }
);

export default Message;
