<template>
  <div class="acmusic_container">
    <div class="minify" v-html="minify" @click="hideMain"></div>
    <div class="content">
      <list @selectItem="selectItem" ref="list" />
    </div>
    <playerCtrl
      :list="list"
      :playIndex="playIndex"
      @updateFavorite="updateFavorite"
      @changeSelectedIndex="changeSelectedIndex"
    />
  </div>
</template>
<script>
import playerCtrl from './playerControl'
import list from './list'
import {minify} from '../assets/svg'
export default {
  components: {
    playerCtrl,
    list,
  },
  data() {
    return {
      list: [],
      playIndex: 0,
      minify,
    }
  },
  methods: {
    selectItem(list, index) {
      this.playIndex = index
      this.list = list
    },
    updateFavorite() {
      this.$refs.list.getFavorite()
    },
    changeSelectedIndex(index) {
      this.$refs.list.changeSelectedIndex(index)
    },
    hideMain() {
      this.$emit('hideMain')
    }
  },
}
</script>
<style lang="scss" scoped>
.acmusic_container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-image: linear-gradient(45deg, #800000, #ff6347);
  background-size: 400% 400%;
  background-position: 0% 0%;
  background-repeat: no-repeat;
  animation: bgMove 20s ease infinite;
  .minify {
    width: 28px;
    position: absolute;
    right: 30px;
    top: 30px;
    cursor: pointer;
  }
}
.content {
  display: flex;
  justify-content: center;
  height: calc(100% - 120px);
}

@keyframes bgMove {
  0% {
    background-position: 0% 0%;
  }
  25% {
    background-position: 100% 50%;
  }
  75% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>