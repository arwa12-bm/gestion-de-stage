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


const FormCnx = () => {
  const initialUser: IUser = {
    email: "",
    password: "",
  };

  const nav = useNavigate();
  const [email, setEmail] = useState(initialUser.email);
  const [password, setPassword] = useState(initialUser.password);
  const [errors, setErrors] = useState<IErrors>({});
  const [isValid, setIsValid] = useState(false);
  const [user, setUser] = useState({});
  const [navigate, setNavigate] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      console.log({ email, password });
      
      const data = await Axios.post("http://localhost:5100/api/v1/usertoken", {
        email,
        password,
      });
      console.log("token : ", data.data.result);
      localStorage.clear();
      localStorage.setItem("token", data.data.result);
      const decoded = jwt_decode(data.data.result);
      console.log(decoded);
      nav("/profile");

    
  };
  return (
    <div id="msform">
      <fieldset style={{ display: "block" }}>
        <h2 className="fs-title">Connexion</h2>
        <h3 className="fs-subtitle">Bienvenue</h3>
        <form onSubmit={handleSubmit}>
        {errors.email   && <p className="error">{errors.email}</p>}
              <input
                placeholder="Enter your email"
                type="email"
                required
                value={email}
                onChange={handleChangeEmail}
                onMouseEnter={(e) =>
                  ((e.target as HTMLInputElement).style.borderBottom = "solid blue 2px")
                }
                onMouseOut={(e) => ((e.target as HTMLInputElement).style.borderBottom = "")}
                className="loginInput"
              />
              <input
                id="input"
                placeholder="Enter your password"
                type="password"
                required
                value={password}
                onChange={handleChangePassword}
                onMouseEnter={(e) =>
                  ((e.target as HTMLInputElement).style.borderBottom = "solid blue 2px")
                }
                onMouseOut={(e) => ((e.target as HTMLInputElement).style.borderBottom = "")}
                className="loginInput"
              />
        <div   >
        <input
          type="submit"
          name="connexion"
          className="connexion action-button"
          value="Connecter"
        />
          <input
          type="button"
          name="connexion"
          className="connexion action-button"
          value="Creer un compte"
          onClick={() => ( nav ('/MultiStepForm'))}
        />
        </div>
        </form>
      </fieldset>
    </div>
  );
};

export default FormCnx;
