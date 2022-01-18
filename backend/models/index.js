const { connect } = require('mongoose');

let connection;

async function connectToDb() {
    connection = await connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Connected to mongo')
}

module.exports = connectToDb;