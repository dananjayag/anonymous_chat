
$((e)=>{
    var socket=io()
    socket.on('userList',(dataList)=>{
            let a=document.getElementById('userList');
            a.innerHTML="";
            dataList.map((element)=>{
                let li=document.createElement('LI');
                li.innerHTML=`<i></i>${element.name}`
                a.appendChild(li)
            })
    })
    socket.on('receive',(data)=>{
        let a=document.getElementById('all-chats')
        let p=document.createElement('P');
        let text=`<span style='color:#0000ff'>${data.usr}</span> - ${data.msg}`
        p.innerHTML=text
        a.appendChild(p)
        var $target = $('#all-chats'); 
          $target.animate({scrollTop:$target.scrollTop()+$target.height()}, 10);
        })
   
    $('#send').click(()=>{
       socket.emit('send',$('#usr-msg').val())
       $('#usr-msg').val('')
    })
    $('#usr-msg').keyup(function(e){ 
        var code = e.which; // recommended to use e.which, it's normalized across browsers
        if(code==13){
             socket.emit('send',$('#usr-msg').val())
       $('#usr-msg').val('')
        }
        
    });
})

function closeNav(){
   $('#chat-box').toggleClass('close')
   $('#holder').toggleClass('close')
}
function openNav(){
    $('#chat-box').toggleClass('close')
    $('#holder').toggleClass('close')
}