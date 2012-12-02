handler = (req, res) ->
    filePath = req.url
    if filePath == '/'
        filePath = './index.html'
    else
        filePath = './' + req.url

    extname = path.extname(filePath).substring(1);
    contentTypesByExtension =
        'html': 'text/html'
        'js': 'application/javascript'
        'css': 'text/css'
        'png': 'image/png'
        'jpg': 'image/jpeg'
        'jpeg': 'image/jpeg'
        'ogg': 'audio/ogg'
        'mp3': 'audio/mpeg'
        'ico': 'image/x-icon'
    contentType = contentTypesByExtension[extname] ? 'text/plain'

    fs.exists filePath, (exists) ->
        if (exists)
            fs.readFile filePath, (error, content) ->
                if error
                    res.writeHead 500
                    res.end()
                else
                    res.writeHead(200, {'Content-Type': contentType})
                    res.end(content, 'utf-8')
        else
            res.writeHead(404)
            res.end()

app = require("http").createServer(handler)
io = require("socket.io").listen(app)
fs = require("fs")
path = require("path")

app.listen 8000

playerlocation = 0
playerlist = []

io.sockets.on "connection", (socket) ->
    socket.on "recievedata", (positionx, positiony, currentanimation, gamename) ->
        socket.broadcast.emit "playermove", positionx, positiony, currentanimation, gamename

    socket.on "initializeplayer", (newplayername) ->
        socket.clientname = newplayername
        playerlist.push newplayername
        io.sockets.emit "addplayer", playerlist, newplayername

    socket.on "disconnect", ->
        delete playerlist[socket.clientname]

        for i of playerlist
            playerlist.splice(i, 1)  if playerlist[i] is socket.clientname
        socket.broadcast.emit "message", socket.clientname
        socket.broadcast.emit "netreplayer", playerlist


