import type { IPetForm } from '@/types/pet';
import { ref } from 'vue';

export default function usePetVerification() {
    const verificationLoading = ref(false);
    const verificationError = ref<string | null>(null);
    const verificationResult = ref<{
        isPet: boolean;
        predictedSpecies: 'cat' | 'dog';
        message?: string;
    }>({
        isPet: false,
        predictedSpecies: 'dog',
    });

    const verifyPetImage = async (formData: IPetForm) => {
        verificationLoading.value = true;
        verificationError.value = null;
        verificationResult.value = {
            isPet: false,
            predictedSpecies: 'dog',
        }

        try {
            if (!formData.image) {
                throw new Error('por favor, adicione uma imagem do pet');
            }
            if (!formData.humanName.trim()) {
                throw new Error('por favor, informe o seu nome');
            }
            if (!formData.name.trim()) {
                throw new Error('por favor, informe o nome do pet');
            }
            if (formData.traits.length === 0) {
                throw new Error('por favor, selecione pelo menos uma característica');
            }

            const data = new FormData();
            data.append('image', formData.image);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/pets/verify`, {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error('Erro ao verificar a imagem');
            }

            const result = await response.json();
            verificationResult.value = result;

            if (!result.isPet) {
                throw new Error(result.message || 'A imagem não parece ser de um gato ou cachorro');
            }

            return result;
        } catch (err) {
            verificationError.value = err instanceof Error ? err.message : 'Erro desconhecido';
            throw err;
        } finally {
            verificationLoading.value = false;
        }
    };

    return {
        verificationLoading,
        verificationError,
        verificationResult,
        verifyPetImage,
    };
}