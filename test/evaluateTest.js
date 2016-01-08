'use strict';

import evaluateJS from '../web/scripts/evaluate';
import code from '../web/scripts/samples';

describe('evaluate', () => {
  describe('evaluateJS', () => {
    it('should return the object returned by the code', () => {
      let result = evaluateJS(code);
      expect(result).to.have.property('object');
      expect(result.object).to.not.be.null;
      expect(result.object).to.have.property('id', 'bar');
    });
  })
});