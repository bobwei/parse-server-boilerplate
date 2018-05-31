import R from 'ramda';
import { mongoObjectToParseObject } from 'parse-server/lib/Adapters/Storage/Mongo/MongoTransform';
import Config from 'parse-server/lib/Config';

const fn = async ({ parseServerAPI }, className) => {
  if (!parseServerAPI) {
    return Promise.resolve(
      R.converge(R.merge, [
        R.omit(['_id', '_created_at', '_updated_at']),
        R.applySpec({
          objectId: R.path(['_id']),
          createdAt: R.path(['_created_at']),
          updatedAt: R.path(['_updated_at']),
        }),
      ]),
    );
  }
  const parseServerConfig = Config.get(parseServerAPI.config.appId);
  const { databaseController, filesController } = parseServerAPI.config;
  const schema = await databaseController
    .loadSchema()
    .then(schemaController => schemaController.getOneSchema(className));
  return R.compose(
    R.tap(obj => filesController.expandFilesInObject(parseServerConfig, obj)),
    obj => mongoObjectToParseObject(className, obj, schema),
  );
};

export default fn;
