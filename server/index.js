require('dotenv').config()

const express = require("express");
const logger = require('morgan')
const helmet = require('helmet')
const app = express();

const cors = require('cors');
const port = process.env.PORT || 3001;

const authRoute = require('./routes/authRoute');
const profileRoute = require('./routes/profileRoute');
const vehicleRoute = require('./routes/vehicleRoute');
const domainRoute = require('./routes/domainRoute');
const bookingRoute = require('./routes/bookingRoute');

const engineTypeRoute = require('./routes/genericDomainRoute')('engine_type', 'engine type');
const manufacturerRoute = require('./routes/genericDomainRoute')('manufacturer', 'manufacturer');
const transmissionTypeRoute = require('./routes/genericDomainRoute')('transmission_type', 'transmission type');
const vehicleTypeRoute = require('./routes/genericDomainRoute')('vehicle_type', 'vehicle type');

const { failure } = require("./helpers");

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use( express.urlencoded({ extended: true, }) );
app.use(logger('dev'))
app.get('/', (req, res) => { res.json({ message: 'running' }); });

app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/vehicle', vehicleRoute);
app.use('/domain', domainRoute);
app.use('/booking', bookingRoute);

// app.use('/domain/engine-type', engineTypeRoute);
// app.use('/domain/manufacturer', manufacturerRoute);
// app.use('/domain/transmission-type', transmissionTypeRoute);
// app.use('/domain/vehicle-type', vehicleTypeRoute);

// Simple Error handling
app.use((err, req, res, _next) => {
    const statusCode = err.statusCode || 500;

    console.error(err?.message, err?.stack);

    res?.status(statusCode).json(failure(err?.message))
});

app.listen(port, () => {
    console.log("Server has started on port: 3001");
});