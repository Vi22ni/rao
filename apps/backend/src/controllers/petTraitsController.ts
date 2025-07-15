import PetTrait from '../models/PetTrait';
import { Request, Response } from 'express';

export interface IPetTrait {
    id: number;
    petId: number;
    traitId: number;
}

export const createPetTrait = async (traitIds: number[], petId: number) => {
    const petTraits: IPetTrait[] = []
    try {
        for (let i = 0; i < traitIds.length; i++) {
            const petTrait: IPetTrait = await PetTrait.create(
                {
                    pet_id: petId,
                    trait_id: traitIds[i]
                }
            );
            petTraits.push(petTrait);
        }
    } catch (error: any) {
        console.log("🚀 ~ createPetTrait ~ error:", error)
    }
    return petTraits;
}

export const getPetTraits = async (petId: number) => {
    try {
        const petTraits: IPetTrait[] = await PetTrait.findAll({ where: { pet_id: petId } });
        return petTraits;
    } catch (error: any) {
        console.log("🚀 ~ getPetTrait ~ error:", error);
    }
}