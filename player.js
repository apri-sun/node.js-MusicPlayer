// 创建一个歌曲对象
const Music = function() {
    Music.id = id
    Music.name = name
    Music.long = long
    Music.singer = singer
}

const musicList = [
    {
        id: 1,
        name: 'The Spectre',
        long: '3:13',
        singer: 'Alan Walker',
    },
    {
        id: 2,
        name: 'Into You',
        long: '2:41',
        singer: 'Matisse & Sadko',
    },
    {
        id: 3,
        name: '心做し',
        long: '4:28',
        singer: '双笙',
    }
]

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
        if(target.src == 'file:///C:/Users/srf/Desktop/musicplayer/static/img/start.png') {
            // 为播放按钮,
            // 1 播放音乐
            // 2 改变当前按钮 src
            // 3 让唱片滚动
            // 4 下方时间开始走动
            // 5 进度条开始走动
            au.play()
            target.src = 'static/img/pause.png'
            timeStart()
            startScrollAutoGo()
            startRotate()
        } else {
            au.pause()
            target.src = 'static/img/start.png'
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
    let ml = musicList.length
    bindEvent('.left', 'click', function(){
        // 根据序号进行，上下切换
        // 获得当前正在播放的歌曲的序号
        let n = getNumber()
        // 将序号向前推一位
        let ln = leftNumber(n, ml)
        let s = e('source')
        s.dataset.musicId = ln
        for(let i of musicList){
            if(i.id == ln){
                sourceChagne(i.name)
            }
        }
    })
    bindEvent('.right', 'click', function(){
        // 根据序号进行，上下切换
        // 获得当前正在播放的歌曲的序号
        let n = getNumber()
        // 将序号向后推一位
        let rn = rightNumber(n, ml)
        let s = e('source')
        s.dataset.musicId = rn
        for(let i of musicList){
            if(i.id == rn){
                sourceChagne(i.name)
            }
        }
    })
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
    }
    document.onmouseup = function(){
        document.onmousemove = function() {
            // 根据拖动的长度，改变歌曲进度
            
        }
    }
}

const __main = function() {
    musicListAdd()
    musicTimeAdd()
    startPause()
    trClick()
    leftAndRight()
    progressBarPull()
}

__main()