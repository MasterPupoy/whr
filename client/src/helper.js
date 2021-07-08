import io from "socket.io-client";


export async function capitalize(str) {
    let remaining = [];
    
    for (let i = 1; i < str.length; i++) {
      remaining += str[i];
    }

    let capitalizedLetter = str[0].toUpperCase();

    let word = capitalizedLetter.concat(remaining);

    return await word.toString();
};


export const socket = io('http://localhost:5000',{
  autoConnect: false,
  path: '/email'
});

export const GATEWAY_URL = 'http://localhost:5000'
