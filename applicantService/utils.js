const  getRandomIntPassword = (min = 8888888, max = 99999999) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

module.exports =  { getRandomIntPassword }