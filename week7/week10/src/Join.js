import React, { useState, useContext } from "react";
import { AuthContext } from "./index";
import firebase from "firebase";

const Join = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");

    const Auth = useContext(AuthContext);
    const handleForm = e => {
        e.preventDefault();
        firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
            if (res.user) Auth.setLoggedIn(true);
        })
        .catch(e => {
            setErrors(e.message);
        })
    }

    const SignInWithGoogle = () => {
        var google_provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(google_provider)
        .then(res => {
            console.log(res);
            Auth.setLoggedIn(true);
        })
        .catch(e => {
            setErrors(e.message);
        })
    }

    return(
        <div>
            <h1>Join</h1>
            <form onSubmit={ e => handleForm(e)}>
                <input 
                value={email}
                onChange={e => setEmail(e.target.value)}
                name= "email"
                type= "email"
                placeholder="email"
                />
                <input 
                onChange={e => setPassword(e.target.value)}
                name= "password"
                value={password}
                type= "password"
                placeholder="password"
                />
                <hr />
                <button class="googleBtn" type="button" onClick={SignInWithGoogle}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/225px-Google_%22G%22_Logo.svg.png"
                        alt="logo"
                    />
                </button>
                <button type="submit">Login</button>
                <span>{error}</span>
            </form>
        </div>
    )
}

export default Join;