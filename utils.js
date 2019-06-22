const e = function(selector) {
    return document.querySelector(selector)
}

const es = function(selector) {
    return document.querySelectorAll(selector)
}

const bindEvent = function(selector, event, callback) {
    let ele = e(selector)
    ele.addEventListener(event, callback)
}

const bindEvents = function(selector, event, callback) {
    let eles = es(selector)
    for(let i of eles) {
        i.addEventListener(event, callback)
    }
}

// 通过 id 获取到 name
const getMusicName = function(ele) {
    let s = e('source')
    var number = ele.firstElementChild.innerText
    s.dataset.musicId = number
    for(let i of musicList){
        if(i.id == number){
            return i.name
        }
    }
}

// 停止唱片滚动
const stopRotate = function() {
    var CD = e('.main-body-music-img')
    // 加上 img-rotate 类
    CD.classList.remove('img-rotate')
}

// 通过 name 改变当前播放的歌曲
const sourceChagne = function(name) {
    let s = e('source')
    let path = `static/music/${name}.mp3`
    s.src = path
    // 重新加载音乐,但是不会开始放
    let au = s.parentNode 
    au.load()
    // 重新加载 time
    musicTimeAdd()
    // 给 audio 加一个属性 autoplay ,使唱片开始播放
    au.setAttribute('autoplay','autoplay')
    // 让唱片转动起来
    startRotate()
    // 将播放按钮改为暂停按钮
    e('.start-pause').src = 'static/img/pause.png'
}

// 将唱片滚动起来
const startRotate = function() {
    var CD = e('.main-body-music-img')
    // 加上 img-rotate 类
    CD.classList.add('img-rotate')
}

// 获得当前正在播放的歌曲的序号
var getNumber = function() {
    var s = e('source')
    // 获得 id 
    return s.dataset.musicId
}

// 将序号向前推一位
const leftNumber = function(n, ml) {
    var n = parseInt(n)
    if(n - 1 == 0) {
        return ml
    } else {
        return n - 1
    }
}

// 将序号向后推一位
const rightNumber = function(n, ml) {
    var n = parseInt(n)
    if(n + 1 == ml + 1) {
        return 1
    } else {
        return n + 1
    }
}

// 将音乐时间添加到进度条
const musicTimeAdd = function() {
    var s = e('source')
    var p = e('.end-time')
    // 开始加载这一次的前，先将之前的时间清空
    p.innerText = ''
    var id = s.dataset.musicId
    for(let i of musicList) {
        if(i.id == id) {
            var time = `${i.long}`
            p.insertAdjacentHTML("beforeend", time)
        }
    }
}