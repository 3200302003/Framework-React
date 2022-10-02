import React, { useState, useEffect, useRef } from "react";
import socket from "./Socket";
import "./mensajes.css"; 

const Chat = ({ nombre }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.emit("conectado", nombre);
  }, [nombre]);

  useEffect(() => {
    socket.on("mensajes", (mensaje) => {
      setMensajes([...mensajes, mensaje]);
    });

    return () => {
      socket.off();
    };
  }, [mensajes]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const submit = (e) => {
    e.preventDefault();
    socket.emit("mensaje", nombre, mensaje);
    setMensaje("");
  };

  return (
    <div className="cont">
      <div className="chat">
        {mensajes.map((e, i) => (
          <div key={i}>
            <div><b>{e.nombre}</b></div>
            <div>{e.mensaje}</div>
            <br/>
          </div>
        ))}
        <div ref={divRef}></div>
      </div>
      <div  className="inputs">
        <form onSubmit={submit}>
        <input
       className="input"
       placeholder="Escriba su mensaje"
          name=""
          id=""
          cols="30"
          rows="10"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></input>
        <button className="buton">Enviar</button>
      </form>
      </div>
      
    </div>
  );
};

export default Chat;
