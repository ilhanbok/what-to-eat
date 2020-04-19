import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import RestaurantInfo from './RestaurantInfo';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can fetch information for a restaurant', () => {
  localStorage.setItem('currRest', '3a1w3Ufs9CCC3GJTAV8EpQ');
  act(() => {
    render(<RestaurantInfo />, container);
  });
  expect(container.state().name).toBe('McDonalds');
});
