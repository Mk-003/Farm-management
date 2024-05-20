import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Products from './components/client/Products';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

test('fetches and displays products', async () => {
  fetchMock.mockResponseOnce(JSON.stringify([
    { id: 1, name: 'Product 1', description: 'Description 1', price: 10, image_url: 'image1.jpg' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 20, image_url: 'image2.jpg' },
  ]));

  render(<Products />);

  await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());
  expect(screen.getByText('Product 2')).toBeInTheDocument();
});

test('sorts products by name', async () => {
  fetchMock.mockResponseOnce(JSON.stringify([
    { id: 2, name: 'Product B', description: 'Description B', price: 20, image_url: 'image2.jpg' },
    { id: 1, name: 'Product A', description: 'Description A', price: 10, image_url: 'image1.jpg' },
  ]));

  render(<Products />);

  await waitFor(() => {
    const productNames = screen.getAllByRole('heading', { level: 3 });
    expect(productNames[0]).toHaveTextContent('Product B');
    expect(productNames[1]).toHaveTextContent('Product A');
  });

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Title' } });

  const sortedProductNames = screen.getAllByRole('heading', { level: 3 });
  expect(sortedProductNames[0]).toHaveTextContent('Product A');
  expect(sortedProductNames[1]).toHaveTextContent('Product B');
});

test('adds product to cart', async () => {
  fetchMock.mockResponseOnce(JSON.stringify([
    { id: 1, name: 'Product 1', description: 'Description 1', price: 10, image_url: 'image1.jpg' },
  ]));

  render(<Products />);

  await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());

  fireEvent.click(screen.getByText('Product 1'));

  const addToCartButton = screen.getByText('Add to Cart');
  fireEvent.click(addToCartButton);

  // Add assertions to check the cart state if it's exposed or other side effects
  expect(screen.getByText('Added to cart:')).toBeInTheDocument();
});
