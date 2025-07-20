
import { ref } from 'vue';
import type { ITrait } from '@/types/pet';


export default function getTraits() {
    const traits = ref<ITrait[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchTraits = async () => {
        try {
            loading.value = true;
            error.value = null;

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/traits`
            );

            if (!response.ok) throw new Error('Erro ao carregar traits');

            let { data } = await response.json();

            traits.value = [...data];
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Erro desconhecido';
            console.error('Erro ao buscar traits:', err);
        } finally {
            loading.value = false;
        }
    };

    fetchTraits();

    return {
        traits,
        loading,
        error
    };
}
