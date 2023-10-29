// We will be refactoring an existing Express project to use the Prisma client
// We will also translate CRUD SQL queries into the corresponding PRISMA client operations

// ************** PRISMA SETUP STEPS **************
// Same start up as usual - except you install Prisma (npm i @prisma/client)
// Also - npx prisma init --datasource-provider postgresql
// Then go into the .env folder and configure the URL


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use('/api/posts', require('./routes/posts'));

app.listen(port, () => {
    console.log('Server is running on port 8080')
});
