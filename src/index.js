import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers.js';

const getData = (filepath) => {
  const absolutePath = path.resolve(filepath);
  const data = fs.readFileSync(absolutePath, 'utf8');
  return data;
};

const genDiff = (filepath1, filepath2) => {
  if (!(fs.existsSync(filepath1) && fs.existsSync(filepath2))) {
    return 'Please check if paths are correct';
  }

  const object1 = parse(getData(filepath1), path.extname(filepath1));
  const object2 = parse(getData(filepath2), path.extname(filepath2));
  const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)));
  const result = [];
  keys.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];
    if (_.has(object1, key) && _.has(object2, key)) {
      if (value1 === value2) {
        result.push(`   ${key}: ${value1}`);
      } else {
        result.push(` - ${key}: ${value1}`);
        result.push(` + ${key}: ${value2}`);
      }
    } else if (_.has(object1, key) && !_.has(object2, key)) {
      result.push(` - ${key}: ${value1}`);
    } else if (!_.has(object1, key) && _.has(object2, key)) {
      result.push(` + ${key}: ${value2}`);
    }
    return result;
  });
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
