import { useState, useEffect } from "react";

 export const ErrorMessages = ({ message }) => {
  const [errors, setError] = useState(null);

  if(message){
    setError((errors) =>{
      return [...errors, message];
    });
  }
  return errors;
}