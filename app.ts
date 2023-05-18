import express from 'express'
// import helmet from 'helmet'
import cors from 'cors'
import { router } from './routes/router.js'

const app = express();

// app.use(helmet());
// should explicitly define origins
app.use(cors());
app.use(express.json());

app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is listening on port ${port}.`));
