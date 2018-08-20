var express= require('express')
// Load Chance
var Chance = require('chance');
var axios =require('axios')
// Instantiate Chance so it can be used
var chance = new Chance();
var app=express();
const headers={
    "Content-type": "application/json",
    "Authorization" :"Bearer ad201c7c688b4d9f8e7ea205eaf2b030"
}
app.use(express.static('public'))
var http = require('http').Server(app);
var io = require('socket.io')(http);
let a=0;
let UserList=[{id:0,name:'Bullet Basya'}]
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
          emitToall(UserList)
        
    })
    socket.on('send',(datta)=>{
            let data={
                msg:datta,
                usr:user.name
            }
            io.emit("receive",data)
            if(UserList.length<=5){
                axios.get(`https://api.dialogflow.com/v1/query?v=20150910&contexts=shop&lang=en&query=${datta}&sessionId=12345&timezone=America/New_York`,{headers:headers}).then((res)=>{
                        console.log(res.data.result.fulfillment.speech);
                        let data={
                            msg:res.data.result.fulfillment.speech,
                            usr:"Bullet Basya (I am UK(Uttar Karnataka) bot)"
                        }
                        io.emit('receive',data)
                }).catch((err)=>{
                       console.log(err)
                })
            }
           
    })

})

http.listen(process.env.PORT || 8000, function(){
    console.log('listening on *:3000');
});