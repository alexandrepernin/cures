import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Nav from './Nav';
import {LOGIN, SIGNUP} from "../utils";

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});



it('peut afficher les formulaires de sign in / signup au bon moment', () => {
  // Teste le premier affichage et l'appel à componentDidMount
  act(() => {
    ReactDOM.render(<Nav displayed_form={LOGIN}/>, container);
  });
  let signup_link = document.querySelector("[data-testid=signup]");
  expect(signup_link.innerHTML).toBe('Create one');

  act(() => {
    ReactDOM.render(<Nav displayed_form={SIGNUP}/>, container);
  });
  let signin_link = document.querySelector("[data-testid=signin]");
  expect(signin_link.innerHTML).toBe('Sign In');

  act(() => {
    ReactDOM.render(<Nav logged_in={true}/>, container);
  });
  let cure_link = document.querySelector("[data-testid=cure]");
  expect(cure_link.innerHTML).toBe('Find some cures!');


});
