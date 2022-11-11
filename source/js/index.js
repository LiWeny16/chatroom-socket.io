var nickName

  if (!$.cookie("nickName")) {
    nickName = prompt("请输入你的昵称：");

    while (nickName == "null" || nickName == "") {
      nickName = prompt("请正确输入你的昵称：");
    }
    $.cookie("nickName", nickName, { expires: 30, path: "/" })
  } else {
    nickName=$.cookie("nickName")
    // success_prompt('No',3000)
    //  nickName = $.cookie('username')
    var socket = io()
    var rightLi = document.createElement("LI")
    // var otheruser = new Array(10)

    //发送昵称给后端，并更改网页title
    socket.emit("join", nickName)
    document.title = nickName + "的群聊"

    socket.on("join", function (user) {
      addLineCenter(user + " 加入了群聊")

    })
    socket.on("disconnection", function () {
      addLineCenter("有人离开了聊天室`(*>﹏<*)`")
    })

    //接收到服务器发来的message事件
    socket.on("message", function (msg) {
      if (msg.split(':')[0] === nickName) {
        addLineRight(msg)
        // document.getElementById("yourLi").style.textAlign="right"
      }
      else { addLine(msg) }
      document.getElementById("msgBox").scrollTo(0, document.getElementById("msgBox").scrollHeight)
      // console.log(otheruser);
    })

    //当发送按钮被点击时
    $('form').submit(function () {
      var msg = $("#m").val() //获取用户输入的信息
      socket.emit("message", nickName + ':' + msg) //将消息发送给服务器
      $("#m").val("") //置空消息框
      return false //阻止form提交
    })

      function addLine(msg) {
          $('#messages').append($(`
      <div class="otherLi bothLi" style="float: right;width:100%;">
      <div style="float:left;" class="span_border_parent">
      <div style="width: 316px" class="span_border">
      <span>${msg}</span>
      </div>
      </div>
      </div>`));
      }
      function addLineRight(msg) {
          $('#messages').append($(`
      <div class="yourLi bothLi" style="float: right;width:100%;">
      <div style="float:right;" class="span_border_parent">
      <div style="width: 316px" class="span_border">
      <span>${msg}</span>
      </div>
      </div>
      </div>`));
      }
    function addLineCenter(msg) {
      $('#messages').append($(`
      <div class="ourLi bothLi" style="text-align: center;font-size: 17px;border-bottom: 1px solid #000000;">
      <div>
      <span>${msg}</span>
      </div>
      </div>`));
    }
  }