<template>
  <iframe
    :src="currentSrc"
    frameborder="0"
    class="video_player"
    v-if="currentSrc"
    :class="{ active: showVideo }"
    ref="video"
  ></iframe>
  <iframe
    v-if="currentSong.contentId"
    :src="
      'https://api-new.app.acfun.cn/rest/app/douga/info?dougaId=' +
      currentSong.contentId
    "
    hidden
  ></iframe>
  <div class="player_container" v-show="showControl">
    <div class="song_info">
      <div class="cover">
        <img :src="currentSong.coverUrl || currentSong.contentImg" alt="" />
        <div
          class="expand"
          v-html="expand"
          @click="showVideo = !showVideo"
          :class="{ active: showVideo }"
        ></div>
      </div>
      <div class="info_text">
        <a
          :title="
            currentSong.title || currentSong.contentTitle || currentSong.caption
          "
          target="_blank"
          :href="
            'https://www.acfun.cn/v/ac' +
            (currentSong.contentId || currentSong.resourceId)
          "
        >
          {{
            currentSong.title || currentSong.contentTitle || currentSong.caption
          }}
        </a>
        <p v-if="videoLength > 1" class="part">
          <span
            v-for="n in videoLength"
            :key="n"
            @click="selectPart(n)"
            :class="{ active: currentPart === n }"
            >P{{ n }}</span
          >
        </p>
        <a
          target="_blank"
          v-if="currentSong.userName"
          :href="'https://www.acfun.cn/u/' + currentSong.userId"
          >{{ currentSong.userName }}</a
        >
        <a
          target="_blank"
          v-if="currentSong && !currentSong.userName && currentSong.user"
          :href="'https://www.acfun.cn/u/' + currentSong.user.userId"
          >{{ currentSong.user.userName }}</a
        >
        <div class="song_panel">
          <div
            v-html="banana_blank"
            v-show="!bananaActive"
            @click="throwBanana"
          ></div>
          <div v-html="banana_active" v-show="bananaActive"></div>
          <div v-html="like_blank" v-show="!likeActive" @click="likeSong"></div>
          <div v-html="like_active" v-show="likeActive"></div>
          <div
            v-html="favorite_blank"
            v-show="!favoriteActive"
            @click="favorite"
          ></div>
          <div v-html="favorite_active" v-show="favoriteActive"></div>
        </div>
      </div>
    </div>
    <div class="player">
      <div class="main">
        <div class="loop_type">
          <div
            v-html="loopList"
            v-show="loopType === 0"
            @click="setLoopType(1)"
          ></div>
          <div
            v-html="loopSingle"
            v-show="loopType === 1"
            @click="setLoopType(2)"
          ></div>
          <div
            v-html="loopRandom"
            v-show="loopType === 2"
            @click="setLoopType(0)"
          ></div>
        </div>
        <div class="controls">
          <prevBtn @click="playPre" />
          <playBtn v-show="!playing" @click="play" />
          <pausedBtn v-show="playing" @click="pause" />
          <nextBtn @click="playNext" />
        </div>
        <div class="volume">
          <div
            class="icon"
            v-html="volumeIcon"
            v-show="!ismuted"
            @click="setMute"
          ></div>
          <div
            class="icon"
            v-html="mute"
            v-show="ismuted"
            @click="phonic"
          ></div>
          <input type="range" @input="changeVolume" ref="volume" max="100" />
        </div>
      </div>
      <div class="progress" :class="{ anlisi: isAnlisi, baobao: baobao }">
        <span>{{ currentTimeTxt }}</span
        ><input
          type="range"
          :value="currntTime"
          :max="duration"
          @input="changeCurrentTime"
          ref="range"
        /><span>{{ durationTxt }}</span>
      </div>
    </div>
  </div>
  <transition name="slide-fade">
    <div class="music_popup" v-show="showPopup"></div>
  </transition>
</template>

