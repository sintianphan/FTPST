const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');

const usersRoutes = require('./routes/users');

const customerRoutes = require('./routes/customer');

const itemRoutes = require('./routes/item');

const chartofaccountRoutes = require('./routes/chartofaccount');

const supplierRoutes = require('./routes/supplier');

const serviceRoutes = require('./routes/service');

const stateRoutes = require('./routes/state');

const countryRoutes = require('./routes/country');

const cityRoutes = require('./routes/city');

const itemgroupRoutes = require('./routes/itemgroup');

const salesorderRoutes = require('./routes/salesorder');

const salesorderdetailsRoutes = require('./routes/salesorderdetails');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'FTPST',
      description:
        'FTPST Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/customer',
  passport.authenticate('jwt', { session: false }),
  customerRoutes,
);

app.use(
  '/api/item',
  passport.authenticate('jwt', { session: false }),
  itemRoutes,
);

app.use(
  '/api/chartofaccount',
  passport.authenticate('jwt', { session: false }),
  chartofaccountRoutes,
);

app.use(
  '/api/supplier',
  passport.authenticate('jwt', { session: false }),
  supplierRoutes,
);

app.use(
  '/api/service',
  passport.authenticate('jwt', { session: false }),
  serviceRoutes,
);

app.use(
  '/api/state',
  passport.authenticate('jwt', { session: false }),
  stateRoutes,
);

app.use(
  '/api/country',
  passport.authenticate('jwt', { session: false }),
  countryRoutes,
);

app.use(
  '/api/city',
  passport.authenticate('jwt', { session: false }),
  cityRoutes,
);

app.use(
  '/api/itemgroup',
  passport.authenticate('jwt', { session: false }),
  itemgroupRoutes,
);

app.use(
  '/api/salesorder',
  passport.authenticate('jwt', { session: false }),
  salesorderRoutes,
);

app.use(
  '/api/salesorderdetails',
  passport.authenticate('jwt', { session: false }),
  salesorderdetailsRoutes,
);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
