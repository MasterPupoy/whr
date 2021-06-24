const userService = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 5002;

userService.get('/login', (req, res) => {
  res.send('user service login');
})

userService.listen(PORT, () => {
  console.log(`user service running on PORT: ${PORT}`);
})