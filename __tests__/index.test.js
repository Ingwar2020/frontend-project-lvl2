/* eslint no-undef: "error" */
/* global test, expect */

import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filepath1 = getFixturePath('before.json');
const filepath2 = getFixturePath('after.json');
const resultPath = getFixturePath('result-json.txt');
const result = fs.readFileSync(resultPath, 'utf8');

test('Compare JSON', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(result);
});
