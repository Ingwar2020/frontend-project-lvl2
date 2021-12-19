import * as fs from 'fs';
import path from 'path';

const getDataFromFile = (filepath) => {
  const absolutePath = path.resolve(filepath);
  const format = path.extname(absolutePath);
  const data = fs.readFileSync(absolutePath);
  // const parse = JSON.parse(data, 'utf8');

  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml') {
    parse = yaml.safeLoad;
  }
  return parse(data);
};

export default getDataFromFile;
