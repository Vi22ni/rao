export interface IPetForm {
    image: File | null;
    name: string;
    humanName: string;
    traits: ITrait[];
}

export interface IRegisterResponse {
    success: boolean;
    message?: string;
    data?: any;
}


export interface ITrait {
    id: number;
    name: string;
}

export interface IPet {
    id: number;
    name: string;
    photoUrl: string;
    species: string;
    traits: ITrait[];
    humanName: string;
}