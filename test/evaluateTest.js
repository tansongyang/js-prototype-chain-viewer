import evaluateJS from '../src/evaluate';

describe('evaluate', () => {
  describe('evaluateJS', () => {
    it('should return the object returned by the code', () => {
      const result = evaluateJS('return {object: {id: "bar"}};');
      expect(result).to.have.property('object');
      expect(result.object).to.not.be.null;
      expect(result.object).to.have.property('id', 'bar');
    });
  })
});