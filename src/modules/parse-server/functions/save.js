import R from 'ramda';

const fn = (dependencies, data) => {
  const { Parse } = dependencies;
  const { className, payload, options } = data;
  return new Parse.Object(className).save(payload, options);
};

export default R.curry(fn);
