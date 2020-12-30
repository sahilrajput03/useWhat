A DECLARATIVE APPROACH FOR GLOBAL STATE IN A LESS IMPERTAIVE REACT ECOSYSTEM.
# `useWhat` - global state management solution

#### Changelog:

- version 1.0.17 includes good namings for if statements and all readable code alterations for conditions, and if else, separations to simple independent if statements with conditions. Yikes!! Also, includes using testing flag (having_val = true) in production, yikes, and now we can have 0 errors like using useWhat('mykey') will create initialValue as undefined just like react does with useState() i.e., calling with no params.

- version 1.0.19 brings you the facility to specify **setState as dependency** for **useEffect** hook safely (without getting into infinite render loop).

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

## Discussions not worth ?

So, does it any matter that where we initialize the `namespace` we got to be careful that only the components below in that tree will be able to access and call `setState` for that particular `namespace`. So its very intutive that you must initialize the state at the very top component as possible(though it won't hurt you in any way). For e.g., you can set `state` of a namespace at initial mount of a child component in the component tree using simple `useEffect(() => {},[])`, so it just a reminder that initializing the state at the apex of tree would never hurt but is the key to how to manage global state.

## Examples

* New feature added for support of making use of localStorage for react(not available for react native for now):

`const [db, setDb] = useWhatPersistent('db', 'one')`

 This will also take care of information if you a kind of person who wants to see older content even after a page reload.

### Example 1

[**Click here to see this example in codesandbox 🔥**](https://codesandbox.io/s/usewhat-example-for-npmjscom-1fopu?file=/src/App.js)

Tip: I have used `initialState`, but you may use `null` as the initial state directly too, so it won't hurt if you don't have the initial state(possibly you'll get it via fetching ☂️).

```js
import React, {useEffect} from 'react';
import './styles.css';
import {useWhat, getWhat} from 'usewhat';

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
  const [home, setHome] = getWhat('home');
  const [kitchen, setKitchen] = getWhat('kitchen');

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
  const [home, _] = getWhat('home');
  const [kitchen, __] = getWhat('kitchen');

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

const incrementHome = () => {
  const [home, setHome] = getWhat('home');
  setHome({rooms: home.rooms + 1});
};

const incrementKitchen = () => {
  const [kitchen, setKitchen] = getWhat('kitchen');
  setKitchen({cups: kitchen.cups + 1});
};

const incrementHomeBy2 = () => {
  const [_, setHome] = getWhat('home');
  setHome((state) => ({
    rooms: state.rooms + 2
  }));
};

const incrementKitchenBy2 = () => {
  const [_, setKitchen] = getWhat('kitchen');
  setKitchen((state) => ({cups: state.cups + 2}));
};
```

### Example 2

[**Click here to see this example in codesandbox 🔥**](https://codesandbox.io/s/usewhat-example2-fetching-npmjscom-nkm6c?file=/src/App.js)

```js
import React, {useEffect} from 'react';
import './styles.css';
import axios from 'axios';
import {useWhat, getWhat} from 'usewhat';

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
  const [github, setGithub] = getWhat('gh');

  return (
    <div>
      <h2>Child Component</h2>
      <pre>{JSON.stringify(github, null, 2)}</pre>
    </div>
  );
};
```
