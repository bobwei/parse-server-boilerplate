import 'dotenv/config';
import express from 'express';
import ParseServer from 'parse-server';
import { LiveQueryOptions } from 'parse-server/lib/Options/Definitions';
import Parse from 'parse/node';
import compression from 'compression';

import createCloudCode from 'modules/cloudCode';
import parseEnvToConfig from 'modules/parse-server/utils/parseEnvToConfig';
import createConfig from 'modules/parse-server/utils/createConfig';
import log from './middlewares/log';

const createServer = async env => {
  const app = express();

  const { ENABLE_LOGGING } = env;
  if (ENABLE_LOGGING === 'true') {
    app.use(log());
  }
  app.use(compression());

  /* parse-server */
  const parseServerConfig = parseEnvToConfig(env);
  const liveQueryOptions = createConfig(LiveQueryOptions)(env);
  const parseServerAPI = new ParseServer({
    ...parseServerConfig,
    cloud: createCloudCode({}),
    liveQuery: {
      classNames: ['Face'],
      ...liveQueryOptions,
    },
  });
  app.use(parseServerConfig.mountPath, parseServerAPI.app);

  const {
    PARSE_SERVER_APPLICATION_ID,
    PARSE_SERVER_URL,
    PARSE_SERVER_MASTER_KEY,
  } = env;
  Parse.initialize(
    PARSE_SERVER_APPLICATION_ID,
    undefined,
    PARSE_SERVER_MASTER_KEY,
  );
  Parse.serverURL = PARSE_SERVER_URL;

  const server = app.listen(parseServerConfig.port, () => {
    console.log(`Server running on port ${server.address().port}.`);
  });
};

export default createServer;

if (require.main === module) {
  createServer(process.env);
}
