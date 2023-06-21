import React from 'react'

const validation = ( email,password) => {
    let errorse="t";
   if(!/\S+@\S+\.\S+/.test(email)){
        errorse.email="Email is invalide !"
    }else{
        
    }

    if(!password  ){
        errorse.password="password is required !"
    }else if(password.length<5){
        errorse.password="password must be more then 5 char"
    }
  return (
    <div>validation</div>
  )
}

export default validation