<script setup lang="ts">
import { ref, watch } from 'vue';
import type { ITrait } from '@/types/pet';

const props = defineProps<{
    traitsOptions: ITrait[];
}>();

const emit = defineEmits(['update:modelValue']);

const selectedTraits = ref<ITrait[]>([]);

const toggleTrait = (trait: ITrait) => {
    const index = selectedTraits.value.indexOf(trait);

    if (index === -1) {
        if (selectedTraits.value.length < 3) {
            selectedTraits.value.push(trait);
        }
    } else {
        selectedTraits.value.splice(index, 1);
    }
};

watch(selectedTraits, (newVal) => {
    emit('update:modelValue', newVal);
}, { deep: true });
</script>

<template>
    <div class="traitsSelector">
        <input class="textInput" readonly
            :value="`escolha até 3 termos que descrevam seu pet: ${selectedTraits.length}/3`"
            placeholder="escolha até 3 termos que descrevam seu pet:" />

        <div class="traitsGrid">
            <button v-for="trait in traitsOptions" :key="trait.id" type="button" @click="toggleTrait(trait)"
                :class="{ 'traitSelected': selectedTraits.includes(trait) }"
                :disabled="selectedTraits.length >= 3 && !selectedTraits.includes(trait)">
                {{ trait.name }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.textInput {
    display: flex;
    padding: 15px;
    align-items: center;
    gap: 10px;
    border-radius: 2px;
    background: var(--color-background-soft);
    color: var(--color-text-soft);
    /* box-shadow: 0px -2px 1px 0px #3c3c3c inset; */
    font-size: 12px;
    font-style: italic;
    font-weight: 400;
    line-height: normal;
    border: none;
}

.textInput:focus {
    outline: none;
}

.traitsSelector {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
}

.traitsGrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
}

.traitsGrid button {
    display: flex;
    height: 41px;
    padding: 10px 12px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: var(--color-background-soft);
    color: var(--color-text-soft);
    border: none;
    font-size: 12px;
    font-weight: bold;
}

.traitsGrid button:hover:not(:disabled) {
    background: rgba(255, 227, 175, 0.85);
}

.traitsGrid button:disabled:not(.traitSelected) {
    opacity: 0.6;
    cursor: not-allowed;
}

.traitSelected {
    background: #FFAE42 !important;
}

@media(min-width: 800px) {
    .traitsGrid {
        grid-template-columns: repeat(6, 1fr);
    }
}
</style>