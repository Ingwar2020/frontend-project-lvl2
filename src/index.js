import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';

const getDataFromFile = (filepath) => {
  const absolutePath = path.resolve(filepath);
  const file = fs.readFileSync(absolutePath);
  const data = JSON.parse(file, 'utf8');
  return data;
};

const genDiff = (filepath1, filepath2) => {
  const object1 = getDataFromFile(filepath1);
  const object2 = getDataFromFile(filepath2);
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
