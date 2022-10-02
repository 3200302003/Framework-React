import React, { Component } from "react";
import io from "socket.io-client";

let socket = io("https://chat--i.herokuapp.com/");

export default socket;
