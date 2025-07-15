import PetTrait from '../models/PetTrait';
import { Request, Response } from 'express';

interface IPetTrait {
    id: number;
    petId: number;
    traitId: number;
}

export const createPetTrait = async (traitIds: number[], petId: number) => {
    console.log("🚀 ~ createPetTrait ~ petId:", petId)
    console.log("🚀 ~ createPetTrait ~ traitIds:", traitIds)
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