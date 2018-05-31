import { Writable } from 'stream';
import R from 'ramda';

const fn = ({ res }) => {
  res.write('{"results":[');
  let i = 0;
  return new Writable({
    objectMode: true,
    write(data, encoding, callback) {
      if (i > 0) res.write(',');
      i += 1;
      res.write(JSON.stringify(data));
      callback();
    },
    final() {
      res.write(']}');
      res.end();
    },
  });
};

export default R.curry(fn);
