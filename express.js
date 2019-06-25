var express = require('express')
var app = express()
var bodyParser = require('body-parser')

// 配置静态文件目录
app.use(express.static('static'))

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/' + 'main.html')
})

var fs = require('fs')
// 从文件中获得 musiclist 的数据
var loadMusic = function(callback) {
    fs.readFile('musiclist.json', 'utf-8', function(err, data) {
        if(err != null) {
            //出错了
        } else {
            musciList = JSON.parse(data)
            callback()
        }
    }) 
}

app.get('/musiclist', function(request, response) {
    loadMusic(function() {
        var r = JSON.stringify(musciList)
        response.send(r)
    })
})

var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port
    console.log('应用实例, 访问地址为 http://%s:%s', host, port)
})

