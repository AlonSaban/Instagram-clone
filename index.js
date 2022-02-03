require('dotenv').config({ path: './backend/config/.env' });
const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const helmet = require('helmet')
app.use(helmet())
const cookieParser = require('cookie-parser');
app.use(cookieParser())
app.use(express.static('uploads'))
const path = require('path')
const connectToDb = require('./backend/models')


connectToDb()
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log('Server runing on port ' + process.env.PORT);
        })
    })

// making the route to the constant images static so it wont need to send request every time
app.use("/img", express.static(path.join(__dirname, 'frontend/img')))

require('./backend/routes/users')(app);
require('./backend/routes/posts')(app);

module.exports = {
    connectToDb
}