<script>
import prevBtn from './prev'
import nextBtn from './next'
import playBtn from './play'
import pausedBtn from './paused'
import {
  expand,
  banana_active,
  banana_blank,
  like_active,
  like_blank,
  favorite_active,
  favorite_blank,
  loopList,
  loopSingle,
  loopRandom,
  volume,
  mute,
  anlisi,
} from '../assets/svg'
function padZero(num) {
  if (num < 10) {
    return '0' + num
  } else {
    return num
  }
}
function timeFn(num) {
  if (num < 60) {
    return `00:${padZero(num)}`
  }
  if (num >= 60 && num < 3600) {
    const seconds = num % 60
    const minutes = Math.floor((num - seconds) / 60)
    return `${padZero(minutes)}:${padZero(seconds)}`
  }
  if (num >= 3600) {
    const seconds = num % 60
    const hours = Math.floor(num / 3600)
    const minutes = Math.floor(num / 60) % 60
    return `${hours}:${padZero(minutes)}:${padZero(seconds)}`
  }
}
export default {
  components: {
    prevBtn,
    nextBtn,
    playBtn,
    pausedBtn,
  },
  emits: ['updateFavorite', 'changeSelectedIndex'],
  props: ['list', 'playIndex'],
  watch: {
    playingSong() {
      this.playVideo(this.playIndex)
      this.showControl = true
    },
  },
  computed: {
    currentTimeTxt() {
      return timeFn(this.currntTime)
    },
    durationTxt() {
      return timeFn(this.duration)
    },
    playingSong() {
      const { list, playIndex } = this
      return { list, playIndex }
    },
  },
  data() {
    return {
      playing: true,
      currentSong: {},
      currentSrc: null,
      showVideo: false,
      currentIndex: 0,
      showControl: false,
      currntTime: 0,
      duration: 0,
      showPopup: false,
      bananaActive: false, // 用于切换投蕉显示
      likeActive: false, // 用于点赞切换显示
      favoriteActive: false, // 用于收藏切换显示
      loopType: 0, // 0 列表循环，1单曲循环，2随机播放
      ismuted: false, // 是否静音
      isAnlisi: false, // 是否暗莉斯的稿件，触发彩蛋
      baobao: false, // 触发咸鱼新手宠坏稿件
      videoLength: 1,
      currentPart: 1,
      // 图标
      expand: expand,
      banana_active: banana_active,
      banana_blank: banana_blank,
      like_active: like_active,
      like_blank: like_blank,
      favorite_active: favorite_active,
      favorite_blank: favorite_blank,
      loopList,
      loopSingle,
      loopRandom,
      volumeIcon: volume,
      mute,
      anlisi,
    }
  },
  mounted() {
    global.playNext = this.playNext
    global.updateCurrentTime = this.updateCurrentTime
    global.setDuration = this.setDuration
    global.autoPlayNext = this.autoPlayNext
    global.setVolume = this.setVolume
    global.changePartLength = this.changePartLength
    global.updatePartIndex = this.updatePartIndex
    global.updateLikeInfo = this.updateLikeInfo
    global.setPlayStatus = this.setPlayStatus
    global.setMuteStatus = this.setMuteStatus
  },
  methods: {
    playVideo(index) {
      this.isAnlisi = false
      this.baobao = false
      this.playing = true
      this.currentIndex = index
      this.currentSong = this.list[index]
      this.bananaActive = false
      this.likeActive = false
      this.favoriteActive = false
      this.videoLength = 0
      this.currentPart = 1
      this.currntTime = 0
      this.currentSrc = `https://www.acfun.cn/v/ac${
        this.currentSong.contentId || this.currentSong.resourceId
      }#innerPlayer`
      this.$emit('changeSelectedIndex', index)
      this.$store.commit('changePlaying', true)
      if (this.currentSong.userId === 3568347) {
        this.isAnlisi = true
      }
      if (this.currentSong.contentId === 27369083) {
        this.baobao = true
      }
    },
    play() {
      this.playing = true
      this.$refs.video.contentWindow.play()
      this.$store.commit('changePlaying', true)
    },
    pause() {
      this.playing = false
      this.$refs.video.contentWindow.pause()
      this.$store.commit('changePlaying', false)
    },
    playNext() {
      this.currntTime = 0
      this.duration = 0
      if (this.loopType !== 2) {
        if (this.currentIndex < this.list.length) {
          this.playVideo(++this.currentIndex)
        } else {
          this.playVideo(0)
        }
      } else {
        this.playRandom()
      }
    },
    playRandom() {
      const randomNum = Math.floor(Math.random() * this.list.length)
      this.playVideo(randomNum)
    },
    autoPlayNext() {
      if (this.loopType === 0) {
        this.currntTime = 0
        this.duration = 0
        this.playNext()
      }
      if (this.loopType === 1) {
        this.play()
      }
      if (this.loopType === 2) {
        this.currntTime = 0
        this.duration = 0
        this.playRandom()
      }
    },
    playPre() {
      this.currntTime = 0
      this.duration = 0
      if (this.currentIndex === 0) {
        this.playVideo(this.list.length - 1)
      } else {
        this.playVideo(--this.currentIndex)
      }
    },
    updateCurrentTime(num) {
      this.currntTime = Math.floor(num)
    },
    setDuration(num) {
      this.duration = Math.floor(num)
    },
    changeCurrentTime() {
      this.$refs.video.contentWindow.changeCurrentTime(this.$refs.range.value)
    },
    throwBanana() {
      this.bananaActive = true
      fetch('/rest/pc-direct/banana/throwBanana', {
        method: 'post',
        body: new URLSearchParams(
          `resourceId=${
            this.currentSong.contentId || this.currentSong.resourceId
          }&count=5&resourceType=2`
        ),
      })
    },
    async likeSong() {
      this.likeActive = true
      const tokenObj = await fetch(
        'https://id.app.acfun.cn/rest/web/token/get',
        {
          method: 'post',
          body: new URLSearchParams('sid=acfun.midground.api'),
          credentials: 'include',
        }
      )
        .then((res) => res.json())
        .then((res) => res)
      fetch('https://kuaishouzt.com/rest/zt/interact/add', {
        method: 'post',
        credentials: 'include',
        body: new URLSearchParams(
          `kpn=ACFUN_APP&kpf=PC_WEB&subBiz=mainApp&interactType=1&objectType=2&objectId=${
            this.currentSong.contentId || this.currentSong.resourceId
          }&acfun.midground.api_st=${
            tokenObj['acfun.midground.api_st']
          }&userId=${
            tokenObj.userId
          }&extParams%5BisPlaying%5D=false&extParams%5BshowCount%5D=1&extParams%5BotherBtnClickedCount%5D=29&extParams%5BplayBtnClickedCount%5D=0`
        ),
      })
    },
    favorite() {
      this.favoriteActive = true
      fetch('/rest/pc-direct/favorite', {
        method: 'post',
        body: new URLSearchParams(
          `resourceId=${
            this.currentSong.contentId || this.currentSong.resourceId
          }&resourceType=9`
        ),
      }).then(() => {
        this.$emit('updateFavorite')
      })
    },
    setLoopType(type) {
      this.loopType = type
    },
    setVolume(val) {
      this.$refs.volume.value = val * 100
    },
    setMuteStatus(val) {
      this.ismuted = val
    },
    setPlayStatus(val) {
      this.playing = val
    },
    changeVolume() {
      const val = Number(this.$refs.volume.value) / 100
      this.$refs.video.contentWindow.changeVol(val)
    },
    setMute() {
      this.ismuted = true
      this.$refs.video.contentWindow.mute()
    },
    phonic() {
      this.ismuted = false
      this.$refs.video.contentWindow.phonic()
    },
    changePartLength(lg) {
      this.videoLength = lg
    },
    selectPart(n) {
      this.currentPart = n
      this.$refs.video.contentWindow.playPart(n - 1)
    },
    updatePartIndex(index) {
      this.currentPart = index + 1
    },
    updateLikeInfo(obj) {
      this.likeActive = obj.like
      this.bananaActive = obj.banana
      this.favoriteActive = obj.collect
    },
  },
}
</script>
<style lang="scss" scoped>
.video_player {
  position: fixed;
  bottom: -600px;
  left: 0px;
  width: 1000px;
  height: 600px;
  z-index: 10;
  transition: all 0.2s;
  &.active {
    bottom: 120px;
  }
}
.player_container {
  position: fixed;
  z-index: 11;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  display: flex;
  box-sizing: border-box;
  padding: 50px;
  align-items: center;
  justify-content: center;
  background: #800000;
  .song_info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cover {
      position: relative;
      width: 180px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
      }
      .expand {
        position: absolute;
        width: 60px;
        left: 50%;
        margin-left: -30px;
        top: 12px;
        opacity: 0;
        transition: all 0.3s;
        &.active {
          transform: rotateX(180deg);
        }
        &:hover {
          opacity: 1;
        }
      }
    }
    .info_text {
      width: 250px;
      margin-left: 10px;
      a {
        display: block;
        margin: 2px 0;
        padding: 0;
        color: #fff;
        font-size: 13px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .song_panel {
        display: flex;
        height: 30px;
        align-items: center;
        margin-top: 10px;
        div {
          margin: 0 8px;
        }
      }
      .part {
        margin: 0;
        padding: 0;
        height: 28px;
        display: flex;
        align-items: center;
        width: 100%;
        overflow-x: auto;

        span {
          display: block;
          width: 22px;
          padding: 0 2px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 3px;
          border: 1px solid #fff;
          color: #fff;
          cursor: pointer;
          margin-right: 10px;
          &.active {
            color: #800000;
            background: #fff;
          }
        }
      }
    }
  }
  .main {
    width: 600px;
    display: flex;
    .loop_type {
      width: 100px;
      height: 18px;
      margin-left: 20px;
    }
    .controls {
      display: flex;
      justify-content: center;
      width: 500px;
      svg {
        margin: 0 5px;
      }
    }
    .volume {
      width: 100px;
      display: flex;
      align-items: center;
      .icon {
        margin-right: 3px;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
      input[type='range'] {
        width: 70px;
      }
      input[type='range']::-webkit-slider-thumb {
        width: 12px;
        height: 12px;
      }
    }
  }
  .progress {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 10px;
    input {
      width: 500px;
    }
    span {
      color: #fff;
      font-size: 14px;
      padding: 0 10px;
      display: inline-block;
      min-width: 55px;
    }
    &.anlisi {
      input[type='range']::-webkit-slider-thumb {
        background-color: transparent;
        border: none;
        width: 45px;
        height: 45px;
        background-size: 100% 100%;
        background-image: url('data:image/png;base64,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');
      }
      input[type=range]::-moz-range-thumb {
        background-color: transparent;
        border: none;
        width: 45px;
        height: 45px;
        background-size: 100% 100%;
        background-image: url('data:image/png;base64,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');
      }
    }
    &.baobao {
      input[type='range']::-webkit-slider-thumb {
        background-color: transparent;
        border: none;
        width: 45px;
        height: 45px;
        background-size: 100% 100%;
        border-radius: 0%;
        background-image: url('https://js2.a.yximgs.com/bs2/emotion/1591240347005third_party_b50790004.png');
      }
       input[type=range]::-moz-range-thumb{
        background-color: transparent;
        border: none;
        width: 45px;
        height: 45px;
        background-size: 100% 100%;
        border-radius: 0%;
        background-image: url('https://js2.a.yximgs.com/bs2/emotion/1591240347005third_party_b50790004.png');
      }
    }
  }
}

/*横条样式*/
input[type='range'] {
  -webkit-appearance: none; /*清除系统默认样式*/
  background: -webkit-linear-gradient(135deg, #c71585, #f08080) no-repeat, #ddd; /*设置左边颜色为#61bd12，右边颜色为#ddd*/
  background-size: 100% 100%; /*设置左右宽度比例*/
  height: 3px; /*横条的高度*/
}
/*拖动块的样式*/
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none; /*清除系统默认样式*/
  height: 26px; /*拖动块高度*/
  width: 26px; /*拖动块宽度*/
  background: #fff; /*拖动块背景*/
  border-radius: 50%; /*外观设置为圆形*/
  border: solid 1px #ddd; /*设置边框*/
}
input[type=range]::-moz-range-thumb {
  height: 26px; /*拖动块高度*/
  width: 26px; /*拖动块宽度*/
  background: #fff; /*拖动块背景*/
  border-radius: 50%; /*外观设置为圆形*/
  border: solid 1px #ddd; /*设置边框*/
}
::-webkit-scrollbar {
  height: 4px;
}
::-webkit-scrollbar-thumb {
  background: #b22222;
  border-radius: 2px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>