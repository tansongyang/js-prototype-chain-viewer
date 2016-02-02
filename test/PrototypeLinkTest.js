'use strict';

import PrototypeLink from '../lib/PrototypeLink';

describe('PrototypeLink', () => {
  describe('constructor(object)', () => {
    it('returns the same instance when created with the same object', () => {
      const link0 = new PrototypeLink(Object.prototype);
      const link1 = new PrototypeLink(Object.prototype);
      expect(link0).to.equal(link1);
    });
  });

  describe('#name', () => {
    it('returns the "id" property of object', () => {
      const id = '4b0f8123-e491-4df4-b455-04a2954bb689';
      const object = {
        id: id 
      };
      const link = new PrototypeLink(object);
      expect(link.name).to.equal(id);
    });

    it('returns the "name" property of object', () => {
      const name = 'Carl Ditters von Dittersdorf';
      const object = {
        name: name
      };
      const link = new PrototypeLink(object);
      expect(link.name).to.equal(name);
    });

    it('returns "(anonymous)" when object has no "name" property', () => {
      const object = {};
      const link = new PrototypeLink(object);
      expect(link.name).to.equal('(anonymous)');
    });

    it('returns function name when object is a named function', () => {
      function Ditters() {}
      let link = new PrototypeLink(Ditters);
      expect(link.name).to.equal('Ditters');

      const f = function vonDittersdorf() {};
      link = new PrototypeLink(f);
      expect(link.name).to.equal('vonDittersdorf');
    });

    it('returns "Constructor.prototype" when object is the prototype of the constructor function "Constructor"', () => {
      function Constructor() {}
      const c = new Constructor();
      const object = Object.getPrototypeOf(c);
      const link = new PrototypeLink(object);
      expect(link.name).to.equal('Constructor.prototype');
    });
  });

  describe('#getOwnPropertyNamesSafe', () => {
    it('returns normal own properties', () => {
      const link = new PrototypeLink(Function.prototype);
      expect(link).to.have.property('toString');
    });

    it('does not return "caller" and "arguments" on Function.prototype', () => {
      const link = new PrototypeLink(Function.prototype);
      expect(link).not.to.have.property('caller');
      expect(link).not.to.have.property('arguments');
    });
  });
});
