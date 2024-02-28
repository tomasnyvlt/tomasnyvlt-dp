import config from '@src/config';

export const logger = (message: any): void => {
  if (config.env === 'prod') return;

  // eslint-disable-next-line no-console
  console.log(message);
};
