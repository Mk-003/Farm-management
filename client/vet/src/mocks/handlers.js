import { rest } from 'msw';

export const handlers = [
  rest.post('/products', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ message: 'Product created' }));
  }),
  rest.post('/services', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ message: 'Service created' }));
  }),
  rest.patch('/products/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Product updated' }));
  }),
  rest.patch('/services/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Service updated' }));
  }),
  rest.delete('/products/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Product deleted' }));
  }),
  rest.delete('/services/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Service deleted' }));
  }),
];
