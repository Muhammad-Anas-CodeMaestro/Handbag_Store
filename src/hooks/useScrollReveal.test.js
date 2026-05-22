// src/test/useScrollReveal.test.js
import { renderHook } from '@testing-library/react';
import { useScrollReveal } from '../hooks/useScrollReveal';

// Mock IntersectionObserver (jsdom doesn't include it)
beforeAll(() => {
  global.IntersectionObserver = class {
    constructor(cb) { this.cb = cb; }
    observe(el) {
      // Immediately fire as intersecting for tests
      this.cb([{ isIntersecting: true, target: el }]);
    }
    unobserve() {}
    disconnect() {}
  };
});

it('returns a ref object', () => {
  const { result } = renderHook(() => useScrollReveal());
  expect(result.current).toHaveProperty('current');
});