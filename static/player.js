// 通过Ajax请求 musiclist 中的数据
var musicList = []

const ajax = function(method, path, callback) {
    var r = new XMLHttpRequest()
    r.open(method, path, false)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = function() {
        if(r.readyState == 4) {
            callback(r.response)
        }
    }
    r.send()
}

// 将音乐列表添加进表格
const musicListAdd = function() {
    let tb = e('tbody')
    for(let i of musicList) {
        var m = `
        <tr>
            <td class="t1">
                ${i.id}
            </td>
            <td class="t2">
                ${i.name}
            </td>
            <td class="t3">
                ${i.long}
            </td>
            <td class="t4">
                ${i.singer}
            </td>
        </tr>`
        tb.insertAdjacentHTML("beforeend", m)
    }
}

// 给播放暂停添加响应
const startPause = function() {
    bindEvent('.start-pause', 'click', function(e){
        // console.log(e.target)
        var target = e.target
        // 获取到当前的 audio 并播放
        var au = document.querySelector('#id-audio-player')
        if(target.dataset.status == 0) {
            // 为播放按钮,
            // 1 播放音乐
            // 2 改变当前按钮 src
            // 3 让唱片滚动
            // 4 下方时间开始走动
            // 5 进度条开始走动
            target.dataset.status = 1
            au.play()
            target.src = 'img/pause.png'
            timeStart()
            startScrollAutoGo()
            startRotate()
        } else {
            target.dataset.status = 0
            au.pause()
            target.src = 'img/start.png'
            timeStop()
            stopScrollAutoGo()
            stopRotate()
        }
    })
}

// 给播放列表中的 tr 标签添加点击事件，实现歌曲切换
const trClick = function() {
    bindEvents('tbody tr', 'click', function(e){
        // 获取到当前所在按钮
        var e = e.target
        var ele = e.parentNode
        // 将 tr 中 歌曲唯一编号取出来
        // 将该编号所对应的音乐名称找到
        var name = getMusicName(ele)
        // 将 source 标签的 src 改变
        sourceChagne(name)
    })
}

// 给上一曲，下一曲按钮添加事件
const leftAndRight = function() {
    bindEvent('.left', 'click', function(){
        // 根据序号进行，上下切换
        goToForward()
    })
    bindEvent('.right', 'click', function(){
        // 根据序号进行，上下切换
        goToNext()
    })
}

// 每秒检测一次，是否放完
const setEndStatus = function() {
    setInterval(endStatus, 1000)
}

// 进度条拖拽
const progressBarPull = function() {
    var barleft = 0
    var bar = e('.progress-bar-button')
    var scroll = e('.progress-bar-scroll')
    var mask = e('.progress-progress-forward')
    bar.onmousedown = function(event) {
        var leftVal = event.clientX - this.offsetLeft
        var that = this
        document.onmousemove = function(event) {
            // 停止自动前进
            // stopScrollAutoGo()
            barleft = event.clientX - leftVal
            if(barleft < 0) {
                barleft = 0
            } else if(barleft > scroll.offsetWidth - bar.offsetWidth) {
                barleft = scroll.offsetWidth - bar.offsetWidth
            }
            mask.style.width = barleft +'px' ;
            that.style.left = barleft + "px";
            //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        }
        document.onmouseup = function(){
            document.onmousemove = null
            // 根据拖动的长度，改变歌曲进度
            // 1 获取该跳转的时间
            var nl = bar.offsetLeft
            var time = jumpToSecond(nl)
            // 2 跳转
            var au = e('audio')
            au.cerrentTime = time
        }
    }
}

// 点击播放方式来切换
const cutPlayWay = function() {
    var ele = e('.end-status').firstElementChild
    var n = ele.dataset.endStatus
    ele.addEventListener('click', function() {
        n++
        if(n % 3 == 1) {
            ele.dataset.endStatus = 1
            ele.src = 'img/list.png'
        }
        if(n % 3 == 2) {
            ele.dataset.endStatus = 2
            ele.src = 'img/one.png'
        }if(n % 3 == 0) {
            ele.dataset.endStatus = 3
            ele.src = 'img/radom.png'
        }
    })
}

const __main = function() {
    ajax('get', '/musiclist', function(response) {
        var ml = JSON.parse(response)
        musicList = ml
    })
    musicListAdd()
    musicTimeAdd()
    startPause()
    trClick()
    leftAndRight()
    setEndStatus()
    progressBarPull()
    cutPlayWay()
}

__main()