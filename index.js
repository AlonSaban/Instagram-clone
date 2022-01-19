require('dotenv').config({ path: './backend/config/.env' });
const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const helmet = require('helmet')
app.use(helmet())
const morgan = require('morgan')
const connectToDb = require('./backend/models')
const cookieParser = require('cookie-parser');
app.use(cookieParser())
const router = express.Router();
// app.use(morgan("common"))



connectToDb()
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log('Server runing on port ' + process.env.PORT);
        })
    })

require('./backend/routes/users')(app);
require('./backend/routes/posts')(app);

module.exports = {
    connectToDb
}