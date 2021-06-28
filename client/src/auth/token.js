import { useState } from "react";

export function useToken(){
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString ? tokenString : null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
};

const getToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString ? tokenString : null;
  };

export const token = getToken();