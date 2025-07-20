<script setup lang="ts">
import type { IPet } from '@/types/pet';
import type { PropType } from 'vue';

const props = defineProps({
    pet: {
        type: Object as PropType<IPet>,
        required: true
    },
    isSelected: Boolean
})

const { pet } = props;
</script>

<template>
    <div :class="['card', { 'selectedCard': isSelected }]" :style="{
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 50%, #000 100%), url(${pet.photoUrl}) lightgray 50% / cover no-repeat`,
        zIndex: isSelected ? 2 : 1,
        transition: 'all 0.3s ease'
    }">
        <div class="infoWrapper">
            <h2>{{ pet.name }}</h2>
        </div>
    </div>
</template>


<style scoped>
.selectedCard,
.card {
    display: flex;
    width: 200px;
    height: 190px;
    padding: 15px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    box-shadow: 0px -2px 1px 0px rgba(0, 0, 0, 0.40) inset, 0px 10px 15px 0px rgba(0, 0, 0, 0.30);
    /* flex: 0 0 100%; */
    overflow: hidden;
}

.selectedCard {
    height: 210px;
    border-radius: 0px 0px 0px 50px;
    margin-left: 30px;
}

.infoWrapper {
    display: flex;
    height: 65px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 5px;
    flex-shrink: 0;
    align-self: stretch;
}

.selectedCard h2,
.card h2 {
    color: #FFF;
    font-style: normal;
    font-size: 30px;
    font-weight: 400;
    line-height: normal;
}

.selectedCard h2 {
    font-size: 36px;
}
</style>