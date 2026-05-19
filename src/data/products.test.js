import { describe, it, expect } from 'vitest';
import { products, getProductBySlug, categories } from './products';

describe('products data', () => {
  it('contains 6 products', () => {
    expect(products).toHaveLength(6);
  });

  it('every product has required fields', () => {
    products.forEach(p => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('slug');
      expect(p).toHaveProperty('name');
      expect(p).toHaveProperty('price');
      expect(p).toHaveProperty('image');
      expect(p.price).toBeGreaterThan(0);
    });
  });
});

describe('getProductBySlug', () => {
  it('returns the correct product', () => {
    const product = getProductBySlug('the-harvest-tote');
    expect(product.name).toBe('The Harvest Tote');
  });

  it('returns undefined for unknown slug', () => {
    expect(getProductBySlug('not-a-real-bag')).toBeUndefined();
  });
});

describe('categories', () => {
  it('includes "all" as first entry', () => {
    expect(categories[0]).toBe('all');
  });

  it('every product category exists in categories list', () => {
    products.forEach(p => {
      expect(categories).toContain(p.category);
    });
  });
});