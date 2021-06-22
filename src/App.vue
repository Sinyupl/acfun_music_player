<template>
  <iconButton @click="handleShowMain" />
  <mainContent @hideMain="handleHideMain" v-show="showMain" />
</template>

<script>
import iconButton from './components/iconButton.vue'
import mainContent from './components/main.vue'
export default {
  name: 'acMusic',
  components: {
    iconButton,
    mainContent,
  },
  data() {
    return {
      showMain: false,
    }
  },
  methods: {
    handleShowMain(){
      this.showMain = true
      document.querySelector('#app').classList.add('noscroll')
    },
    handleHideMain(){
      this.showMain = false
      document.querySelector('#app').classList.remove('noscroll')
    }
  }
}
</script>

<style>
.noscroll{
  overflow: hidden;
  height: 100vh;
}
</style>
