import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Pet extends Model {
  public id!: number;
  public name!: string;
  public species!: 'dog' | 'cat';
  public photoUrl!: string;
  public status!: 'pending' | 'approved' | 'rejected';
  public isActive!: boolean;
  public humanName!: string;
}

Pet.init({
  name: DataTypes.STRING,
  species: DataTypes.ENUM('dog', 'cat'),
  photoUrl: { type: DataTypes.TEXT, field: 'photo_url' },
  status: DataTypes.ENUM('pending', 'approved', 'rejected'),
  isActive: { type: DataTypes.BOOLEAN, field: 'is_active', defaultValue: true },
  humanName: DataTypes.STRING
}, {
  sequelize,
  modelName: 'pet',
  tableName: 'pets',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Pet;
