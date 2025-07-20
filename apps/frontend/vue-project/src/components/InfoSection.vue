<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})

const { title } = props;
</script>

<template>
    <section>
        <div class="titleContainer">
            <h1>
                {{ title }}
            </h1>
        </div>
        <div class="textContainer">
            <slot>
            </slot>
        </div>
    </section>
</template>

<style lang="css" scoped>
section {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.titleContainer {
    display: inline-flex;
    height: 45px;
    padding: 15px 30px;
    justify-content: flex-end;
    align-items: center;
    flex-shrink: 0;
    background: linear-gradient(180deg, rgba(143, 143, 143, 0.85) 0%, rgba(183, 183, 183, 0.85) 45%, rgba(203, 203, 203, 0.85) 50%, rgba(223, 223, 223, 0.85) 100%);
    box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.30), 0px -2px 1px 0px rgba(0, 0, 0, 0.40) inset;
}

h1 {
    color: #3C3C3C;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.textContainer {
    display: inline-flex;
    /* height: 204px; */
    padding: 15px 30px;
    align-items: flex-start;
    flex-shrink: 0;
    background: rgba(143, 143, 143, 0.85);
    box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.30), 0px -2px 1px 0px rgba(0, 0, 0, 0.40) inset;
    min-height: 130px;
}

.textContainer :deep(p) {
    color: rgba(0, 0, 0, 0.86);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>