import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Trait extends Model {
  public id!: number;
  public name!: string;
  public isActive!: boolean;
}

Trait.init({
  name: DataTypes.STRING,
  isActive: { type: DataTypes.BOOLEAN, field: 'is_active', defaultValue: true }
}, {
  sequelize,
  modelName: 'trait',
  tableName: 'traits',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


export default Trait;
