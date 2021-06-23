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
    }
  },
  emits: ['selectItem'],
  created() {
    this.selectPage(0)
    this.getFavorite()
    this.getPushList()
  },
  methods: {
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
      } else {
        this.$emit('selectItem', this.pushList, index)
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
              const reg = /原唱|编曲|翻唱|作曲|曲绘|混音|歌回/g
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
    getMusicList(list) {
      let _list = []
      for (let item of list) {
        if (
          [103, 136, 137, 139, 185, 215].indexOf(item.channelInfo.channelId) !==
            -1 ||
          [103, 136, 137, 139, 185, 215].indexOf(item.channel.id) !== -1
        ) {
          _list.push(item)
          continue
        }
        if (item.channelInfo.channelId === 207 || item.channel.id === 207) {
          const reg = /原唱|编曲|翻唱|作曲|曲绘/g
          if (
            (item.contentDesc && item.contentDesc.match(reg) !== null) ||
            item.userId === 3473754 ||
            (item.caption && item.caption.match(reg))
          ) {
            _list.push(item)
            continue
          }
        }
      }
      return _list
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
  width: 400px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .tab {
    flex: 1;
    color: #ffe4e1;
    box-sizing: border-box;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    &.active {
      border-bottom: 2px solid #ffe4e1;
    }
  }
}
.play_list_button {
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 18px;
  margin: 2px 0;
  margin-left: 15px;
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
    color: #fff;
    user-select: none;
    padding-left: 20px;
    border-radius: 23px;
    &.active {
      background: rgba(255, 255, 255, 0.3);
    }
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      .icon_container {
        display: flex;
      }
    }
    span {
      &:first-of-type {
        margin-right: 5px;
        padding: 2px 4px;
        border-radius: 3px;
        background: #dc143c;
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
        color: #dc143c;
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
  background: #b22222;
  border-radius: 3px;
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>