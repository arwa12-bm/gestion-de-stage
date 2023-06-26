
import { useState}from"react";
import Axios  from "axios";

 
export default function Logup() {
 
  const initialUser ={
    username:"",
    email:"",
    password:"",
    role:"",
    phone:""
  }


 
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




    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log({ email, password });

        await Axios.put('http://localhost:5100/api/v1/updateuser', { email, password });
    };
    


   return (
   
      <div className="loginWrapper">
      
        <div className="loginRight">
          <div className="loginBox">


            <form  onSubmit={handleSubmit}>
                
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
                  type="submit" >Log up</button>
                
            </form>
          </div>
        </div>
      </div>
   
  );
}