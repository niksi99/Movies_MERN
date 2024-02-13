const mongoose = require('mongoose');

const url = process.env.MONGODB_URL
const ConnectMongoDB = async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(console.log('radi mongo'))
      .catch(error => console.log(error))
}

module.exports = ConnectMongoDB;