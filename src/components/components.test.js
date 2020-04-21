import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import RestaurantInfo from './RestaurantInfo';
import ListRestaurant from './list/ListRestaurant';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

function fetchData(callback) {
  setTimeout(() => {
    callback();
  }, 4000);
}

it('can fetch information for a restaurant', (doneCallback) => {
  var x;
  act(() => {
    localStorage.setItem('currRest', '3a1w3Ufs9CCC3GJTAV8EpQ');
    x = render(<RestaurantInfo />, container);
    fetchData(() => {
      expect(x.state.name).toBe('McDonald\'s');
      doneCallback();
    });
  });
});

it('can fetch server restaurant lists', (doneCallback) => {
  var x;
  act(() => {
    x = render(<ListRestaurant />, container);
    fetchData(() => {
      expect(typeof x.state.business_id).toBe('object');
      doneCallback();
    });
  });
});
