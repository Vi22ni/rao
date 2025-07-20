<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    traitsOptions: string[];
}>();

const emit = defineEmits(['update:modelValue']);

const selectedTraits = ref<string[]>([]);

const toggleTrait = (trait: string) => {
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
            <button v-for="trait in traitsOptions" :key="trait" type="button" @click="toggleTrait(trait)"
                :class="{ 'traitSelected': selectedTraits.includes(trait) }"
                :disabled="selectedTraits.length >= 3 && !selectedTraits.includes(trait)">
                {{ trait }}
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
    background: rgba(194, 195, 196, 0.95);
    box-shadow: 0px -2px 1px 0px #3c3c3c inset, 0px 10px 15px 0px rgba(0, 0, 0, 0.30);
    color: rgba(60, 60, 60);
    font-size: 12px;
    font-style: italic;
    font-weight: 400;
    line-height: normal;
    border: none;
}

.textInput:focus {
    background: rgba(194, 195, 196);
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
    background: linear-gradient(180deg, rgba(223, 223, 223, 0.85) 0%, rgba(203, 203, 203, 0.85) 50%, rgba(183, 183, 183, 0.85) 55%, rgba(143, 143, 143, 0.85) 100%);
    box-shadow: 0px -2px 1px 0px #3c3c3c inset, 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    border: none;
    color: rgba(60, 60, 60, 0.90);
    font-size: 12px;
    font-weight: bold;
}

.traitsGrid button:hover:not(:disabled) {
    background: rgba(194, 195, 196, 0.85);
}

.traitsGrid button:disabled:not(.traitSelected) {
    opacity: 0.6;
    cursor: not-allowed;
}

.traitSelected {
    background: linear-gradient(180deg, #DFDFDF 0%, #CBCBCB 50%, #B7B7B7 55%, #8F8F8F 100%) !important;
    box-shadow: 0px -2px 1px 0px #3c3c3c inset, 0px 4px 8px 0px rgba(0, 0, 0, 0.40) !important;
}

@media(min-width: 800px) {
    .traitsGrid {
        grid-template-columns: repeat(6, 1fr);
    }
}
</style>