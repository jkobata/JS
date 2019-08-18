const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) =>{
    res.sendFile(__dirname+'/Home.html')
})
app.get('/chat', (req, res)=>{
    res.sendFile(__dirname+'/index.html')
});
app.get('/nome', (req, res) =>{
    res.sendFile(__dirname+'/nome.html')

})
http.listen(3000,() =>
{
console.log('ouvindo a porta 3000')
});

io.on('connect', (socket)=>{
    console.log('new connect',socket.id);
    socket.on('msg', (msg)=>{
        console.log(msg)

        socket.broadcast.emit('msg', msg);

    })

})