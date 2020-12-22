import envvar from 'env-var';

export const NODE_VERSION = envvar
  .get('NODE_VERSION')
  .required(true)
  .default('12.16.1')
  .asString();

export const PORT = envvar
  .get('PORT')
  .required(true)
  .default(3000)
  .asPortNumber();
