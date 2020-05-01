import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { act } from 'react-dom/test-utils';

import App from '../App';
import config from '../config';
import index from '../index';

import Initial from './Initial';
import RestaurantInfo from './RestaurantInfo';
import ChangePassword from './Profile';
import Favorite from './Favorite';
import Home from './Home';
import ListRestaurant from './list/ListRestaurant';
import LoaderButton from './signup/LoaderButton.js';

import Title from './layout/Title.js';

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
  }, 5000);
}

// Mock all the libraries

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  })
}));

const email = '';
const password = '';

jest.mock('aws-amplify', () => ({
  ...jest.requireActual('aws-amplify'),
  Auth: {
		signIn: (email, password) => {
		  return new Promise(function(resolve, reject) {
		    // do nothing
		  });
		},
		currentAuthenticatedUser: () => {
		  console.log('AAA');
		  return new Promise(function(resolve, reject) {
		    return true
		  });
		}
  } 
}));

// Run the tests

it('has a valid constants file', () => {
  const CONFIG = require('../config');
  expect(CONFIG).toBeDefined();
});

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

it('can render title bar', () => {
  localStorage.setItem('userEmail', 'admin@example.com');
  act(() => {
    ReactDOM.render(<Title />, container);
    expect(true).toBe(true);
  });
});

it('can click favorites page link', (doneCallback) => {
  global.window = Object.create(window);
  const url = "http://localhost:3000/";
  Object.defineProperty(window, "location", {
    value: {
       href: url,
       replace: function () {}
    },
    writable: true
  });
  localStorage.setItem('userEmail', 'admin@example.com');
  act(() => {
    ReactDOM.render(<Title />, container);
  });
  const favorite_icon = container.querySelector('.fa-star');
  act(() => {
    favorite_icon.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  fetchData(() => {
    expect(global.window.location.href).toBe('http://localhost:3000/favorite');
    doneCallback();
  });
});

it('can redirect from favorites page', (doneCallback) => {
  global.window = Object.create(window);
  const url = "http://localhost:3000/";
  Object.defineProperty(window, "location", {
    value: {
       href: url,
       replace: function () {}
    },
    writable: true
  });
  global.window.confirm = jest.fn(() => true)
  localStorage.setItem('userEmail', '');
  act(() => {
    ReactDOM.render(<Title />, container);
  });
  const favorite_icon = container.querySelector('.fa-star');
  act(() => {
    favorite_icon.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  fetchData(() => {
    expect(global.window.location.href).toBe('http://localhost:3000/login');
    doneCallback();
  });
});

it('can click profile page link', (doneCallback) => {
  global.window = Object.create(window);
  const url = "http://localhost:3000/";
  Object.defineProperty(window, "location", {
    value: {
       href: url,
       replace: function () {}
    },
    writable: true
  });
  localStorage.setItem('userEmail', 'test@te.st');
  act(() => {
    ReactDOM.render(<Title />, container);
  });
  const favorite_icon = container.querySelector('.fa-user-circle');
  act(() => {
    favorite_icon.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  fetchData(() => {
    expect(global.window.location.href).toBe('http://localhost:3000/Profile');
    doneCallback();
  });
});

it('can redirect from profile page', (doneCallback) => {
  global.window = Object.create(window);
  const url = "http://localhost:3000/";
  Object.defineProperty(window, "location", {
    value: {
       href: url,
       replace: function () {}
    },
    writable: true
  });
  global.window.confirm = jest.fn(() => true)
  localStorage.setItem('userEmail', '');
  act(() => {
    ReactDOM.render(<Title />, container);
  });
  const favorite_icon = container.querySelector('.fa-user-circle');
  act(() => {
    favorite_icon.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  fetchData(() => {
    expect(global.window.location.href).toBe('http://localhost:3000/login');
    doneCallback();
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

// Defunct test. Do not uncomment or use.
/*
it('can render profile page', (doneCallback) => {
  var x;
  act(() => {
    localStorage.setItem('userEmail', 'admin@example.com');
    ChangePassword();
    fetchData(() => {
      expect(true).toBe(true);
      doneCallback();
    });
  });
});*/

it('can render favorites page', (doneCallback) => {
  var x;
  act(() => {
    localStorage.setItem('userEmail', 'admin@example.com');
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

/*it('calls event handler; "handleSubmit"', async()  => {   
    //const componentInstance = Wrapper.dive().instance();
    const mockUser = {
        userEmail : "admin@example.com",
        userpassword : "12345678"
    }
    act(()=>{
      Auth.signIn = jest.fn().mockImplementation(
     (mockUser) => {
     // return whatever you want to test
     Promise.resolve(mockUser)
     const mockSuccessCb = (user) => {
            expect(user).toBe(mockUser);
            done();
        };
     const mockErrorCb = (err) => {
            // fail the test if this callback is invoked.
            done(err);
        };
     return 
    });

    });
    
    //componentInstance.setState()
    // const event = {
    //     preventDefault : () => {}
    // };
    
    //await componentInstance.handleSubmit(event);
    //expect(componentInstance.state.isLoading).toEqual(true); 
});
*/
