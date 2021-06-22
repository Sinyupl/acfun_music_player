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
                playIndex++
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
        const scrollDiv = document.querySelector('.scroll-div')
        if (scrollDiv && scrollDiv.querySelectorAll('li').length > index) {
            scrollDiv.querySelectorAll('li')[index].click()
            setTimeout(() => {
                video.play()
                window.parent.updatePartIndex(index)
                window.parent.setDuration(video.duration)
            }, 500)
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
