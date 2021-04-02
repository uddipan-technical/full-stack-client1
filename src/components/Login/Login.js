import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './Login.css';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser ] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const fbSignIn = () => {
      handleFbSignIn()
      .then(res => {
        handleResponse(res, true);
      })

  }

  const signOut = () => {
      handleSignOut()
      .then(res => {
          handleResponse(res, false);
      })
  }

  const handleResponse = (res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  }



  return (
    <div className="loginPage">
        <div style={{textAlign: 'center'}}>
          <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
          <label htmlFor="newUser">New User Sign up</label>
              <form onSubmit={handleSubmit}>
              
                {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder=""/>}
                <br/>
                  <input className="input" type="text" name="email" onBlur={handleBlur} placeholder="User name or Email" required/>
                  <br/>
                  <input className="input" type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required/>
                  <div className="creat-account">
                  <input type="checkbox" name="Remember me"/>
                      <label htmlFor="name">Remember me</label>
                        <a href="#">Forget Password</a>
                  </div>

                  <br/>
                  <input className="input" type="submit" value={newUser ? 'Sign up' : 'Login'}/>
                  <div className="creat-account">
                    <p>Don't have an account</p>
                    <a href="#">Creat an account</a>
                  </div>
              </form>
              <div className="gap">
                <hr></hr>
                  <p>Or</p>
                  <hr></hr>
                
              </div>
              
              { user.isSignedIn ? 
                <button onClick={signOut}>Sign Out</button> :
                <button className="loginTo" onClick={googleSignIn}>Continue with Google</button>
              }
              <br/>
                <button className="loginTo" onClick={fbSignIn}>Continue with Facebook</button>
              {
                user.isSignedIn && 
                <div>
                  <p>Welcome, {user.name}!</p>
                  <p>Your email: {user.email}</p>
                  <img src={user.photo} alt=""/>
              </div>
                }
                <p style={{color: 'red'}}>{user.error}</p>
                { user.success && <p style={{color: 'green'}}>User { newUser ? 'created' : 'Logged In'} successfully</p>}
        </div>
          
    </div>
  );
}

export default Login;


