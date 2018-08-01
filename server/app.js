import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes';
import CreateTableSchema from './model/CreateTables';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

router(app);

new CreateTableSchema().run();
// returns 404 for unknown routes
app.all('*', (req, res) => {
  res.status(404).send('This URL does not exist, please check again ');
});

export default app;
