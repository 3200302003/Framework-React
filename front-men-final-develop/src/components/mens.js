import React, { useState } from "react";
import Chat from "./Chat";

function Mens() {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  };

  return (
    <div className="cont">
      <div className="container2">
        <h1 className="tit">Ingresa tu nombre para ir al chat</h1>
        {!registrado && (
        <form onSubmit={registrar}>
          <input className="input" placeholder="Nombre de usuario" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <button className="buton">Ir al chat</button>
        </form>
      )}

      {registrado && <Chat nombre={nombre} />}
      </div>
      
    </div>
  );
}

export default Mens;
