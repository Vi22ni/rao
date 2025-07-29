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
    background: var(--color-background);
    box-shadow: 0px -2px 1px 0px rgba(0, 0, 0, 0.40) inset;
}

h1 {
    color: var(--color-text);
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
    background: var(--color-background-soft);
    box-shadow: 0px -2px 1px 0px rgba(0, 0, 0, 0.40) inset;
    min-height: 130px;
}

.textContainer :deep(a),
.textContainer :deep(p) {
    color: var(--color-text-soft);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>