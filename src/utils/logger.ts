/* eslint-disable no-console */

export const errorMessageLogger = (error: any) => {
  const errorLog = {
    status: error.response?.status,
    url: error.config?.url,
    message: error.message,
    data: error.response?.data,
  };

  if (process.env.NODE_ENV === 'development') {
    console.error('API Error:', errorLog);
  }
};
