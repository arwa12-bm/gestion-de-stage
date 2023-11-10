
import { useState}from"react";
import Axios  from "axios";
import jwt_decode from "jwt-decode";
import "./CreateAccount.css";
import Header from '../../components/header/Header';
import NavigationMenuProfile from "../../components/AccueilComponents/NavigationProfile";

export default function CreateAccount() {
 
  const initialUser ={
    username:"",
    email:"",
    password:"",
    role:"",
    phone:""
  }

  const token =localStorage.getItem('token')
  const user = jwt_decode(token);
  console.log(user);
 
  const[email,setEmail]=useState(initialUser.email);
  const[password,setPassword]=useState(initialUser.password);
  const[username,setUserName]=useState(initialUser.username);
  const[userphone,setUserPhone]=useState(initialUser.phone);
  //const[role,setRole]=useState(initialUser.role);
  const[errors,setErrors]=useState({});
 
 
  const handleChangePhone = async(e)=>{
    setUserPhone(e.target.value)
  }
  const handleChangeName = async(e)=>{
    setUserName(e.target.value)
  }
  const handleChangeEmail = async (e) => {
     setEmail(e.target.value)
    
    if(!email ){
      errors.email="Email is requires !"
      
    }else if(!/\w+@\w+\.\w+/.test(email)){
        errors.email="Email is invalide !"
        e.target.style.borderColor= "red"
    }else {
      
      errors.email=""
      e.target.style.borderColor= "green"  
    }

  }

  const handleChangePassword =async (e) => {
    setPassword(e.target.value)
    
    
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

//   {
//     "id": 2,
//     "email": "test",
//     "password": "test",
//     "userphone": 123,
//     "role": "test",
//     "isadmin": true,
//     "status": null,
//     "username": "test"
// }


const handleSubmitCreate = async (e) => {
  e.preventDefault();
  
  console.log({ email, password,username,userphone,"role":"encadrant","isadmin":false ,"status":null });

  await Axios.post('http://localhost:5100/api/v1/insertuser',{ email,username, password,userphone,"role":"encadrant","isadmin":false ,"status":null } );
   console.log("done")
};



   return (
        <>
         <Header />
         
         
        

      <div className="loginWrapper">
      <NavigationMenuProfile/>
        <div className="loginRight">
         
          <div className="loginBox">
          
            <form  onSubmit={handleSubmitCreate}>
                
                  <label htmlFor="title" className="title" >Create Account </label>
                  <input placeholder="Enter your name"
                            type="text" 
                            required 
                            value={username} 
                            onChange={handleChangeName}
                            onMouseEnter={(e)=>e.target.style.borderBottom= "solid blue 2px" }
                            onMouseOut={(e)=>e.target.style.borderBottom= "" }
                            className="loginInput" />
                  <input placeholder="Enter your phone"
                            type="text" 
                            required 
                            value={userphone} 
                            onChange={handleChangePhone}
                            onMouseEnter={(e)=>e.target.style.borderBottom= "solid blue 2px" }
                            onMouseOut={(e)=>e.target.style.borderBottom= "" }
                            className="loginInput" />
                  {errors.email &&<p className="error">{errors.email}</p>}
                  <input placeholder="Enter your email"
                        type="email" 
                        required 
                        value={email} 
                        onChange={handleChangeEmail}
                        onMouseEnter={(e)=>e.target.style.borderBottom= "solid blue 2px" }
                        onMouseOut={(e)=>e.target.style.borderBottom= "" }
                        className="loginInput" />
                        <input id="input"
                                placeholder= "Enter your password"
                                type="password" 
                                required 
                                value={password} 
                                onChange={handleChangePassword}

                                onMouseEnter={(e)=>e.target.style.borderBottom= "solid blue 2px"  }
                                onMouseOut={(e)=>e.target.style.borderBottom= "" }
                              className="loginInput" />
                        {/* <select id="select" 
                        
                        placeholder= "Role"
                        onMouseEnter={(e)=>e.target.style.borderBottom= " blue 2px"  }
                        onMouseOut={(e)=>e.target.style.borderBottom= "" }
                        className="loginSelect" >
                           <option >--Please choose an option--</option>
                           <option value={role}>Admin</option>
                           <option value={role}>Encadrant</option>
                           <option value={role}>Stagiaire</option>
                        </select> */}
                 <button className="loginButton"
                  type="submit" >Create</button>
                
            </form>
          </div>
        </div>
      </div>
        
      </>
  );
}