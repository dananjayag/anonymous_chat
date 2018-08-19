var express= require('express')
// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();
var app=express();

app.use(express.static('public'))
var http = require('http').Server(app);
var io = require('socket.io')(http);
let a=0;
let UserList=[]
function emitToall(data){
  if(io){
      io.emit('userList',data)
  }
}
io.on('connection',(socket)=>{
    let user={
    id:10/Math.random()*1000000000000000,
    name:chance.name()
    }
    UserList.push(user)
    emitToall(UserList)
    socket.on('disconnect',(e)=>{
        console.log(user.name,'Has been Disconnected')
          let index=UserList.indexOf(user);
          if(index!=-1){
            UserList.splice(index,1)
          }
          console.log(UserList)
          emitToall(UserList)
        
    })
    socket.on('send',(datta)=>{
            console.log(datta)
            data={
                msg:datta,
                usr:user.name
            }
            io.emit("receive",data)
    })

})

http.listen(process.env.PORT || 8080, function(){
    console.log('listening on *:3000');
});