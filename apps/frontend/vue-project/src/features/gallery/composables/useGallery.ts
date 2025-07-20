
import { ref } from 'vue';
import type { IPet } from '@/types/pet'


export default function useGallery() {
  const pets = ref<IPet[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const hasMore = ref(true);
  const currentPage = ref(1);
  const itemsPerPage = 10;

  const fetchPets = async () => {
    try {
      loading.value = true;
      error.value = null;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/pets?page=${currentPage.value}&size=${itemsPerPage}`
      );

      if (!response.ok) throw new Error('Erro ao carregar pets');

      let { data } = await response.json();

      if (data.length === 0) {
        hasMore.value = false;
      } else {
        pets.value = [...pets.value, ...data];
        currentPage.value++;
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('Erro ao buscar pets:', err);
    } finally {
      loading.value = false;
    }
  };

  const handleLoadMore = () => {
    if (!loading.value && hasMore.value) {
      fetchPets();
    }
  };

  fetchPets();

  return {
    pets,
    loading,
    error,
    hasMore,
    handleLoadMore
  };
}