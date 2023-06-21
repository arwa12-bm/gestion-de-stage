
import {useEffect, useState,userRef}from"react";
import Axios  from "axios";

import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import "./login.css";

 
export default function Login() {
 
  const initialUser ={
    email:"",
    password:""
  }


 const nav=useNavigate()
  const[email,setEmail]=useState(initialUser.email);
  const[password,setPassword]=useState(initialUser.password);
  const[errors,setErrors]=useState({});
  const [isValid,setIsValid]=useState(false);
  const [user, setUser] = useState({});
  const [navigate, setNavigate] = useState(false);
 

  // const verifMail=async (email)=>{
  //   if(/\w+@\w+\.\w+/.test(email) && response.data[0].email===email){
  //     return true;
  //   }else{return false}
  // }
  
  const handleChangeEmail = async (e) => {
     setEmail(e.target.value)
    //console.log(email)
   // const response = await Axios.get('http://localhost:5200/api/v1/useremail',{ params: { email: email }})
      
    if(!email ){
      errors.email="Email is requires !"
      
    }else if(!/\w+@\w+\.\w+/.test(email)){
        errors.email="Email is invalide !"
        e.target.style.borderColor= "red"
    }else {
      //setEmail(e.target.value)
      errors.email=""
      e.target.style.borderColor= "green"  
    }

  }



  const handleChangePassword =async (e) => {
    setPassword(e.target.value)
    
    //const response = await Axios.get('http://localhost:5200/api/v1/useremail',{ params: { email: email }})
     //console.log(response.data[0])
    if(!password){
      errors.password="password is required !"
  }else if(password.length<4 ){
      errors.password="password must be more then 4 char"
      e.target.style.borderColor= "red"
  }else {

    errors.password=""
    e.target.style.borderColor= "green"
  }
 

  }




    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log({ email, password });
       
      // await Axios.get('http://localhost:5200/api/v1/useremail',{ params: { email: email }}, {withCredentials: true},config)
      //  .then(res => console.log(res.data))
      //  .catch(err => console.error(err));

       const data = await Axios.post('http://localhost:5100/api/v1/usertoken', { email, password });
    console.log("token : ",data.data.result)
    //Axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.result}`;
    localStorage.clear();
    localStorage.setItem('token', data.data.result);
    const decoded = jwt_decode(data.data.result);
 
    console.log(decoded);
    
    
           nav("/profile");
  
      };

      
    

//action="/home"
  return (
    <div className="login">
      <div className="loginWrapper">
      
        <div className="loginRight">
          <div className="loginBox">


            <form  onSubmit={handleSubmit}>

                  <label htmlFor="title" className="title" >Your Account </label>
                  {errors.email &&<p className="error">{errors.email}</p>}
                  <input placeholder="Enter your email"
                        type="email" 
                        required 
                        value={email} 
                        onChange={handleChangeEmail}
                        onMouseEnter={(e)=>e.target.style.borderBottom= "solid blue 2px" }
                        onMouseOut={(e)=>e.target.style.borderBottom= "" }
                        className="loginInput" />
                        {/* { errors && email.length<=0? <label className="error">verifier votre email !</label>:""} */}
                        <input id="input"
                                placeholder= "Enter your password"
                                type="password" 
                                required 
                                value={password} 
                                onChange={handleChangePassword}

                                onMouseEnter={(e)=>e.target.style.borderBottom= "solid blue 2px"  }
                                onMouseOut={(e)=>e.target.style.borderBottom= "" }
                              className="loginInput" />
                    
                  {/* {errors && password.length<=0? <label className="error">verifier votre email!</label>:""} */}
                  <button className="loginButton"
                  type="submit"
                  // onClick={createPost}
                  >Log In</button>
                  <span className="loginForgot">Forgot Password?</span>
                
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}