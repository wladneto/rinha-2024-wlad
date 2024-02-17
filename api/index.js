const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json())

require('./dbConn');

const clienteRouter = require('./src/routes/cliente')

app.use('/clientes', clienteRouter)


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));