<script setup lang="ts">
import { ref } from 'vue';
import ImageUpload from '@/components/ImageUpload.vue'
import TraitsSelector from '@/components/TraitsSelector.vue';
import getTraits from '../composables/getTraits';
import useRegister from '../composables/useRegister';
import type { ITrait } from '@/types/pet';

const imageFile = ref<File | null>(null);

const { traits: traitsOptions, loading, error } = getTraits();
const { loading: registerLoading, error: registerError, success, registerPet } = useRegister();

const traits = ref<ITrait[]>([{ id: 0, name: 'exemplo' }]);
const name = ref('');
const humanName = ref('');

const handleSubmit = async () => {
    const formData = {
        image: imageFile.value,
        name: name.value,
        humanName: humanName.value,
        traits: traits.value
    };

    const result = await registerPet(formData);

    if (result.success) {
        console.log('Pet registrado com ID:', result.data.id);
    }
};
</script>
<template>
    <form @submit.prevent="handleSubmit">
        <ImageUpload v-model="imageFile" />

        <input v-model="humanName" class="textInput" placeholder="seu nome..." />

        <input v-model="name" class="textInput" placeholder="nome do pet..." />

        <TraitsSelector v-model="traits" :traits-options="traitsOptions" />

        <div v-if="registerError" class="errorMessage">
            {{ registerError }}
        </div>
        <div v-if="error" class="errorMessage">
            {{ error }}
        </div>

        <button type="submit" :disabled="registerLoading">
            {{ registerLoading ? 'Enviando...' : 'enviar' }}
        </button>
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


.error-message {
    color: #ff4444;
    margin-top: 10px;
}

button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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