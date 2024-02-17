const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json())

require('./dbConn');

const clienteRouter = require('./src/routes/cliente')

app.use('/clientes', clienteRouter)


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));