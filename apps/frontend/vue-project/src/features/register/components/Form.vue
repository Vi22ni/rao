<script setup lang="ts">
import { ref } from 'vue';
import ImageUpload from '@/components/ImageUpload.vue'
import TraitsSelector from '@/components/TraitsSelector.vue';
import getTraits from '../composables/getTraits';
import useRegister from '../composables/useRegister';
import usePetVerification from '../composables/usePetVerification';
import type { ITrait, IPetForm } from '@/types/pet';
import { useRouter } from 'vue-router';

const router = useRouter();

const imageFile = ref<File | null>(null);
const showConfirmation = ref(false);
const userConfirmed = ref(false);
const imageKey = ref(Date.now());

const { traits: traitsOptions, loading, error } = getTraits();
const { loading: registerLoading, error: registerError, success, registerPet } = useRegister();
const {
    verificationLoading,
    verificationError,
    verificationResult,
    verifyPetImage
} = usePetVerification();

const traits = ref<ITrait[]>([{ id: 0, name: 'exemplo' }]);
const name = ref('');
const humanName = ref('');
const showSuccess = ref(false);
const showSuccessMessage = ref('');

const handleSubmit = async () => {
    if (!imageFile.value) {
        registerError.value = 'Por favor, adicione uma imagem do pet';
        return;
    }

    if (showConfirmation.value && !userConfirmed.value) {
        return; 
    }

    try {

        const formData: IPetForm = {
            image: imageFile.value,
            name: name.value,
            humanName: humanName.value,
            traits: traits.value,
            species: verificationResult.value.predictedSpecies,
        };


        if (!userConfirmed.value) {
            const verification = await verifyPetImage(formData);

            if (verification.isPet && verification.predictedSpecies) {
                verificationResult.value = verification;
                showConfirmation.value = true;
                return;
            }
        }


        const result = await registerPet(formData);

        if (result.success) {
            showConfirmation.value = false;
            showSuccess.value = true;
            showSuccessMessage.value = 'pet cadastrado com sucesso';
            setTimeout(() => router.push({ path: '/' }), 1000)
        }
    } catch (err) {
        console.error('Error during registration:', err);
    }
};

const resetVerification = () => {
    showConfirmation.value = false;
    verificationResult.value = {
        isPet: false,
        predictedSpecies: 'dog',
    };
    verificationError.value = null;
    imageFile.value = null;
    imageKey.value = Date.now();
};

</script>
<template>
    <form @submit.prevent="handleSubmit">
        <ImageUpload v-model="imageFile" :disabled="verificationLoading" :key="imageKey" />

        <input v-model="humanName" class="textInput" placeholder="seu nome..." :disabled="verificationLoading" />

        <input v-model="name" class="textInput" placeholder="nome do pet..." :disabled="verificationLoading" />

        <TraitsSelector v-model="traits" :traits-options="traitsOptions" :disabled="verificationLoading" />

        <div v-if="verificationError" class="errorMessage">
            {{ verificationError }}
        </div>
        <div v-if="registerError" class="errorMessage">
            {{ registerError }}
        </div>
        <div v-if="error" class="errorMessage">
            {{ error }}
        </div>

        <button type="submit" :disabled="verificationLoading || registerLoading">
            <span v-if="verificationLoading">Verificando imagem...</span>
            <span v-else-if="registerLoading">Registrando...</span>
            <span v-else>Enviar</span>
        </button>
        <div v-if="showConfirmation && verificationResult" class="confirmation-modal">
            <p>{{ verificationResult.message }}</p>
            <button @click="userConfirmed = true" type="submit">Confirmar</button>
            <button @click="resetVerification">Cancelar</button>
        </div>
        <div v-if="showSuccess" class="confirmation-modal">
            <p>{{ showSuccessMessage }}</p>
        </div>
    </form>
</template>

<style lang="css" scoped>
form {
    display: flex;
    flex-direction: column;
    padding: 15px 30px;
    width: 100%;
    gap: 15px;
    margin-bottom: 30px;
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


.confirmation-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(180deg, rgba(223, 223, 223) 0%, rgba(203, 203, 203) 50%, rgba(183, 183, 183) 55%, rgba(143, 143, 143) 70%);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column;

}

.confirmation-modal p {
    color: rgba(60, 60, 60);

}

@media(min-width: 800px) {
    form {
        width: 80%;
    }
}
</style>