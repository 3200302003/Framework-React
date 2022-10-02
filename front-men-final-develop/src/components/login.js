import React, { Component } from "react";
import "./chat.css";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        console.log(email, password);
        fetch("https://chat--i.herokuapp.com/login-user", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userRegister");
                if (data.status === "ok") {
                    alert("login successful");
                    window.location.href = "./mens";
                }
            });
    }
    render() {
        return ( <
            div className = "cont" >
            <
            form onSubmit = { this.handleSubmit } >

            <
            div className = "container" >
            <
            h3 > BORDADOS SAN JUDITAS TADEO < /h3> <
            div >
            <
            input className = "input"
            type = "email"
            placeholder = "Enter email"
            onChange = {
                (e) => this.setState({ email: e.target.value })
            }
            /> < /
            div > <
            br / >
            <
            div >
            <
            input className = "input"
            type = "password"
            placeholder = "Enter password"
            onChange = {
                (e) => this.setState({ password: e.target.value })
            }
            /> < /
            div > <
            br / >
            <
            div >
            <
            input className = "input"
            type = "date"
            placeholder = "Enter of Date of Birth"
            onChange = {
                (e) => this.setState({ password: e.target.value })
            }
            /> < /
            div > <
            br / >
            <
            div >
            <
            div >
            <
            input type = "checkbox"
            id = "customCheck1" /
            >
            <
            label htmlFor = "customCheck1" >
            Recuerdame <
            /label> < /
            div > <
            br / >
            <
            /div> <
            div >
            <
            button type = "submit"
            className = "buton" >
            Entrar <
            /button> < /
            div > <
            p >
            <
            a href = "/sign-up" > Registrarte < /a> < /
            p > <
            /div> < /
            form >

            <
            /div>

        );
    }
}