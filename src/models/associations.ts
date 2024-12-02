import User from './user';
import Message from './message';

// Relación uno a muchos entre User y Message
User.hasMany(Message, {
  foreignKey: 'userId',
  as: 'messages',
});
Message.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});
