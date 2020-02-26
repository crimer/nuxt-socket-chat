const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", socket => {

  console.log("io connected");


  // слушаем приходящие события
  socket.on('createMessage', data => {
    console.log(data.text);

    setTimeout(() => {
      // отправляем событие newMessage сокету от сервера
      socket.emit('newMessage', { text: `${data.text} -> server` });
    }, 5000);
  })

});

module.exports = {
  app,
  server
};
