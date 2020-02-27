const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const users = require("./users")();

// функция принимает 3 параметра и возвращает объект из этих параметров
const m = (name, text, id) => ({ name, text, id });

io.on("connection", socket => {
  // слушаем userJoined
  socket.on("userJoined", (data, cb) => {
    // если полей нет возвращаем ошибку
    if (!data.name || !data.room) {
      return cb("Данные не коректны");
    }
    // подсоединил человека (сокет) к комнате
    socket.join(data.room);
    users.remove(socket.id);
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    });
    // если все ок возвращаем userId
    cb({ userId: socket.id });

    io.to(data.room).emit("updateUsers", users.getByRoom(data.room));
    // отправляем этому пользователю сообщение
    socket.emit("newMessage", m("admin", `Добро пожаловать ${data.name}`));
    // сообщаем всем из комнаты data.room кроме отправителя что пришел новый пользватель
    socket.broadcast
      .to(data.room)
      .emit("newMessage", m("admin", `Пользователь ${data.name} зашел`));
  });

  // слушаем приходящие события
  socket.on("createMessage", (data, cb) => {
    if (!data.text) {
      return cb("Текст не может быть пустым");
    }
    const user = users.get(data.id);
    if (user) {
      // отправляем событие newMessage сокету от сервера
      io.to(user.room).emit("newMessage", m(user.name, data.text, data.id));
    }
    cb();
  });

  socket.on("userLeft", userId => {
    const user = users.remove(userId);

    if (user) {
      io.to(user.room).emit("updateUsers", users.getByRoom(user.room));
      io.to(user.room).emit(
        "newMessage",
        m("admin", `Пользователь ${user.name} вышел`)
      );
    }
  });

  socket.on("disconnect", () => {
    const user = users.remove(socket.id);
    if (user) {
      io.to(user.room).emit("updateUsers", users.getByRoom(user.room));
      io.to(user.room).emit(
        "newMessage",
        m("admin", `Пользователь ${user.name} вышел`)
      );
    }
  });
});

module.exports = {
  app,
  server
};
