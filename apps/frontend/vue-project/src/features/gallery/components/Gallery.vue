<script setup lang="ts">
import Carousel from './Carousel.vue';

const mockData = [
    {
        id: 1,
        name: 'scoob',
        species: 'dog',
        photoUrl: 'https://c.files.bbci.co.uk/18d0/live/88ff5600-d979-11ef-a5c8-1da73bd59591.jpg',
        traits: [
            {
                id: 2,
                name: 'quieto'
            },
            {
                id: 5,
                name: 'observador'
            },
            {
                id: 6,
                name: 'nervoso'
            },
        ]
    },
    {
        id: 2,
        name: 'dog',
        species: 'dog',
        photoUrl: 'data:image/jpeg;base64,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',
        traits: [
            {
                id: 2,
                name: 'quieto'
            },
            {
                id: 5,
                name: 'observador'
            },
            {
                id: 6,
                name: 'nervoso'
            },
        ]
    },
    {
        id: 3,
        name: 'labubu',
        species: 'dog',
        photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxpxYkK6CRzr9hXl1nnDoluBYZzCR5ERKojQ&s',
        traits: [
            {
                id: 2,
                name: 'quieto'
            },
            {
                id: 5,
                name: 'observador'
            },
            {
                id: 6,
                name: 'nervoso'
            },
        ]
    },
    {
        id: 4,
        name: 'floid',
        species: 'cat',
        photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThD4or2R-Tpyokw8NzJyn-LXt6R8YK9Sih5w&s',
        traits: [
            {
                id: 2,
                name: 'quieto'
            },
        ]
    },
]
</script>

<template>
    <Carousel :pets="mockData" />

</template>