<script setup lang="ts">
import type { IPet } from '@/types/pet';
import type { PropType } from 'vue';

const props = defineProps({
    pet: {
        type: Object as PropType<IPet>,
        default: () => { }
    },
    isFirst: {
        type: Boolean,
        default: false
    }
})

const { pet, isFirst } = props;
console.log("🚀 ~ pet:", pet)
</script>

<template>
    <div :class="{ 'firstCard': isFirst, 'card': !isFirst }"
        :style="{ background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 50%, #000 100%), url(${pet.photoUrl}) lightgray 50% / cover no-repeat ` }">
        <div class="infoWrapper">
            <h2>
                {{ pet.name }}
            </h2>
        </div>
    </div>
</template>

<style scoped>
.firstCard,
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
}

.firstCard {
    height: 210px;
    border-radius: 0px 0px 0px 50px;
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

.firstCard h2,
.card h2 {
    color: #FFF;
    font-style: normal;
    font-size: 30px;
    font-weight: 400;
    line-height: normal;
}

.firstCard h2 {
    font-size: 36px;
}
</style>