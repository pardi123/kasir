<template>
    <v-main class="grey lightten-3">
        <div id="core-view">
            <v-fade-transition mode="out-in">
                <nuxt></nuxt>
            </v-fade-transition>
        </div>
    </v-main>
</template>

<script>
export default {
    name: 'coreView',
}
</script>

<style>

</style>