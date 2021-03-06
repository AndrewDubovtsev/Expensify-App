import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0,
  } = {},
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// REMOVE_EXPENSE
// eslint-disable-next-line no-unused-vars
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

// EDIT_EXPENSE
// eslint-disable-next-line no-unused-vars
const editExpense = (id = '', updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

// SET_TEXT_FILTER
// eslint-disable-next-line no-unused-vars
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});

// SORT_BY_DATE
// eslint-disable-next-line no-unused-vars
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
  sortBy: 'date',
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
  sortBy: 'amount',
});

// SET_START_DATE
// eslint-disable-next-line no-unused-vars
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate,
});

// SET_END_DATE
// eslint-disable-next-line no-unused-vars
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate,
});

// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => (expense.id === action.id
        ? { ...expense, ...action.updates }
        : expense));
    default:
      return state;
  }
};

// Filters Reducer
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text };
    case 'SORT_BY_AMOUNT':
    case 'SORT_BY_DATE':
      return { ...state, sortBy: action.sortBy };
    case 'SET_START_DATE':
      return { ...state, startDate: action.startDate };
    case 'SET_END_DATE':
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
};

// Get visible expenses
const getVisibleExpenses = (expenses, {
  text, sortBy, startDate, endDate,
}) => expenses.filter((expense) => {
  const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
  const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
  const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

  return startDateMatch && endDateMatch && textMatch;
}).sort((a, b) => {
  if (sortBy === 'date') {
    return a.createdAt < b.createdAt ? 1 : -1;
  }
  if (sortBy === 'amount') {
    return a.amount > b.amount ? -1 : 1;
  }
  return 0;
});

// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  }),
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

// eslint-disable-next-line no-unused-vars
const expenseOne = store.dispatch(
  addExpense({ description: 'Coffee', amount: 100, createdAt: -1000 }),
);

// eslint-disable-next-line no-unused-vars
const expenseTwo = store.dispatch(
  addExpense({ description: 'Rent', amount: 300, createdAt: -2000 }),
);
//
// store.dispatch(
//     removeExpense({ id: expenseOne.expense.id })
// );
//
// store.dispatch(
//     editExpense(expenseTwo.expense.id, { amount: 500 })
// );
//
// store.dispatch(
//     setTextFilter('rent')
// );
//
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
//
// store.dispatch(setEndDate());
// store.dispatch(setEndDate(1250));

// eslint-disable-next-line no-unused-vars
const demoState = {
  expenses: [{
    id: 'dfsd',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0,
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined,
  },
};
