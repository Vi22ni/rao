import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Pet = sequelize.define('pets', {
  name: { type: DataTypes.STRING, allowNull: false },
  species: { type: DataTypes.ENUM('dog', 'cat'), allowNull: false },
  traits: { type: DataTypes.JSONB },
  photoUrl: { type: DataTypes.TEXT, allowNull: false },
  status: { 
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  }
});

export default Pet;