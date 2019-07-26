const helmet = require('helmet');
const debug = require('debug')('app:startup');
const morgan = require('morgan');
const config = require('config');
const express = require('express');
const logger = require('./middleware/logger');
const app = express();
const genre = require('./routes/genres');
const home = require('./routes/home');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet);

app.use('/api/genres', genre);
app.use('/', home);

console.log('Aplication name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

app.use(logger);

app.listen(port, () => {
    console.log(`Listening to PORT ${port}`);
});
