import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-dates/initialize';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './firebase/firebase';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();
store.dispatch(
  addExpense({
    description: 'Water bill',
    amount: 4500,
    createdAt: 0,
  }),
);
store.dispatch(
  addExpense({
    description: 'Gas bill',
    amount: 1000,
    createdAt: 1000,
  }),
);
store.dispatch(
  addExpense({
    description: 'Rent',
    amount: 109500,
    createdAt: 0,
  }),
);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById('app'));
