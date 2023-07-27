/* eslint-disable no-console */

import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../entities/User';
import { Todo } from '../entities/Todo';

const connectDB = async () => {
  const options: DataSourceOptions = {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    logging: ['query', 'error'],
    type: 'postgres',
    entities: [User, Todo],
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    synchronize: true
  };

  const dataSource = new DataSource(options);

  dataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err.message);

      process.exit(1);
    });
};

export default connectDB;
