import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your actual API URL

test('creates a new product', async () => {
  const response = await axios.post(`${API_URL}/products`, { name: 'New Product' });
  expect(response.status).toBe(201);
  expect(response.data.message).toBe('Product created');
});

test('creates a new service', async () => {
  const response = await axios.post(`${API_URL}/services`, { name: 'New Service' });
  expect(response.status).toBe(201);
  expect(response.data.message).toBe('Service created');
});

test('updates an existing product', async () => {
  const response = await axios.patch(`${API_URL}/products/1`, { name: 'Updated Product' });
  expect(response.status).toBe(200);
  expect(response.data.message).toBe('Product updated');
});

test('updates an existing service', async () => {
  const response = await axios.patch(`${API_URL}/services/1`, { name: 'Updated Service' });
  expect(response.status).toBe(200);
  expect(response.data.message).toBe('Service updated');
});

test('deletes a product', async () => {
  const response = await axios.delete(`${API_URL}/products/1`);
  expect(response.status).toBe(200);
  expect(response.data.message).toBe('Product deleted');
});

test('deletes a service', async () => {
  const response = await axios.delete(`${API_URL}/services/1`);
  expect(response.status).toBe(200);
  expect(response.data.message).toBe('Service deleted');
});
