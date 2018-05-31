/* eslint-disable no-new */
import 'dotenv/config';
import express from 'express';
import { ParseLiveQueryServer } from 'parse-server/lib/LiveQuery/ParseLiveQueryServer';
import definitions from 'parse-server/lib/cli/definitions/parse-live-query-server';
import Parse from 'parse/node';

import createConfig from 'modules/parse-server/utils/createConfig';

const createServer = env => {
  const app = express();

  const { PARSE_SERVER_APPLICATION_ID, PARSE_SERVER_URL } = process.env;
  Parse.initialize(PARSE_SERVER_APPLICATION_ID);
  Parse.serverURL = PARSE_SERVER_URL;

  const config = createConfig(definitions)(env);

  const server = app.listen(config.port, () => {
    console.log(`LiveQuery server running on port ${server.address().port}.`);
  });

  new ParseLiveQueryServer(server, config);
};

export default createServer;

if (require.main === module) {
  createServer(process.env);
}
