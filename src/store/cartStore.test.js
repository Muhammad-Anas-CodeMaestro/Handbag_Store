import { beforeEach, describe, it, expect } from 'vitest';
import { useCartStore } from './cartStore';

// Reset store state before each test
beforeEach(() => {
  useCartStore.setState({ items: [] });
});

const mockProduct = {
  id: '1',
  slug: 'the-harvest-tote',
  name: 'The Harvest Tote',
  price: 149,
  image: 'https://example.com/img.jpg',
  color: 'Tan',
};

describe('addItem', () => {
  it('adds a new product to an empty cart', () => {
    useCartStore.getState().addItem(mockProduct);
    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it('defaults quantity to 1', () => {
    useCartStore.getState().addItem(mockProduct);
    expect(useCartStore.getState().items[0].qty).toBe(1);
  });

  it('increments qty if product already in cart', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().addItem(mockProduct);
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].qty).toBe(2);
  });

  it('adds specified quantity', () => {
    useCartStore.getState().addItem(mockProduct, 3);
    expect(useCartStore.getState().items[0].qty).toBe(3);
  });
});

describe('updateQty', () => {
  it('updates quantity for an existing item', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().updateQty('1', 5);
    expect(useCartStore.getState().items[0].qty).toBe(5);
  });

  it('removes item when qty set to 0', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().updateQty('1', 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('removes item when qty is negative', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().updateQty('1', -1);
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});

describe('removeItem', () => {
  it('removes the correct item by id', () => {
    const product2 = { ...mockProduct, id: '2', name: 'Clay Crossbody' };
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().addItem(product2);
    useCartStore.getState().removeItem('1');
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].id).toBe('2');
  });
});

describe('clearCart', () => {
  it('empties all items', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});

describe('totals', () => {
  it('calculates correct subtotal', () => {
    useCartStore.getState().addItem(mockProduct, 2);
    const total = useCartStore.getState().items
      .reduce((sum, i) => sum + i.price * i.qty, 0);
    expect(total).toBe(298);
  });
});