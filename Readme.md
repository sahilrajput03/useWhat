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
```

## Examples

- New feature added: useWhatPersistent.

With `useWhatPersistent` api, you can have `state` to be stored in `localStorage` as well in app memory and state will get updated in `localStorage` as soon as `state` is updated. So when you close the tab or refresh the tab, state will persists in the app as it was in the app. (Support for `async-storage` in react native will follow up in upcoming version.)

```js
import {useWhatPersistent} from "usewhat";
//...
const App = () => {
  const [db, setDb] = useWhatPersistent("db", "one");
  //..
};
```

### Example 1

[**Click here to see this example in codesandbox 🔥**](https://codesandbox.io/s/usewhat-example-for-npmjscom-1fopu?file=/src/App.js)

Tip: In below example, I have used `initialState` i.e.,

```js
const [home, setHome] = useWhat("home", initialHomeState);
```

, but you may simply use `useWhat` api like

```js
const [home, setHome] = useWhat("home");
```

and that'll set the initial state as `undefined` (this is same ☂️ as using `const [home, setHome] = useState()` in general react).

```js
import React, {useEffect} from "react";
import "./styles.css";
import {useWhat, getWhat} from "usewhat";

let log = console.log;

const initialHomeState = {rooms: 10};
const initialKitchenState = {cups: 200};

const Pretty = ({data}) => <pre>{JSON.stringify(data)}</pre>;

export default function App() {
  const [home, setHome] = useWhat("home", initialHomeState);
  // Initializing `home` namespace with initial data as second parameter.
  const [kitchen, setKitchen] = useWhat("kitchen", initialKitchenState);
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
  const [home, setHome] = getWhat("home");
  const [kitchen, setKitchen] = getWhat("kitchen");

  const incrementHome = () => setHome({rooms: home.rooms + 1});

  const incrementKitchen = () => setKitchen({cups: kitchen.cups + 1});

  const incrementHomeBy2 = () =>
    setHome((state) => ({
      rooms: state.rooms + 2,
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
  const [home, _] = getWhat("home");
  const [kitchen, __] = getWhat("kitchen");

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
  const [home, setHome] = getWhat("home");
  setHome({rooms: home.rooms + 1});
};

const incrementKitchen = () => {
  const [kitchen, setKitchen] = getWhat("kitchen");
  setKitchen({cups: kitchen.cups + 1});
};

const incrementHomeBy2 = () => {
  const [_, setHome] = getWhat("home");
  setHome((state) => ({
    rooms: state.rooms + 2,
  }));
};

const incrementKitchenBy2 = () => {
  const [_, setKitchen] = getWhat("kitchen");
  setKitchen((state) => ({cups: state.cups + 2}));
};
```

### Example 2

[**Click here to see this example in codesandbox 🔥**](https://codesandbox.io/s/usewhat-example2-fetching-npmjscom-nkm6c?file=/src/App.js)

```js
import React, {useEffect} from "react";
import "./styles.css";
import axios from "axios";
import {useWhat, getWhat} from "usewhat";

let log = console.log;

export default function App() {
  const [github, setGithub] = useWhat("gh");
  // Initial state of `gh` namespace is set as `undefined` in this case.
  useEffect(() => {
    axios
      .get("https://api.github.com")
      .then((res) => setGithub(res.data))
      .catch((e) => log("#got error#", e));
  }, [setGithub]);

  return (
    <div className="App">
      <ChildComponent />
    </div>
  );
}

const ChildComponent = () => {
  const [github, setGithub] = getWhat("gh");

  return (
    <div>
      <h2>Child Component</h2>
      <pre>{JSON.stringify(github, null, 2)}</pre>
    </div>
  );
};
```

### Example 3 - What not to do with useWhat? This is exactly what it is.

[**(Beware this is about what not to do with `useWhat`) Click here to see this example in codesandbox 🔥**](https://codesandbox.io/s/usewhat-bad-usagenpm-page-exapmle3-f7khu?file=/src/App.js)

```js
import React from "react";
import "./styles.css";
import {useWhat, getWhat} from "usewhat";

export default function App() {
  const [name, setName] = getWhat("person_name"); //initial state = undefined.
  // *LEARN: Bad usage of `usewhat`, you must only intialise state
  //  using `useWhat` api and use `getWhat` api in nested components in
  // such component tree.
  return (
    <div className="App">
      state: {name ?? "undefined"}
      <br />
      <button
        onClick={() => {
          setName("tom");
        }}
      >
        Set name as "tom"
      </button>
      <br />
      <ChildComponent />
    </div>
  );
}

const ChildComponent = () => {
  const [name, setName] = useWhat("person_name", "jerry");
  return (
    <button
      onClick={() => {
        setName("jerry");
      }}
    >
      Set name as 'jerry'
    </button>
  );
};
```

### Example 4 (Correcting example 3)

[**(This is correct version of Example 3) Click here to see this example in codesandbox 🔥**](https://codesandbox.io/s/usewhat-bad-usage-fixed-npm-page-exapmle4-x26de?file=/src/App.js:0-921)

```js
import React, {useEffect, useRef} from "react";
import "./styles.css";
import {useWhat, getWhat, log} from "usewhat";

export default function App() {
  const [name, setName] = useWhat("person_name"); //initial state = undefined.
  // *LEARN: Correct way of using useWhat.
  return (
    <div className="App">
      state: {name ?? "undefined"}
      <br />
      <button
        onClick={() => {
          setName("tom");
        }}
      >
        Set name as "tom"
      </button>
      <br />
      <ChildComponent />
    </div>
  );
}

const ChildComponent = () => {
  const [name, setName] = getWhat("person_name");

  useEffect(() => {
    setName("jerry");
    // *LEARN: Correct way initializing state in a child component.
  }, [setName]);

  return (
    <button
      onClick={() => {
        setName("jerry");
      }}
    >
      Set name as 'jerry'
    </button>
  );
};
```

### Bad usage of useWhat

[**Click here to see this example in codesandbox 🔥**](https://codesandbox.io/s/example-4-usewhat-npmjs-package-readme-lpt9y?file=/src/App.js:83-126)

```js
import React from "react";
import {useWhat} from "usewhat";
// THIS IS AN ANTIPATTERN CASE FOR USEWHAT
// You should note that count namespace is initialized twice
// as Child component App compoment and its a antipatter to
// usage of useWhat.

// SOLUTION: You should host `count` namespace in
// App component using `useWhat('count', 1)` and utilise `count` in
// nested components using getWhat api.

function App() {
  return (
    <div>
      <Child />
      <Child />
    </div>
  );
}

const Child = () => {
  const [count, setCount] = useWhat("count", 1);

  return (
    <button
      onClick={() => {
        setCount(count + 1);
      }}
    >
      {count}
    </button>
  );
};

export default App;
```

Thanks, for being here.
