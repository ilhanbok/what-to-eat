import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { act } from 'react-dom/test-utils';

import App from '../App';
import config from '../config';
import index from '../index';

import Initial from './Initial';
import RestaurantInfo from './RestaurantInfo';
import Profile from './Profile';
import Favorite from './Favorite';
import Home from './Home';
import ListRestaurant from './list/ListRestaurant';
import LoaderButton from './signup/LoaderButton.js';

import ErrorMessage from './login/ErrorMessage';

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

/*it('can render login error message', (doneCallback) => {
  var x;
  act(() => {
    x = render(ErrorMessage('test'), container);
    fetchData(() => {
      console.log(x);
      expect(ReactDOM.findDOMNode(x).getElementsByClassName('error-message')[0].innerHTML).toBe('test');
      doneCallback();
    });
  });
});*/



it('renders app without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<config />, div);
});

it('renders index without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<index />, div);
});

it('can properly call initial function', () => {
  act(() => {
    Initial();
    expect(true).toBe(true);
  });
});

it('can properly call loaderButton function', () => {
  act(() => {
    LoaderButton(false);
    expect(true).toBe(true);
  });
});

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

it('can render profile page', () => {
  var x;
  act(() => {
    localStorage.setItem('userEmail', 'test@te.st');
    x = render(<Profile />, container);
    expect(x.state.username).toBe('test@te.st');
  });
});

it('can render favorites page', (doneCallback) => {
  var x;
  act(() => {
    localStorage.setItem('userEmail', 'test@te.st');
    x = render(<Favorite />, container);
    fetchData(() => {
      expect(Array.isArray(x.state.favorites)).toBe(true);
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

it('can properly access and use home page', (doneCallback) => {
  var x;
  act(() => {
    x = render(<Home />, container);
    document.getElementById('textTerm').value = 'edible computer';
    const button = document.getElementsByClassName('btn search-btn')[0];
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    fetchData(() => {
      expect(x.state.value).toBe('edible computer');
      doneCallback();
    });
  });
});

