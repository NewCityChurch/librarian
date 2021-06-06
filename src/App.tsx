import React from 'react';
import './App.css';
import { books } from './books';
import logo from './logo.svg';
import { Book } from './types';

const LIMIT = 5;
const START_POINT = {
  BOOK: '彌迦書',
  CHAPTER: 7,
};

const times = (num: number) => Array(num).fill(0);

const concatBooks = (books: Book[]) => {
  return books.reduce((acc: Book[], cur: Book) => {
    return [
      ...acc,
      ...times(cur.chapters).map((_, i) => ({ name: cur.name, chapters: ++i })),
    ];
  }, []);
};

const getStartCharter = (allBooks: Book[]) => {
  return allBooks.findIndex(
    (book: Book) =>
      book.name === START_POINT.BOOK && book.chapters === START_POINT.CHAPTER
  );
};

const formatOutput = (plans) => {
  return plans.map((plan) => {
    var str = Object.keys(plan)
      .map((key) => `${key}: ${plan[key]}`)
      .join(', ');
    console.log(str);
  });
};

function App() {
  const allBooks = concatBooks(books);
  const start = getStartCharter(allBooks);

  const plans = times(6).map((_, i) => {
    const next = allBooks.slice(start + i++ * LIMIT, start + i++ * LIMIT);
    return next.reduce((acc: { [name: string]: string }, cur) => {
      if (!acc[cur.name]) {
        return {
          ...acc,
          [cur.name]: cur.chapters.toString() + '章',
        };
      }

      const hasDash = acc[cur.name].includes('-');
      const separator = hasDash ? '-' : '章';

      return {
        ...acc,
        [cur.name]: `${acc[cur.name].split(separator)[0]}-${cur.chapters}章`,
      };
    }, {});
  });

  plans.forEach((plan) => {
    var str = Object.keys(plan)
      .map((key) => `${key}: ${plan[key]}`)
      .join(', ');
    console.log(str);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
