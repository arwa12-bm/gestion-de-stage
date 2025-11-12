    import React from "react";
    import "../MultiStepForm/MultiStepForm.css";
    import { useEffect, useState } from "react";
    import Axios from "axios";
    import jwt_decode from "jwt-decode";
    import { useNavigate } from "react-router-dom";
 



    interface IUser {
    email: string;
    password: string;
    }
    interface IErrors {
    email?: string;
    password?: string;
    }


    const FormCreateAcc = () => {
        const initialUser ={
                username:"",
                email:"",
                password:"",
                role:"",
                phone:""
            }
            interface UserProfile {
                id: number;
                username: string;
                email: string;
                role: string;
                userphone: string;
                post: string;
                }
        
            
            const nav = useNavigate();
            const[email,setEmail]=useState(initialUser.email);
            const[password,setPassword]=useState(initialUser.password);
            const[username,setUserName]=useState(initialUser.username);
            const[userphone,setUserPhone]=useState(initialUser.phone);
            const[role,setRole]=useState(initialUser.role);
            const[errors,setErrors]=useState<IErrors>({});
            
            
            const handleChangePhone = async(e)=>{
                setUserPhone(e.target.value)
            }
            const handleChangeName = async(e)=>{
                setUserName(e.target.value)
            }
                const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    //console.log(email)
                    // const response = await Axios.get('http://localhost:5200/api/v1/useremail',{ params: { email: email }})
                
                    if (!email) {
                    setErrors((prevErrors) => ({ ...prevErrors, email: "Email is required!" }));
                    } else if (!/\w+@\w+\.\w+/.test(email)) {
                    setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email format!" }));
                    (e.target as HTMLInputElement).style.borderColor = "red";
                    } else {
                    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
                    (e.target as HTMLInputElement).style.borderColor = "green";
                    }
                };
                
                const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                    if (!password) {
                    setErrors((prevErrors) => ({ ...prevErrors, password: "Password is required!" }));
                    } else if (password.length < 4) {
                    setErrors((prevErrors) => ({ ...prevErrors, password: "Password must be at least 4 characters!" }));
                    (e.target as HTMLInputElement).style.borderColor = "red";
                    } else {
                    setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
                    (e.target as HTMLInputElement).style.borderColor = "green";
                    }
                };
            
        
        
        
            const handleSubmitCreate = async (e) => {
            e.preventDefault();
            
            console.log({ email, password,username,userphone,"role":"encadrant","isadmin":false ,"status":null });
        
            await Axios.post('http://localhost:5100/api/v1/insertuser',{ email,username, password,userphone,"role":"encadrant","isadmin":false ,"status":null } );
            console.log("done")
            nav ('/MultiStepForm')
            };
        
    return (
        <div id="msform">
        <fieldset style={{ display: "block" }}>
            <h2 className="fs-title">Creer votre compte</h2>
            <h3 className="fs-subtitle">Bienvenue</h3>
                <form  onSubmit={handleSubmitCreate}>
                    
                    <input placeholder="Enter your name"
                                type="text" 
                                required 
                                value={username} 
                                onChange={handleChangeName}
                                onMouseEnter={(e)=>(e.target as HTMLInputElement).style.borderBottom= "solid blue 2px" }
                                onMouseOut={(e)=>(e.target as HTMLInputElement).style.borderBottom= "" }
                                className="loginInput" />
                    <input placeholder="Enter your phone"
                                type="text" 
                                required 
                                value={userphone} 
                                onChange={handleChangePhone}
                                onMouseEnter={(e)=>(e.target as HTMLInputElement).style.borderBottom= "solid blue 2px" }
                                onMouseOut={(e)=>(e.target as HTMLInputElement).style.borderBottom= "" }
                                className="loginInput" />
                    {errors.email &&<p className="error">{errors.email}</p>}
                    <input placeholder="Enter your email"
                            type="email" 
                            required 
                            value={email} 
                            onChange={handleChangeEmail}
                            onMouseEnter={(e)=>(e.target as HTMLInputElement).style.borderBottom= "solid blue 2px" }
                            onMouseOut={(e)=>(e.target as HTMLInputElement).style.borderBottom= "" }
                            className="loginInput" />
                            <input id="input"
                                    placeholder= "Enter your password"
                                    type="password" 
                                    required 
                                    value={password} 
                                    onChange={handleChangePassword}

                                    onMouseEnter={(e)=>(e.target as HTMLInputElement).style.borderBottom= "solid blue 2px"  }
                                    onMouseOut={(e)=>(e.target as HTMLInputElement).style.borderBottom= "" }
                                className="loginInput" />
                            <select id="select" 
                            
                            placeholder= "Role"
                            onMouseEnter={(e)=>(e.target as HTMLInputElement).style.borderBottom= " blue 2px"  }
                            onMouseOut={(e)=>(e.target as HTMLInputElement).style.borderBottom= "" }
                            className="loginSelect" >
                            <option >--Entrer votre etat--</option>
                            <option value={role}>Etudiant</option>
                            <option value={role}>chômeur</option>
                            <option value={role}>Recruteur</option>
                            </select>
                        <input
                        type="submit"
                        name="connexion"
                        className="connexion action-button"
                        value="Créer"
                        onClick={() => ( nav ('/MultiStepForm'))}
                        />
                    
                </form>
        </fieldset>
        </div>
    );
    };

    export default FormCreateAcc;
