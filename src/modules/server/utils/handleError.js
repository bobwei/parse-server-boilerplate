import R from 'ramda';

// prettier-ignore
const fn = R.useWith(
  (res, error) => {
    res.status(500).json(error);
    console.log(error)
  },
  [
    R.identity,
    R.compose(
      R.objOf('error'),
      R.when(
        R.compose(R.not, R.is(String)),
        R.toString,
      )
    ),
  ]
);

export default fn;
