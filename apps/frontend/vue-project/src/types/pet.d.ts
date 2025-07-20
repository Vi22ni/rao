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