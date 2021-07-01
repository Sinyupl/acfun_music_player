
import { createApp } from 'vue'
import { createStore } from 'vuex'
// const createApp = vue.createApp
// const createStore = vuex.createStore
// if (process.env.NODE_ENV !== 'production') {
//     var createApp = Vue.createApp
//     var createStore = Vuex.createStore
// }

import App from './App.vue'
if (location.href === 'https://www.acfun.cn/v/list58/index.htm') {
    var el = document.createElement('div')
    el.id = 'musicApp'
    document.body.append(el)
    let _createStore
    let _createApp
    if (process.env.NODE_ENV !== 'production') {
        _createStore = Vuex.createStore
        _createApp = Vue.createApp
    } else {
        _createStore = createStore
        _createApp = createApp
    }
    const store = _createStore({
        state() {
            return {
                playing: false
            }
        },
        mutations: {
            changePlaying(state, playing) {
                state.playing = playing
            }
        }
    })
    const app = _createApp(App)
    app.use(store)
    app.mount('#musicApp')
}

const href = location.href
if (href.indexOf('/v/' !== -1) && href.indexOf('#innerPlayer') !== -1) {
    let video
    let playIndex = 1
    let videoInterval = setInterval(() => {
        video = document.querySelector('video')
        if (video) {
            clearInterval(videoInterval)
            video.play()
            window.parent.setDuration(video.duration)
            window.parent.setVolume(video.volume)
            window.parent.setMuteStatus(video.muted)
            const scrollDiv = document.querySelector('.scroll-div')
            if (scrollDiv) {
                const _lg = scrollDiv.querySelectorAll('li').length
                window.parent.changePartLength(_lg)
            }
            video.addEventListener('ended', () => {
                playPart(playIndex)
            })
            video.addEventListener('timeupdate', () => {
                window.parent.updateCurrentTime(video.currentTime)
            })
            video.addEventListener('play', () => {
                window.parent.setPlayStatus(true)
            })
            video.addEventListener('pause', () => {
                window.parent.setPlayStatus(false)
            })
            document.querySelectorAll('.btn-fullscreen')[0].click()
        }
    }, 400)
    let descInterval = setInterval(() => {
        var desc = document.querySelector('.video-description')
        if (desc) {
            clearInterval(descInterval)
            let like = false
            let banana = false
            let collect = false
            if (desc.querySelector('.like').classList.contains('active')) {
                like = true
            }
            if (desc.querySelector('.banana').classList.contains('active')) {
                banana = true
            }
            if (desc.querySelector('.collection').classList.contains('active')) {
                collect = true
            }
            window.parent.updateLikeInfo({
                like: like,
                banana: banana,
                collect: collect
            })
        }
    }, 400)
    const playPart = (index) => {
        playIndex = index + 1
        const scrollDiv = document.querySelector('.scroll-div')
        if (scrollDiv && scrollDiv.querySelectorAll('li').length > index) {
            scrollDiv.querySelectorAll('li')[index].click()
            video.addEventListener('canplay', () => {
                video.play()
                window.parent.updatePartIndex(index)
                window.parent.setDuration(video.duration)
            })
        } else {
            window.parent.autoPlayNext()
        }
    }
    global.play = () => {
        video.play()
    }
    global.pause = () => {
        video.pause()
    }
    global.changeCurrentTime = (val) => {
        video.currentTime = Math.floor(val)
    }
    global.changeVol = (val) => {
        video.volume = val
    }
    global.mute = () => {
        video.muted = true
    }
    global.phonic = () => {
        video.muted = false
    }
    global.playPart = playPart
}
if (href.indexOf('/u/') !== -1) {
    const uid = parseInt(href.split('/u/')[1])
    const reg = /<a href(.*?)a>/g
    let arr = []
    let dataList = []
    let pageIndex = 1
    async function getVideoList() {
        while (true) {
            const list = await fetch(`/u/${uid}?quickViewId=ac-space-video-list&reqID=1&ajaxpipe=1&type=video&order=newest&page=${pageIndex}&pageSize=10000&t=${new Date().getTime()}`)
                .then(res => res.text())
                .then(res => {
                    const _arr = res.match(reg)
                    return _arr
                })
            if (list) {
                arr = arr.concat(list)
                pageIndex++
            } else {
                break
            }
        }
        if (arr.length === 0) {
            alert('该用户无稿件')
            return
        }
        for (let item of arr) {
            let title = item.match(/title=\\"(.*?)">/)
            let img = item.match(/src=(.*?)\.(jpeg|jpg|JPG|png|PNG|gif|webp|imageMogr2)/)
            dataList.push({
                contentId: item.match(/ac[0-9]*/)[0].split('ac')[1],
                coverUrl: img ? img[0].substring(6) : null,
                title: title[0].substring(8, title[0].length - 3),
                time: item.match(/<p class=\\"date\\">(.*?)<\/p>/)[0].substring(18, 28),
                userId: uid
            })
        }
        const names = document.querySelectorAll('.name')
        let name
        for (let item of names) {
            let username = item.getAttribute('data-username')
            if (username) {
                name = username
                break
            }
        }
        const storageJson = JSON.stringify({
            name: name,
            uid: uid,
            list: dataList
        })
        localStorage.acfunMusicJson = storageJson
    }
    let button = document.createElement('div')
    button.className = 'ac_music_play'
    button.innerHTML = `添加列表<span>请返回播放器</span>`
    button.onclick = () => {
        getVideoList()
        button.classList.add('ok')
        setTimeout(() => {
            button.classList.remove('ok')
        }, 1000)
    }
    let style = document.createElement('style')
    style.innerHTML = `.ac_music_play{
        position: absolute;
        top:310px;
        right: 200px;
        width: 110px;
        height:30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #339999;
        border-radius:15px;
        color: #339999;
        cursor: pointer;
        background: #fff;
        z-index: 100;
        overflow: hidden;
        transition: all 0.3s;
    }
    .ac_music_play:active{
        transform: scale(0.9);
    }
    .ac_music_play span{
        display: block;
        background: #fff;
        width: 100%;
        height: 30px;
        line-height: 30px;
        transition: all 0.3s;
        position: absolute;
        top: 30px;
        left: 0;
        color: #339999;
    }
    .ac_music_play.ok{
        color: #fff;
    }
    .ac_music_play.ok span{
        top: 0;
    }
    `
    document.body.append(style)
    document.body.append(button)

}