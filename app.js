const express = require('express');
const helmet = require('helmet')
const cors = require('cors');
const indexRouter = require('./routes/index');

const app = express();

app.use(helmet());
// should explicitly define origins
app.use(cors());
app.use(express.json());

app.use('/', indexRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is listening on port ${port}.`));
