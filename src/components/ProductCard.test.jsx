import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, it, expect } from 'vitest';
import ProductCard from './ProductCard';
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

function renderCard() {
    return render(
        <MemoryRouter>
            <ProductCard product={mockProduct} />
        </MemoryRouter>
    );
}

describe('ProductCard', () => {
    it('renders product name', () => {
        renderCard();
        expect(screen.getByText('The Harvest Tote')).toBeInTheDocument();
    });

    it('renders product price', () => {
        renderCard();
        expect(screen.getByText('$149')).toBeInTheDocument();
    });

    it('renders product color', () => {
        renderCard();
        expect(screen.getByText('Tan')).toBeInTheDocument();
    });

    it('renders an Add to Cart button', () => {
        renderCard();
        expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    });

    it('adds item to cart when button clicked', async () => {
        const user = userEvent.setup();
        renderCard();
        await user.click(screen.getByRole('button', { name: /add to cart/i }));
        expect(useCartStore.getState().items).toHaveLength(1);
        expect(useCartStore.getState().items[0].id).toBe('1');
    });

    // AFTER
    it('product name links to correct product page', () => {
        renderCard();
        const links = screen.getAllByRole('link', { name: 'The Harvest Tote' });
        // Both links go to the same href — assert all of them
        links.forEach(link => {
            expect(link).toHaveAttribute('href', '/shop/the-harvest-tote');
        });
        // And confirm there are exactly 2 (image link + text link)
        expect(links).toHaveLength(2);
    });
}); 