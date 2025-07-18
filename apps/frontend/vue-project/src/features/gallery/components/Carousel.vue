<script setup lang="ts">
const props = defineProps({
    pets: {
        type: Array,
        required: true
    }
})

console.log(props.pets)
</script>

<template>
    <section>

    </section>

</template>

<style lang="css" scoped>
section {
    display: flex;
    width: 100%;
    height: 300px;
    padding: 15px 30px;
    align-items: center;
    flex-shrink: 0;
    border-radius: 0px 0px 0px 50px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 25%, rgba(112, 112, 112, 0.43) 50%, rgba(167, 167, 167, 0.64) 75%, rgba(223, 223, 223, 0.85) 100%);
    box-shadow: 0px -2px 1px 0px rgba(0, 0, 0, 0.40) inset, 0px 10px 15px 0px rgba(0, 0, 0, 0.30);
}
</style>