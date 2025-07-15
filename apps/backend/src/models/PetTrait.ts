import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Pet from './Pet';
import Trait from './Trait';

class PetTrait extends Model {
  public id!: number;
  public petId!: number;
  public traitId!: number;
}

PetTrait.init({}, {
  sequelize,
  modelName: 'petTrait',
  tableName: 'pets_traits',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

Pet.belongsToMany(Trait, { through: PetTrait, foreignKey: 'pet_id' });
Trait.belongsToMany(Pet, { through: PetTrait, foreignKey: 'trait_id' });

export default PetTrait; 