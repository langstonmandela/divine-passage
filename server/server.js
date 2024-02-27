const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;


// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const servicePartnerRouter = require('./routes/service.partner.router');
const guardianshipRouter = require('./routes/guardianship.router');
const formsAggregatorRouter = require('./routes/forms.aggregator')

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/service_partner', servicePartnerRouter);
app.use('/api/guardianship', guardianshipRouter);
app.use('/api/forms_aggregator', formsAggregatorRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
