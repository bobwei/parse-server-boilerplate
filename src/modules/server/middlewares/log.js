import express from 'express';
import morgan from 'morgan';
import onFinished from 'on-finished';

export const logFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';

const fn = () => {
  const app = express();
  app.use((req, res, next) => {
    onFinished(res, () => {
      res._startAt = process.hrtime();
    });
    next();
  }, morgan(logFormat));
  return app;
};

export default fn;
