const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const http = require("http");
const servidor = http.createServer(app);
require('dotenv').config()




const mongoUrl = "mongodb+srv://cluster0.r9zz7vc.mongodb.net/Red";

mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((e) => console.log(e));

require("./userDetails");

const User = mongoose.model("UserInfo");
app.post("/register", async(req, res) => {
    const { fname, lname, email, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.json({ error: "User Exists" });
        }
        await User.create({
            fname,
            lname,
            email,
            password: encryptedPassword,
        });
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

app.get("/", async(req, res) => {
    res.send("Hello World");
})

app.post("/login-user", async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET);

        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "InvAlid Password" });
});

app.post("/userData", async(req, res) => {
    try {
        const { token } = req.body;
        const user = jwt.verify(token, JWT_SECRET);
        console.log(user);

        const useremail = user.email;
        User.findOne({ email: useremail })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) {
        res.send({ status: "error", data: error });
    }
});



const socketio = require("socket.io");

const server = app.listen(process.env.PORT, () =>
    console.log(`Server started on ${3000}`)
);
const io = socketio(server, {
    cors: {
        origin: "0.0.0.0:3000",
        credentials: true,
    },
});



//Funcionalidad de socket.io en el servidor
io.on("connection", (socket) => {
    try {
        let nombre;

        socket.on("conectado", (nomb) => {
            nombre = nomb;
            //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
            socket.broadcast.emit("mensajes", {
                nombre: nombre,
                mensaje: `${nombre} ha entrado en la sala del chat`,
            });
        });

        socket.on("mensaje", (nombre, mensaje) => {
            //io.emit manda el mensaje a todos los clientes conectados al chat
            io.emit("mensajes", { nombre, mensaje });
        });

        socket.on("disconnect", () => {
            io.emit("mensajes", {
                servidor: "Servidor",
                mensaje: `${nombre} ha abandonado la sala`,
            });
        });
    } catch (error) {
        console.log(error);
    }
});