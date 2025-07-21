import { ref } from 'vue';
import type { IPetForm, IRegisterResponse } from '@/types/pet';

export default function useRegister() {
    const loading = ref(false);
    const error = ref<string | null>(null);
    const success = ref(false);

    const registerPet = async (formData: IPetForm): Promise<IRegisterResponse> => {
        loading.value = true;
        error.value = null;
        success.value = false;

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
            data.append('name', formData.name);
            data.append('humanName', formData.humanName);
            data.append('traits', JSON.stringify(formData.traits));

            const response = await fetch(`${import.meta.env.VITE_API_URL}/pets`, {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'erro ao registrar pet');
            }

            const result: IRegisterResponse = await response.json();
            success.value = true;
            return result;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'erro desconhecido ao registrar';
            console.error('Registration error:', err);
            return { success: false, message: error.value };
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        error,
        success,
        registerPet,
    };
}