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

### Example 1

[**Below example on codesandbox 🔥**](https://codesandbox.io/s/usewhat-example-for-npmjscom-1fopu?file=/src/App.js)

Tip: I have used `initialState`, but you may use `null` as the initial state directly too, so it won't hurt if you don't have the initial state(possibly you'll get it via fetching ☂️).

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
    // Initializing `home` namespace with initial data as second parameter.
  const [kitchen, setKitchen] = useWhat('kitchen', initialKitchenState);
    // Initializing `kitchen` namespace with initial data as second parameter.

  return (
    <div className="App">
      <h2>App component</h2>
      <Pretty data={home} />
      <Pretty data={kitchen} />
      <PARENT_COMPONENT />
    </div>
  );
}

const PARENT_COMPONENT = () => {
  // Accessing earlier initialized namespaces i.e., `home` and `kitchen` in `App` component.
  const [home, setHome] = useWhat('home');
  const [kitchen, setKitchen] = useWhat('kitchen');

  const incrementHome = () => setHome({rooms: home.rooms + 1});

  const incrementKitchen = () => setKitchen({cups: kitchen.cups + 1});

  const incrementHomeBy2 = () =>
    setHome((state) => ({
      rooms: state.rooms + 2
    }));

  const incrementKitchenBy2 = () =>
    setKitchen((state) => ({cups: state.cups + 2}));

  return (
    <div>
      <hr />
      <h3>Parent Component</h3>
      <Pretty data={home} />
      <Pretty data={kitchen} />
      <button onClick={incrementHome}>Increment stateHome</button>
      <button onClick={incrementKitchen}>Increment stateKitchen</button>
      <br />
      <button onClick={incrementHomeBy2}>Increment stateHome by 2</button>
      <button onClick={incrementKitchenBy2}>Increment stateKitchen by 2</button>
      <hr />
      <CHILD_COMPONENT />
    </div>
  );
};

const CHILD_COMPONENT = () => {
  // Accessing earlier initialized namespaces i.e., `home` and `kitchen` in `App` component.
  const [home, setHome] = useWhat('home');
  const [kitchen, setKitchen] = useWhat('kitchen');

  const incrementHome = () => setHome({rooms: home.rooms + 1});

  const incrementKitchen = () => setKitchen({cups: kitchen.cups + 1});

  const incrementHomeBy2 = () =>
    setHome((state) => ({
      rooms: state.rooms + 2
    }));

  const incrementKitchenBy2 = () =>
    setKitchen((state) => ({cups: state.cups + 2}));

  return (
    <div>
      <h4>Child Component</h4>
      <Pretty data={home} />
      <Pretty data={kitchen} />
      <button onClick={incrementHome}>Increment stateHome</button>
      <button onClick={incrementKitchen}>Increment stateKitchen</button>
      <br />
      <button onClick={incrementHomeBy2}>Increment stateHome by 2</button>
      <button onClick={incrementKitchenBy2}>Increment stateKitchen by 2</button>
    </div>
  );
};

```

### Example 2

[**Below example on codesandbox 🔥**](https://codesandbox.io/s/usewhat-example2-fetching-npmjscom-nkm6c?file=/src/App.js)

```
import React, {useEffect} from 'react';
import './styles.css';
import axios from 'axios';
import {useWhat} from 'usewhat';

let log = console.log;

export default function App() {
  const [github, setGithub] = useWhat('gh', null);

  useEffect(() => {
    axios
      .get('https://api.github.com')
      .then((res) => setGithub(res.data))
      .catch((e) => log('#got error#', e));
  }, [setGithub]);

  return (
    <div className="App">
      <ChildComponent />
    </div>
  );
}

const ChildComponent = () => {
  const [github, setGithub] = useWhat('gh');

  return (
    <div>
      <h2>Child Component</h2>
      <pre>{JSON.stringify(github, null, 2)}</pre>
    </div>
  );
};

```