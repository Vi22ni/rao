<script setup lang="ts">
import { ref } from 'vue';
import ImageUpload from '@/components/ImageUpload.vue'
import TraitsSelector from '@/components/TraitsSelector.vue';

const imageFile = ref<File | null>(null);

const traits = ref<string[]>([]);
const name = ref('');
const petName = ref('');

const traitsOptions = [
    'brincalhão',
    'calmo',
    'preguiçoso',
    'observador',
    'comilão',
    'atlético',
    'quieto',
    'barulhento',
    'nervoso'
];

const handleSubmit = () => {
    const formData = {
        image: imageFile.value,
        name: name.value,
        petName: petName.value,
        traits: traits.value
    };
    console.log('Formulário enviado:', formData);
};
</script>
<template>
    <form @submit.prevent="handleSubmit">
        <ImageUpload v-model="imageFile" />

        <input v-model="name" class="textInput" placeholder="seu nome..." />

        <input v-model="petName" class="textInput" placeholder="nome do pet..." />

        <TraitsSelector v-model="traits" :traits-options="traitsOptions" />

        <button type="submit">enviar</button>
    </form>
</template>

<style lang="css" scoped>
form {
    display: flex;
    flex-direction: column;
    padding: 15px 30px;
    width: 100%;
    gap: 15px;
}

.textInput {
    display: flex;
    padding: 15px;
    align-items: center;
    gap: 10px;
    border-radius: 2px;
    background: rgba(194, 195, 196, 0.95);
    box-shadow: 0px -2px 1px 0px #3c3c3c inset, 0px 10px 15px 0px rgba(0, 0, 0, 0.30);
    color: rgba(60, 60, 60);
    font-size: 14px;
    font-style: italic;
    font-weight: 400;
    line-height: normal;
    border: none;
}

.textInput:focus {
    background: rgba(194, 195, 196);
    outline: none;
}

button {
    display: flex;
    height: 100%;
    padding: 10px 12px;
    justify-content: center;
    width: fit-content;
    align-items: center;
    flex-shrink: 0;
    align-self: stretch;
    border-radius: 50px;
    background: linear-gradient(180deg, rgba(223, 223, 223, 0.95) 0%, rgba(203, 203, 203, 0.95) 50%, rgba(183, 183, 183, 0.95) 55%, rgba(143, 143, 143, 0.95) 100%);
    box-shadow: 0px -2px 1px 0px #3c3c3c inset, 0px 5px 10px 0px rgba(0, 0, 0, 0.10);
    cursor: pointer;
    border: none;
    transition: all 500ms ease-in-out;
    color: rgba(60, 60, 60, 0.90);
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
    line-height: normal;
    margin-top: 15px;
    align-self: flex-end;
}

button:hover {
    box-shadow: 0px -2px 1px 0px #3c3c3c inset, 0px 4px 8px 0px rgba(0, 0, 0, 0.35);
    background: linear-gradient(180deg, rgba(223, 223, 223) 0%, rgba(203, 203, 203) 50%, rgba(183, 183, 183) 55%, rgba(143, 143, 143) 100%);

}

@media(min-width: 800px) {
    form {
        width: 80%;
    }
}
</style>