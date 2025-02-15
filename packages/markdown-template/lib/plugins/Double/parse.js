/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var parseDoubleIEEE = require('./format').parseDoubleIEEE;
var parseDoubleFormat = require('./format').parseDoubleFormat;
var textParser = require('../../combinators').textParser;
var seqParser = require('../../combinators').seqParser;

/**
 * Given a format field (like '0,0.00') this method returns
 * a logical name for the field.
 * @param {string} field - the input format field
 * @returns {string} the field designator
 */
function parserOfField(field) {
  if (/0.0(?:.0+)?/.test(field)) {
    return parseDoubleFormat(field);
  } else {
    return textParser(field);
  }
}

/**
 * Creates a parser for a Double variable
 * @param {string} format the format
 * @returns {object} the parser
 */
function doubleParser(format) {
  if (format) {
    var fields = format.split(/(0.0(?:.0+)?)/);
    // remove null or empty strings
    fields = fields.filter(x => x !== '' && x !== null);
    var parsers = fields.map(parserOfField);
    return seqParser(parsers).map(value => value[0]);
  } else {
    return parseDoubleIEEE();
  }
}
module.exports = format => r => doubleParser(format);