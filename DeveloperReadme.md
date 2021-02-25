A DECLARATIVE APPROACH FOR GLOBAL STATE IN A LESS IMPERTAIVE REACT ECOSYSTEM.

## Discussions not worth ?

So, does it any matter that where we initialize the `namespace` we got to be careful that only the components below in that tree will be able to access and call `setState` for that particular `namespace`. So its very intutive that you must initialize the state at the very top component as possible(though it won't hurt you in any way). For e.g., you can set `state` of a namespace at initial mount of a child component in the component tree using simple `useEffect(() => {},[])`, so it just a reminder that initializing the state at the apex of tree would never hurt but is the key to how to manage global state.

#### Changelog:

- Added 1.0.30: Added custom error log for trying to access getwhat withou initialising the namespace first(using usewhat api).

- version 1.0.17 includes good namings for if statements and all readable code alterations for conditions, and if else, separations to simple independent if statements with conditions. Yikes!! Also, includes using testing flag (having_val = true) in production, yikes, and now we can have 0 errors like using useWhat('mykey') will create initialValue as undefined just like react does with useState() i.e., calling with no params.

- version 1.0.19 brings you the facility to specify **setState as dependency** for **useEffect** hook safely (without getting into infinite render loop).
