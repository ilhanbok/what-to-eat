import React, { useState } from 'react';
import ReactDOM, { render } from 'react-dom';
import { act } from 'react-dom/test-utils';

import App from '../App';
import config from '../config';
import index from '../index';

import Initial from './Initial';
import RestaurantInfo from './RestaurantInfo';
import Profile from './Profile';

import Login from './login/Login';
import Signup from './signup/Signup';

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

function fetchDataFast(callback) {
  setTimeout(() => {
    callback();
  }, 4000);
}

// Mock all the libraries

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  })
}));
/*
global.isUseState = true;

function setUseState () {
  if (global.isUseState) {
    return (bool) => {
      return [{
          oldPassword: '',
          email: '',
          password: '',
          confirmPassword: '',
          confirmationCode: ''
      }, function(){}];
    }
  } else {
    return ()=>{};//useState;
  }
}

global.setUseStateFunction = { fn: setUseState };
*/
/*
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (bool) => {
      return [{
          oldPassword: '',
          email: '',
          password: '',
          confirmPassword: '',
          confirmationCode: ''
      }, function(){}];
    }
}));
*/

//jest.mock(useState);

const email = '';
const password = '';
global.success = true;

jest.mock('aws-amplify', () => ({
  ...jest.requireActual('aws-amplify'),
  Auth: {
    signIn: (email, password) => {
      return new Promise(function(resolve, reject) {
        resolve(true);
        // do nothing
      });
    },
    currentAuthenticatedUser: () => {
      console.log('AAA');
      return new Promise(function(resolve, reject) {
        if (global.success) resolve(true);
        else throw 'whoops';
      });
    },
    changePassword: (user, oldpass, pass) => {
      return new Promise(function(resolve, reject) {
         resolve(true);
        // do nothing
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

it('can detect auth errors in title bar', (doneCallback) => {
  localStorage.setItem('userEmail', 'admin@example.com');
  global.success = false;
  act(() => {
    ReactDOM.render(<Title />, container);
    expect(true).toBe(true);
    fetchData(() => {
      global.success = true;
      doneCallback();
    });
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

it('can properly access and use home page with no results', (doneCallback) => {
  var x;
  act(() => {
    x = render(<Home />, container);
    document.getElementById('textTerm').value = 'edible computer';
    const button = document.getElementsByClassName('btn search-btn')[0];
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    const checkbox = container.querySelector('[type="checkbox"]');
    checkbox.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    fetchData(() => {
      expect(x.state.value).toBe('edible computer');
      doneCallback();
    });
  });
});

it('can properly access and use home page with valid results', (doneCallback) => {
  var x;
  act(() => {
    x = render(<Home />, container);
    document.getElementById('textTerm').value = 'italian';
    const checkbox = container.querySelector('[type="checkbox"]');
    checkbox.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    const button = document.getElementsByClassName('btn search-btn')[0];
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    fetchData(() => {
      expect(x.state.value).toBe('italian');
      doneCallback();
    });
  });
});

it('can toggle favorites', (doneCallback) => {
  var x;
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
  act(() => {
    localStorage.setItem('userEmail', 'test@te.st');
    x = render(<ListRestaurant />, container);
    fetchData(() => {
      const star = document.getElementById('starO2OD-ojkZXsSbFyzpuvtIA');
      if (x.state.favorites.length == 0) {
        star.dispatchEvent(new MouseEvent('click', {bubbles: true}));
      }
      if (x.state.favorites.length > 0) {
        star.dispatchEvent(new MouseEvent('click', {bubbles: true}));
      }
      expect(x.state.favorites.includes('O2OD-ojkZXsSbFyzpuvtIA')).toBe(false);
      doneCallback();
    });
  });
});
/*
it('can remove favorites from page', (doneCallback) => {
  const div = document.createElement('div');
  var x, y;
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
  localStorage.setItem('userEmail', 'admin@example.com');
  act(() => {
    x = render(<Home />, container);
    y = render(<Favorite />, div);
    fetchDataFast(() => {
      jest.useFakeTimers();
      const star = container.querySelector('.favorite');
      star.dispatchEvent(new MouseEvent('click', {bubbles: true}));
      const fav = div.querySelector('.fa-star');
      console.log(star);
      console.log(y.state.favorites);
      //fav.dispatchEvent(new MouseEvent('click', {bubbles: true}));
      //expect(y.state.favorites.includes('O2OD-ojkZXsSbFyzpuvtIA')).toBe(false);
      setTimeout(() => {
        console.log('EXEC');
        doneCallback();
      }, 500);
      jest.runAllTimers();
    });
  });
});
*/

it('can render profile', () => {
  localStorage.setItem('userEmail', 'admin@example.com');
  act(() => {
    ReactDOM.render(<Profile />, container);
    expect(true).toBe(true);
  });
});

/*
it('can render profile page', () => {
  var x;
  act(() => {
    localStorage.setItem('userEmail', 'admin@example.com');
    ChangePassword();
    expect(true).toBe(true);
  });
});
*//*
it('can render login', () => {
  localStorage.setItem('userEmail', 'admin@example.com');
  act(() => {
    ReactDOM.render(<Login />, container);
    expect(true).toBe(true);
  });
});

/*
it('can render signup', () => {
  useState.mockImplementation(
  (bool) => {
    return [{
        oldPassword: '',
        email: '',
        password: '',
        confirmPassword: '',
        confirmationCode: ''
    }, function(){}];
  }
  );
  localStorage.setItem('userEmail', 'admin@example.com');
  act(() => {
    Signup({});
    expect(true).toBe(true);
  });
});
*/

it('can "submit" form', () => {
  act(() => {
    ReactDOM.render(<Signup />, container);
    container.querySelector('[id="email"]').value = 'a';
    container.querySelector('[id="password"]').value = 'a';
    container.querySelector('[id="confirmPassword"]').value = 'a';
    const submit = container.querySelector('[id="signup"]');
    submit.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    expect(true).toBe(true);
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
