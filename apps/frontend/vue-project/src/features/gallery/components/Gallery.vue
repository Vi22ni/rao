<script setup lang="ts">
import Carousel from './Carousel.vue';

const mockData = [
    {
        id: 1,
        name: 'zion',
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
        name: 'babalu',
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
        id: 3,
        name: 'labubu',
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
        id: 4,
        name: 'floid',
        species: 'cat',
        photoUrl: 'https://c.files.bbci.co.uk/18d0/live/88ff5600-d979-11ef-a5c8-1da73bd59591.jpg',
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