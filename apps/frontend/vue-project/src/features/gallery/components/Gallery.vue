<script setup lang="ts">
import Carousel from './Carousel.vue';
import InfoSection from '@/components/InfoSection.vue';
import useGallery from '../composables/useGallery';

const { pets, loading, error, hasMore, handleLoadMore } = useGallery();
</script>

<template>
    <Carousel :pets="pets" :has-more="hasMore" @load-more="handleLoadMore" :error="error ? error : ''"
        :loading="loading" />
    <InfoSection title="como funciona">
        <p>
            Clique em participar;
            <br />
            <br />
            Adicione a foto e os dados do seu pet;
            <br />
            <br />
            Pronto!
        </p>
    </InfoSection>
    <InfoSection title="sobre">
        <p>
            Pets é um website feito por Vinícius Bueno para fins de aprendizado. A aplicação utiliza NodeJS no backend,
            junto com o ORM Sequelize e o banco de dados PostgreSql. No frontend, foi utilizado VueJS. O design,
            inspirado nas interfaces de computadores dos anos 2005 - 2010, foi feito no Figma.
            <br />
            <br />
            Saiba mais em:
            <a href="https://vinibueno.com"> https://vinibueno.com </a>
        </p>
    </InfoSection>


</template>

<style lang="css" scoped>

</style>