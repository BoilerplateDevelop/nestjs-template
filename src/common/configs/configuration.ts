import * as Yup from 'yup';

export const configuration = () => {
  const configSchema = Yup.object({
    PORT: Yup.number().integer().required(),
    NODE_ENV: Yup.string().required(),
    ENCRYPTION_SECRET_KEY: Yup.string().required(),
    ENCRYPTION_SECRET_IV: Yup.string().required(),
    BCRYPT_SALT: Yup.number().integer().required(),
    JWT_SECRET: Yup.string().required(),
    DB_HOST: Yup.string().required(),
    DB_USERNAME: Yup.string().required(),
    DB_PASSWORD: Yup.string().required(),
    DB_DATABASE: Yup.string().required(),
    DB_PORT: Yup.number().integer().required(),
    MAILER_HOST: Yup.string().optional(),
    MAILER_PORT: Yup.number().integer().optional(),
    MAILER_USER: Yup.string().optional(),
    MAILER_PASS: Yup.string().optional(),
    MAILER_EMAIL: Yup.string().optional(),
    AWS_CLOUDWATCH_ACCESS_KEY_ID: Yup.string().optional(),
    AWS_CLOUDWATCH_SECRET_ACCESS_KEY: Yup.string().optional(),
    AWS_CLOUDWATCH_REGION: Yup.string().optional(),
    AWS_CLOUDWATCH_LOG_GROUP: Yup.string().optional(),
  });

  const config = {
    PORT: parseInt(process.env.PORT),
    NODE_ENV: process.env.NODE_ENV || 'development',
    ENCRYPTION_SECRET_KEY: process.env.ENCRYPTION_SECRET_KEY,
    ENCRYPTION_SECRET_IV: process.env.ENCRYPTION_SECRET_IV,
    BCRYPT_SALT: parseInt(process.env.BCRYPT_SALT) || 10,
    DB_HOST: process.env.DB_HOST,
    DB_USERNAME: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_NAME,
    DB_PORT: parseInt(process.env.DB_PORT) || 5432,
    MAILER_HOST: process.env.MAILER_HOST,
    MAILER_PORT: parseInt(process.env.MAILER_PORT) || 25,
    MAILER_USER: process.env.MAILER_USER,
    MAILER_PASS: process.env.MAILER_PASS,
    MAILER_EMAIL: process.env.MAILER_EMAIL,
    JWT_SECRET: process.env.JWT_SECRET,
    AWS_CLOUDWATCH_ACCESS_KEY_ID: process.env.AWS_CLOUDWATCH_ACCESS_KEY_ID,
    AWS_CLOUDWATCH_SECRET_ACCESS_KEY:
      process.env.AWS_CLOUDWATCH_SECRET_ACCESS_KEY,
    AWS_CLOUDWATCH_REGION: process.env.AWS_CLOUDWATCH_REGION,
    AWS_CLOUDWATCH_LOG_GROUP: process.env.AWS_CLOUDWATCH_LOG_GROUP,
  };

  const result = configSchema.validateSync(config);

  return result;
};
