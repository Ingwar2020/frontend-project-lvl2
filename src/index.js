import * as fs from 'fs';
import _ from 'lodash';

const getObjectFromFile = (filepath) => {
  const string = fs.readFileSync(filepath);
  const object = JSON.parse(string, 'utf8');
  return object;
};

const genDiff = (filepath1, filepath2) => {
  const object1 = getObjectFromFile(filepath1);
  const object2 = getObjectFromFile(filepath2);
  const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)));
  const result = [];

  for (const key of keys) {
    const value1 = object1[key];
    const value2 = object2[key];
    if (_.has(object1, key) && _.has(object2, key)) {
      if (value1 === value2) {
        result.push(`   ${key}: ${value1}`);
      } else {
        result.push(` - ${key}: ${value1}`);
        result.push(` + ${key}: ${value2}`);
      }
    } else if (_.has(object1, key) && !_.has(object2, key)){
      result.push(` - ${key}: ${value1}`);
    } else if (!_.has(object1, key) && _.has(object2, key)) {
      result.push(` + ${key}: ${value2}`);
    }
    
  }
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;