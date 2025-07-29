<script setup lang="ts">
import { ref, watchEffect, type PropType } from 'vue'
import Card from './Card.vue'
import type { IPet } from '@/types/pet'
import { useSelectedCardStore } from '../stores/selectedCard'

const props = defineProps({
    pets: {
        type: Array as PropType<IPet[]>,
        required: true
    },
    hasMore: Boolean,
    loading: Boolean,
    error: String
})

const emit = defineEmits(['loadMore'])

const selectedCard = useSelectedCardStore()
const currentIndex = ref(0)
const isAnimating = ref(false)

watchEffect(() => {
    if (props.pets.length > 0) {
        selectedCard.set(props.pets[currentIndex.value].id)
    }
})

const navigate = (direction: 'prev' | 'next') => {
    if (isAnimating.value) return

    isAnimating.value = true

    if (direction === 'prev' && currentIndex.value > 0) {
        currentIndex.value--
    } else if (direction === 'next') {
        if (currentIndex.value >= props.pets.length - 5 && props.hasMore) {
            emit('loadMore')
        }
        if (currentIndex.value < props.pets.length - 1) {
            currentIndex.value++
        }
    }

    // setTimeout(() => {
    isAnimating.value = false
    // }, 500)
}

const touchStartX = ref(0)
const onTouchStart = (e: TouchEvent | MouseEvent) => {
    if ('touches' in e) {
        touchStartX.value = e.touches[0].clientX;
    } else {
        touchStartX.value = e.clientX;
    }
}

const onTouchEnd = (e: TouchEvent | MouseEvent) => {
    let touchEndX: number;
    if ('changedTouches' in e) {
        touchEndX = e.changedTouches[0].clientX;
    } else {
        touchEndX = e.clientX;
    }
    const diff = touchStartX.value - touchEndX

    if (Math.abs(diff) > 50) {
        navigate(diff > 0 ? 'next' : 'prev')
    }
}

</script>

<template>
    <section class="carousel" @touchstart="onTouchStart" @touchend="onTouchEnd" @mousedown="onTouchStart"
        @mouseup="onTouchEnd">
        <div class="wrapper" :style="{ transform: `translateX(-${currentIndex * 200}px)` }">
            <Card v-for="(pet, index) in pets" :key="pet.id" :pet="pet" :is-selected="index === currentIndex"
                :style="{ transition: isAnimating ? 'transform 0.5s ease' : 'none' }" />
            <div v-if="loading" class="loadingMessage">
                Carregando mais pets...
            </div>

            <div v-if="error" class="errorMessage">
                {{ error }}
            </div>
        </div>

        <div class="actions">
            <button @click="navigate('prev')" :disabled="currentIndex === 0">
                anterior
            </button>
            <button @click="navigate('next')" :disabled="currentIndex === pets.length - 1">
                próximo
            </button>
        </div>
    </section>
</template>
<style lang="css" scoped>
section {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 0px 0px 0px 50px;
    background: var(--color-background);
    box-shadow: 0px -2px 1px 0px rgba(0, 0, 0, 0.40) inset;
    padding-bottom: 15px;
    overflow: hidden;
    margin-bottom: 30px;
}

.wrapper,
.actions {
    display: flex;
    width: 100%;
    padding: 15px 0px;
    flex-shrink: 0;
    align-items: center;
    transition: transform 0.5s ease;
}

.actions {
    justify-content: flex-end;
    padding: 0 30px;
    gap: 10px;
}

button {
    padding: 10px 12px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    border: none;
    background: #FFAE42;
    box-shadow: 0px -2px 1px 0px #3C3C3C26 inset;
    color: var(--color-text-soft);
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

button:hover {
    background: #ff9d1c;
    cursor: pointer;
}

.loadingMessage,
.errorMessage {
    padding: 1rem;
    text-align: center;
    margin: 1rem 0;
}

.errorMessage {
    color: #FFAE42;
}
</style>