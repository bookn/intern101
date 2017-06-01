const plus = require('../plus')

describe('Function', () => {
  describe('plus', () => {
    it('should plus number correctly', () => {
      expect(plus(1, 2)).to.equal(3)
    })
    it('should plus number correctly', () => {
      expect(plus(2, 4)).to.equal(6)
    })
  })
})
