export const getInitials = (name) => {
  let initials = name.slice(0,2);
  
  return(initials)
};

export function capitalize(str) {
    let remaining = [];
    for (let i = 1; i < str.length; i++) {
        remaining += str[i];
    }

    let capitalizedLetter = str[0].toUpperCase();

    let word = capitalizedLetter.concat(remaining);

    return word.toString();
};

export const GATEWAY_URL = 'http://localhost:5000'