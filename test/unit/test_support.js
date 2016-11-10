// == Imports ===============================================================

const helpers = require('../helpers');

const support = require('../../lib/support');

// == Tests =================================================================

describe('support library', () => {
  describe('toCamelCase()', () => {
    const toCamelCase = support.toCamelCase;

    it('can handle simple terms', () => {
      assert.equal(toCamelCase('test'), 'test');
    });

    it('can handle an underscore', () => {
      assert.equal(toCamelCase('test_term'), 'testTerm');
    });

    it('can handle multiple underscores', () => {
      assert.equal(toCamelCase('test_term_extra'), 'testTermExtra');
    });
  });
});
