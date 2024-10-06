// Good to know:extend-expect was removed in v6.0, so if you are using @testing-library/jest-dom before version 6, you will need to import
// @testing-library/jest-dom/extend-expect instead.

import '@testing-library/jest-dom';

// If you are using fetch Api in your code, you need to import it in your test file.
// import 'whatwg-fetch';

// src/setupTests.js
import { server } from './mocks/server';
// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
