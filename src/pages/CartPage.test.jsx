import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, it, expect } from 'vitest';
import CartPage from './CartPage';
import { useCartStore } from '../store/cartStore';

const mockProduct = {
    id: '1',
    slug: 'the-harvest-tote',
    name: 'The Harvest Tote',
    price: 149,
    color: 'Tan',
    image: 'https://example.com/img.jpg',
};

beforeEach(() => {
    useCartStore.setState({ items: [] });
});

function renderCart() {
    return render(<MemoryRouter><CartPage /></MemoryRouter>);
}

describe('CartPage — empty state', () => {
    it('shows empty cart message', () => {
        renderCart();
        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });

    it('shows link to shop', () => {
        renderCart();
        expect(screen.getByRole('link', { name: /shop the collection/i }))
            .toHaveAttribute('href', '/shop');
    });
});

describe('CartPage — with items', () => {
    beforeEach(() => {
        useCartStore.setState({ items: [{ ...mockProduct, qty: 2 }] });
    });

    it('renders product name', () => {
        renderCart();
        expect(screen.getByText('The Harvest Tote')).toBeInTheDocument();
    });

    it('renders correct line total', () => {
        renderCart();
        // Target the item row specifically, not the summary panel
        const itemRow = screen.getByText('The Harvest Tote').closest('.flex.gap-5');
        expect(within(itemRow).getByText('$298.00')).toBeInTheDocument();
    });

    it('removes item when Remove is clicked', async () => {
        const user = userEvent.setup();
        renderCart();
        await user.click(screen.getByRole('button', { name: /remove/i }));
        expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('shows free shipping when subtotal >= $120', () => {
        renderCart();
        expect(screen.getByText(/free/i)).toBeInTheDocument();
    });

    it('shows checkout button', () => {
        renderCart();
        expect(screen.getByRole('button', { name: /proceed to checkout/i }))
            .toBeInTheDocument();
    });
});