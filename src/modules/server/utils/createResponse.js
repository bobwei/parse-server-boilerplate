import R from 'ramda';

const fn = R.useWith((res, data) => res.json(data), [
  R.identity,
  R.applySpec({
    results: R.identity,
  }),
]);

export default fn;
