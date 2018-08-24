const
    io = require("socket.io-client"),
    ioClient = io.connect("http://localhost:4040");

//ioClient.on("seq-num", (msg) => console.info(msg));

//ioClient.on("containers.list", (msg) => console.info(msg));

console.log("mehtod run in client started")

//ioClient.on("containers.data", (msg) => console.log(msg));

console.log("mehtod run over in client and start second")

ioClient.on("containers.data", (msg) => console.info(msg));
