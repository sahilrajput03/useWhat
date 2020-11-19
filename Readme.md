# `useWhat` - global state management solution

MOST ASKED QUESTION 😴 :

**Q. What to use for state management in react ?**

> Use `useWhat`, thats all.

**Believe me, nothing can be better than `useWhat` 😎**

## Installation

```bash
yarn add usewhat
# or
npm i usewhat
````

## Examples

[**Below example on codesandbox 🔥**](https://codesandbox.io/s/usewhat-example-for-npmjscom-1fopu?file=/src/App.js)

```js
import React, {useEffect} from 'react';
import './styles.css';
import {useWhat} from 'usewhat';

let log = console.log;

const initialHomeState = {rooms: 10};
const initialKitchenState = {cups: 200};

const Pretty = ({data}) => <pre>{JSON.stringify(data)}</pre>;

export default function App() {
  const [home, setHome] = useWhat('home', initialHomeState);
  const [kitchen, setKitchen] = useWhat('kitchen', initialKitchenState);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>App component</h2>
      <Pretty data={home} />
      <Pretty data={kitchen} />
      <PARENT_COMPONENT />
    </div>
  );
}

const PARENT_COMPONENT = () => {
  const [home, setHome] = useWhat('home');
  const [kitchen, setKitchen] = useWhat('kitchen');

  return (
    <div>
      <hr />
      <h3>Parent Component</h3>
      <Pretty data={home} />
      <Pretty data={kitchen} />
      <button
        onClick={() => {
          setHome({rooms: home.rooms + 1});
        }}
      >
        Increment stateHome
      </button>
      <button
        onClick={() => {
          setKitchen({cups: kitchen.cups + 1});
        }}
      >
        Increment stateKitchen
      </button>
      <br />
      <button
        onClick={() => {
          setHome((state) => ({
            rooms: state.rooms + 2
          }));
        }}
      >
        Increment stateHome by 2
      </button>
      <button
        onClick={() => {
          setKitchen((state) => ({cups: state.cups + 2}));
        }}
      >
        Increment stateKitchen by 2
      </button>
      <hr />
      <CHILD_COMPONENT />
    </div>
  );
};

const CHILD_COMPONENT = () => {
  const [home, setHome] = useWhat('home');
  const [kitchen, setKitchen] = useWhat('kitchen');

  return (
    <div>
      <h4>Child Component</h4>
      <Pretty data={home} />
      <Pretty data={kitchen} />
      <button
        onClick={() => {
          setHome({rooms: home.rooms + 1});
        }}
      >
        Increment stateHome
      </button>
      <button
        onClick={() => {
          setKitchen({cups: kitchen.cups + 1});
        }}
      >
        Increment stateKitchen
      </button>
      <br />
      <button
        onClick={() => {
          setHome((state) => ({
            rooms: state.rooms + 2
          }));
        }}
      >
        Increment stateHome by 2
      </button>
      <button
        onClick={() => {
          setKitchen((state) => ({cups: state.cups + 2}));
        }}
      >
        Increment stateKitchen by 2
      </button>
    </div>
  );
};

```
