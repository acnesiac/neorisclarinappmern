const mongoose = require('mongoose');
//const URI = 'mongodb://localhost/docker-node-mongo';
const URI = 'mongodb://mongo:27017/docker-node-mongo';
mongoose.connect(URI)
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;
