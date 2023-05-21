import { useState } from "react";
import { Button } from "@mui/material";
import { useCookies } from 'react-cookie';

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const viewLoginOption = (status) => {
    setError(null);
    setIsLogin(status);
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Make sure password match!")
      return
    }

    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/api/auth/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });

    const data = await response.json();
    console.log(data.user);
    if (data.message) {
      setError(data.message);
    } else {
      setCookie('UserId', data.user.id);
      setCookie('AuthToken', data[1]); 
      
      window.location.reload();
    }

  }

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogin ? 'Please log in' : 'Please sign up!'}</h2>
          {!isLogin && <input type="text" placeholder="Your Name" onChange={(e) => setName(e.target.value)}/>}
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          {!isLogin && <input type="password" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>}
          <input type="submit" className="submit" onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')} />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <Button 
            onClick={()=>viewLoginOption(false)}
            variant={!isLogin ? 'contained' : 'outlined'}
            style={{"textTransform": 'none'}}
          >
            Sign Up
          </Button>
          <Button 
            onClick={()=>viewLoginOption(true)}
            variant={isLogin ? "contained" : "outlined"}
            style={{"textTransform": 'none'}}
          >
            Login
          </Button>
        </div>
      </div>

    </div>
  );
}
  
  export default Auth;
  