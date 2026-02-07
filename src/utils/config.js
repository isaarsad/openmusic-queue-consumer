import 'dotenv/config';

const loadEnv = (key) => {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`Config Error: ${key} is missing from .env`);
  }

  return value;
};

const config = {
  rabbitMq: {
    server: loadEnv('RABBITMQ_SERVER'),
  },
  pg: {
    user: loadEnv('PGUSER'),
    host: loadEnv('PGHOST'),
    database: loadEnv('PGDATABASE'),
    password: loadEnv('PGPASSWORD'),
    port: loadEnv('PGPORT'),
  },
  mail: {
    host: loadEnv('SMTP_HOST'),
    port: loadEnv('SMTP_PORT'),
    user: loadEnv('SMTP_USER'),
    password: loadEnv('SMTP_PASSWORD'),
  },
};

export default config;
