import yaml from 'js-yaml';

export default (data, format) => {
  let parser;
  if (format === '.json') {
    parser = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parser = yaml.load;
  }
  return parser(data);
};
