<p align="center">
  <img src="https://imgur.com/y31GEJn.jpg" width="600px" title="Whatsapp">
</p>
<br />

# react-native-persist-context

A library to help your context being persisted in your react native apps. The usePersist hook is a useful tool for storing and persisting state data in a React Native application using contexts API. It works similarly to the standard useState in React but offers the additional capability of persisting data, ensuring that it is not lost when the application is closed or restarted.

## Installation

```sh
npm install react-native-persist-context @react-native-async-storage/async-storage
```

## Usage

```js
import usePersist from 'react-native-persist-context'; // Import  the usePersist hook

// ...

const AppContext = createContext({});

export default function AppProvider({ children }) {
  // Using usePersist hook with initial values and persiste key
  const [data, setData, clear] = usePersist('appContext', {
    user: {
      name: 'Hubert Ryan',
      twitter: 'hubertryanoff',
      tapedin: 'hubertryan',
    },
  });

  // Updating user data
  const handleUserData = (newUserData) => {
    setData({
      ...data,
      user: newUserData,
    });
  };

  // clearing all data from user persisted
  const handleClearUserAuthenticated = async () => {
    await clear();
  };

  return (
    <AppContext.Provider
      value={{
        ...data,
        handleUserData,
        handleClearUserAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
```

## Parameters

1. Persistence Key (key): The first thing you need to provide to usePersist is a unique key that will be used to identify the persisted data. The key is used as a unique identifier for the data in local storage. Make sure the key is unique for each set of data you want to persist, remember that after put it and release your app it is not a good idea changing the key.

2. Initial Value (initialValue): This is the initial value of the data you want to persist. It works similarly to the initial state in useState. In the example above, we are setting an object with user information as the initial value forever.

## Return

The `usePersist` hook returns an array with three elements:

1. `data:` This is the current state of the persisted data. Initially, it will be set to the value provided as initialValue.

2. `setData:` A function that allows you to update the persisted data. It works the same way as setState in useState.

3. `clear:` A function that allows you to clear and delete the persisted data associated with the specified key. When called, the data associated with the key will be removed from local storage.

All the return in using destructuring in javascrip we can get the value using square brackets. You can name them as you wish, below is an example with other names and some changes putting an example of a game within the app (If you're used to use useState, you'll do well):

```js
// ...

// New names to all three positions to the game
const [gameData, setGameData, clearGameData] = usePersist('gameContext', {
  level: 0,
  name: '',
  email: '',
});

// Updating user level to persisted data
const handleUserLevel = (level) => {
  setGameData({
    ...gameData,
    level: gameData.level + 1,
  });
};

// ...
```

## Clearing specific context data

Each context persisted with `usePersist`, in the third position we receive a function where we can clear all data persisted in that context and update the general context. A practical example of this is the user, simply calling the clear function.

```js
// Settings page
// ...

import { useApp } from './contexts/AppContext'; // Import useApp from AppContext

function Settings() {
  // Getting handleClearUserAuthenticated from AppContext values added previously.
  const {handleClearUserAuthenticated} = useApp();

  return (
    <View>
        <Button title='Logout' onPress={() => handleClearUserAuthenticated()}>
    </View>
  )
}

```

## Using Typescript

```ts
import React, { createContext, useContext } from 'react';
import usePersist from 'react-native-persist-context'; // Import the usePersist hook

// Define an interface for the user data format
type AppContextProps = {
  name: string;
  twitter: string;
  tapedin: string;
};

type AppContextType = {
  handleClearData: () => void;
} & AppContextProps;

type AppProviderProps = {
  children: ReactNode | ReactNode[];
};

const AppContext = createContext({} as AppContextType);

export default function AppProvider({ children }: AppProviderProps) {
  // Use the usePersist hook with proper typing
  const [userData, setUserData, clearUserData] = usePersist<AppContextProps>(
    'userData',
    {
      name: 'Hubert Ryan',
      twitter: 'hubertryanoff',
      tapedin: 'hubertryan',
    }
  );

  const handleClearData = () => {
    // Clear persisted data
    clearUserData();
  };

  return (
    <AppContext.Provider value={{ ...userData, handleClearData }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
```

In this example, we start by defining an interface UserData that describes the format of user data with fields name, twitter, and tapedin, all typed as strings.

Next, we use the usePersist hook with TypeScript, providing the appropriate typing as <AppContextProps>. This tells TypeScript that userData should follow the structure defined in the UserData interface, ensuring that fields and types are checked at compile time.

The rest of the code is similar to the previous example, where we display user information and provide the ability to clear persisted data when the "Clear Data" button is pressed.

Using TypeScript in this way allows you to take advantage of static type checking to prevent type errors and ensure that your data is used safely and consistently in your React Native application.

`By Hubert Ryan` 😍

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
