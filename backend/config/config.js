const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_SERVICE_NAME,
  POSTGRES_PORT,
  NODE_ENV
} = process.env;

let options = {
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  host: POSTGRES_SERVICE_NAME,
  port: POSTGRES_PORT,
  dialect: 'postgres',
  seederStorage: 'sequelize',
  logging: false,
  // query: {
  //     raw: true
  // }
};

if (NODE_ENV !== 'local')
  options.dialectOptions = {
      ssl: true
  };

module.exports = options;

// {
//   "development": {
//     "username": process.env.POSTGRES_USER,
//     "password": process.env.POSTGRES_PASSWORD,
//     "database": process.env.POSTGRES_DB,
//     "host": process.env.POSTGRES_SERVICE_NAME,
//     "dialect": "postgres"
//   },
//   "test": {
//     "username": process.env.POSTGRES_USER,
//     "password": process.env.POSTGRES_PASSWORD,
//     "database": process.env.POSTGRES_DB,
//     "host": process.env.POSTGRES_SERVICE_NAME,
//       "dialect": "postgres"
//   },
//   "production": {
//     "username": process.env.POSTGRES_USER,
//     "password": process.env.POSTGRES_PASSWORD,
//     "database": process.env.POSTGRES_DB,
//     "host": process.env.POSTGRES_SERVICE_NAME,
//       "dialect": "postgres"
//   }
// }