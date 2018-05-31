import R from 'ramda';

const fn = (relatedProp, dependencies, req) => {
  const { Parse } = dependencies;
  return Promise.resolve(req.object.toJSON())
    .then(R.propOr([], relatedProp))
    .then(
      R.map(
        ({ className, objectId }) => new Parse.Object(className, { objectId }),
      ),
    )
    .then(_data => Parse.Object.destroyAll(_data))
    .then(
      R.tap(
        R.compose(
          n => console.log(`${n} faces deleted.`),
          R.length,
        ),
      ),
    )
    .catch(console.log);
};

export default R.curry(fn);
