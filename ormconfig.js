const SnakeNamingStrategy =
  require('typeorm-naming-strategies').SnakeNamingStrategy;

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ['src/database/entities/**/*.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  subscribers: ['src/database/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/database/entities',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/database/subscriber',
  },
  options: {
    trustServerCertificate: true,
    cryptoCredentialsDetails: {
      minVersion: 'TLSv1',
    },
  },
  namingStrategy: new SnakeNamingStrategy(),
};
