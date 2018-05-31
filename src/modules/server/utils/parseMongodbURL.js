import R from 'ramda';
import { URL } from 'url';

const fn = R.compose(
  R.evolve({ pathname: R.replace('/', '') }),
  url => new URL(url),
);

export default fn;
