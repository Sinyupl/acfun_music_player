<template>
  <div class="list_container">
    <div class="tabs">
      <div
        class="tab"
        @click="selectPage(0)"
        :class="{ active: currentListIndex === 0 }"
      >
        今日
      </div>
      <div
        class="tab"
        @click="selectPage(1)"
        :class="{ active: currentListIndex === 1 }"
      >
        三日
      </div>
      <div
        class="tab"
        @click="selectPage(2)"
        :class="{ active: currentListIndex === 2 }"
      >
        本周
      </div>
      <div
        class="tab"
        @click="selectPage(3)"
        :class="{ active: currentListIndex === 3 }"
      >
        收藏
      </div>
      <div
        class="tab"
        @click="selectPage(4)"
        :class="{ active: currentListIndex === 4 }"
      >
        关注
      </div>
      <div
        class="tab user"
        
        :class="{ active: currentListIndex === 5 }"
        v-show="storageUserName"
      >
        <span class="name" @click="selectPage(5)"> {{ storageUserName }}</span>
        <span class="close" @click="clearStorage">×</span>
      </div>
    </div>
    <div class="play_list_button" @click="playList">播放列表</div>
    <div class="list_content" v-if="[0, 1, 2].indexOf(currentListIndex) !== -1">
      <div
        class="rank_item"
        v-for="(item, index) in rankList"
        :key="item.contentId"
        @dblclick="selectItem(index)"
        :class="{
          active:
            currentSongIndex === index &&
            selectedListIndex === currentListIndex,
        }"
      >
        <span>{{ item.userName }}</span>
        <span>{{ item.contentTitle }}</span>
      </div>
    </div>
    <div class="list_content" v-if="currentListIndex === 3">
      <div
        class="rank_item"
        v-for="(item, index) in likeList"
        :key="item.contentId"
        @dblclick="selectItem(index)"
        :class="{
          active:
            currentSongIndex === index &&
            selectedListIndex === currentListIndex,
        }"
      >
        <span>{{ item.userName }}</span>
        <span>{{ item.contentTitle }}</span>
        <div class="icon_container">
          <div class="icon" v-html="cancelFavorite"></div>
          <div class="confirm" @click="unFavorite(index)">确定取消收藏</div>
        </div>
      </div>
    </div>
    <div class="list_content" v-if="currentListIndex === 4">
      <div
        class="rank_item"
        v-for="(item, index) in pushList"
        :key="item.contentId"
        @dblclick="selectItem(index)"
        :class="{
          active:
            currentSongIndex === index &&
            selectedListIndex === currentListIndex,
        }"
      >
        <span>{{ item.user.userName }}</span>
        <span>{{ item.caption }}</span>
      </div>
    </div>
    <div class="list_content" v-if="currentListIndex === 5">
      <div
        class="rank_item"
        v-for="(item, index) in storageList"
        :key="item.contentId"
        @dblclick="selectItem(index)"
        :class="{
          active:
            currentSongIndex === index &&
            selectedListIndex === currentListIndex,
        }"
      >
        <span>{{ item.time }}</span>
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { cancelFavorite } from '../assets/svg'
export default {
  data() {
    return {
      currentListIndex: 0, // 榜单索引
      selectedListIndex: 0,
      rankList: [],
      likeList: [],
      pushList: [],
      currentSongIndex: null, // 当前歌曲索引
      cancelFavorite: cancelFavorite, // 取消收藏按钮
      storageUserName: null, // 个人播放列表的用户名称
      storageList: [], // 个人播放列表
      storageUid: null,
      storageJson: null
    }
  },
  emits: ['selectItem'],
  created() {
    this.selectPage(0)
    this.getFavorite()
    this.getPushList()
    if (localStorage.acfunMusicJson) {
      this.storageJson = JSON.parse(localStorage.acfunMusicJson)
    }
    window.addEventListener('storage', () => {
      this.storageJson = JSON.parse(localStorage.acfunMusicJson)
    })
  },
  watch: {
    storageJson() {
      this.initStorage()
    }
  },
  methods: {
    // 初始化缓存
    initStorage() {
      if (localStorage.acfunMusicJson) {
        const data = JSON.parse(localStorage.acfunMusicJson)
        if (this.storageUserName === data.name) {
          return
        }
        this.storageUserName = data.name
        this.storageList = data.list
        this.storageUid = data.uid
        if (this.currentListIndex === 5) {
          this.currentSongIndex = null
        }
      }
    },
    clearStorage() {
      localStorage.removeItem('acfunMusicJson')
      this.storageUserName = null
      this.storageList = []
      this.storageUid = null
      if (this.currentListIndex === 5) {
        this.selectPage(0)
      }
    },
    selectPage(index) {
      this.currentListIndex = index
      const url =
        '/rest/pc-direct/rank/channel?channelId=58&subChannelId=&rankLimit=30&rankPeriod='
      let keyWord
      if (index === 0) {
        keyWord = 'DAY'
      }
      if (index === 1) {
        keyWord = 'THREE_DAYS'
      }
      if (index === 2) {
        keyWord = 'WEEK'
      }
      fetch(`${url}${keyWord}`)
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          this.rankList = res.rankList
        })
    },
    selectItem(index) {
      this.currentSongIndex = index
      this.selectedListIndex = this.currentListIndex
      if ([0, 1, 2].indexOf(this.currentListIndex) !== -1) {
        this.$emit('selectItem', this.rankList, index)
      } else if (this.currentListIndex === 3) {
        this.$emit('selectItem', this.likeList, index)
      } else if (this.currentListIndex === 4) {
        this.$emit('selectItem', this.pushList, index)
      } else if (this.currentListIndex === 5) {
        const list = this.storageList.map((item) => {
          return {
            ...item,
            userName: this.storageUserName,
            userId: this.storageUid,
          }
        })
        this.$emit('selectItem', list, index)
      }
    },
    playList() {
      this.selectItem(0)
    },
    changeSelectedIndex(index) {
      this.currentSongIndex = index
    },
    getFavorite() {
      this.likeList = []
      fetch('/rest/pc-direct/favorite/dougaList', {
        method: 'post',
        body: new URLSearchParams('page=1&perpage=1000'),
      })
        .then((res) => res.json())
        .then((res) => {
          const list = res.favoriteList
          for (let item of list) {
            if (
              [103, 136, 137, 139, 185, 215].indexOf(
                item.channelInfo.channelId
              ) !== -1
            ) {
              this.likeList.push(item)
              continue
            }
            if (item.channelInfo.channelId === 207) {
              const reg = /唱|编曲|作曲|曲绘|混音|歌回|cover/g
              if (
                (item.contentDesc && item.contentDesc.match(reg) !== null) ||
                item.userId === 3473754 ||
                (item.contentTitle && item.contentTitle.match(reg) !== null)
              ) {
                this.likeList.push(item)
                continue
              }
            }
          }
        })
    },
    getPushList() {
      this.pushList = []
      fetch('/rest/pc-direct/feed/webPush?count=500&pcursor=0')
        .then((res) => res.json())
        .then((res) => {
          const list = res.feedList
          for (let item of list) {
            if (
              [103, 136, 137, 139, 185, 215].indexOf(item.channel.id) !== -1
            ) {
              this.pushList.push(item)
            }
          }
        })
    },
    unFavorite(index) {
      fetch('/rest/pc-direct/unFavorite', {
        method: 'post',
        body: new URLSearchParams(
          `resourceIds=${this.likeList[index].contentId}&resourceType=9`
        ),
      }).then(() => {
        this.likeList.splice(index, 1)
        const listTemp = JSON.stringify(this.likeList)
        this.likeList = []
        this.$nextTick(() => {
          this.likeList = JSON.parse(listTemp)
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.list_container {
  width: 800px;
  height: 100%;
}
.tabs {
  width: 600px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .tab {
    flex: 1;
    color: #339999;
    box-sizing: border-box;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &.user{
      flex: 2
    }
    &.active {
      border-bottom: 2px solid #339999;
    }
    .name {
      width: calc(100% - 20px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: inline-block;
    }
    .close {
      transform: translateX(10%);
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: rgba($color: #dfdfdf, $alpha: 0.8);
      align-self: center;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.play_list_button {
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #339999;
  border: 1px solid #339999;
  border-radius: 18px;
  margin: 2px 0;
  margin-left: 15px;
  margin-top: 10px;
  width: 120px;
  cursor: pointer;
}
.list_content {
  height: calc(100% - 149px);
  overflow: auto;
  padding: 10px 0;
  margin-top: 5px;
  .rank_item {
    display: flex;
    height: 45px;
    align-items: center;
    font-size: 15px;
    color: #339999;
    user-select: none;
    padding-left: 20px;
    border-radius: 23px;
    &.active {
      position: relative;
      color: #0099cc;
      &::before {
        content: '';
        position: absolute;
        left: 4px;
        top: 16px;
        display: block;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-left: 6px solid #0099cc;
      }
    }
    &:hover {
      background: rgba($color: #fff, $alpha: 0.2);
      .icon_container {
        display: flex;
      }
    }
    span {
      &:first-of-type {
        margin-right: 5px;
        padding: 2px 4px;
        border-radius: 3px;
        background: #99cccc;
        color: #fff;
      }
      &:last-of-type {
        max-width: 65%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .icon_container {
      display: none;
      align-items: center;
      overflow: hidden;
      width: 20px;
      transition: all 0.3s;
      margin-left: 15px;
      &:hover {
        width: 130px;
      }
      .confirm {
        font-size: 12px;
        color: #339999;
        cursor: pointer;
        margin-left: 5px;
        background: #fff;
        height: 24px;
        padding: 0 8px;
        display: flex;
        align-items: center;
        width: 75px;
        border-radius: 12px;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .icon {
      display: flex;
      cursor: pointer;
      width: 20px;
      height: 20px;
      align-items: center;
    }
  }
}
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #339999;
  border-radius: 3px;
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>