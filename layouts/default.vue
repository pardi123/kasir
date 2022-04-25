<template>
  <v-app>
    <core-drawer />
    <core-app-bar />
    <core-view />
    
  </v-app>
</template>

<script>
import View from '@/components/core/views.vue' ;
import AppBar from '@/components/core/appBar.vue';
import Drawer from '@/components/core/Drawer.vue';
export default {
  props:{
    source: String,
  },
  components: {
    CoreDrawer : Drawer,
    CoreAppBar: AppBar,
    CoreView: View,
  },
  data: () => ({
    drawer : null,
  }),
}
</script>

<style>

</style>