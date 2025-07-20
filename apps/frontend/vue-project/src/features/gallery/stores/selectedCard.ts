import { defineStore } from 'pinia'

export const useSelectedCardStore = defineStore('selectedCard', {
    state: () => {
        return { id: 0 }
    },
    actions: {
        set(value: number) {
            this.id = value;
        },
    },
})