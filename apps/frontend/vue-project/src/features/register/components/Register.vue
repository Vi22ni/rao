<script setup lang="ts">
import Form from './Form.vue';
import InfoSection from '@/components/InfoSection.vue';
</script>

<template>
    <Form />

    <InfoSection title="como funciona">
        <p>
            clique em participar;
            <br />
            <br />
            adicione a foto e os dados do seu pet;
            <br />
            <br />
            Pronto!
            <br/>
            <br/>
            obs: a foto do pet deve ser clara e com apenas o pet na foto
        </p>
    </InfoSection>
    <InfoSection title="sobre">
        <p>
            'pets' é um website feito por Vinícius Bueno para fins de aprendizado. A aplicação utiliza NodeJS no backend,
            junto com o ORM Sequelize e o banco de dados PostgreSql. No frontend, foi utilizado VueJS. O design,
            inspirado nas interfaces de computadores dos anos 2005 - 2010, foi feito no Figma.
            <br />
            <br />
            saiba mais em:
            <a href="https://vinibueno.com"> https://vinibueno.com </a>
        </p>
    </InfoSection>

</template>