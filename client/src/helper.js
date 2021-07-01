export function capitalize(str = 'company') {
    let remaining = [];
    for (let i = 1; i < str.length; i++) {
        remaining += str[i];
    }

    let capitalizedLetter = str[0].toUpperCase();

    let word = capitalizedLetter.concat(remaining);

    return word.toString();
};

export const GATEWAY_URL = 'http://localhost:5000'