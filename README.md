![React native persist context library](https://imgur.com/y31GEJn.jpg)
<br />
<br />

# react-native-persist-context

A library to help your context being persisted in your react native apps

## Installation

```sh
npm install react-native-persist-context @react-native-async-storage/async-storage
```

## Usage

```js
import usePersist from 'react-native-persist-context';

// ...

const AppContext = createContext({} as InformationContextType);

export default function AppProvider({children}) {
    const [data, setData, clear] = usePersist(
        'userData',
        {
            user: {
                name: 'Hubert Ryan',
                twitter: 'hubertryanoff',
                tapedin: 'hubertryan'
            }
        }
    );

    const handleUserData = (newUserData) => {
        setData({
            ...data,
            user: newUserData
        });
    };

    return (
        <AppContext.Provider
            value={{
                ...data,
                handleUserData
            }}
        >
            {children}
        </AppContext.Provider>
  );
}

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
