// import { Sequelize } from 'sequelize';
// import { config } from './config';
// import {setupModels} from './models';

// const USER = encodeURIComponent(config.DB.POSTGRESS.dbUser);
// const PASSWORD = encodeURIComponent(config.DB.POSTGRESS.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.DB.POSTGRESS.dbHost}:${config.DB.POSTGRESS.dbPort}/${config.DB.POSTGRESS.dbName}`;

// export const sequelize = new Sequelize(URI, {
//   dialect: 'postgres',
//   logging: true,
// });

// setupModels(sequelize);

// sequelize.sync({ force: false }).then(() => {
//   console.log('Tablas sincronizadas');
// });
