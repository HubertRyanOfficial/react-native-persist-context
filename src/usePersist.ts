import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function usePersist<T>(
  key: string,
  initialState: T
): [
  value: T,
  setNewValue: (newValue: T) => void,
  clearValue: () => Promise<T>
] {
  const originalKey = `rn-persisted-context-data-${key}`;

  const [value, setValue] = useState(initialState);

  const getPersistedData = useCallback(async () => {
    const persistedData = await AsyncStorage.getItem(originalKey);

    if (persistedData) {
      const result = JSON.parse(persistedData);
      setValue(result);
    }
  }, [originalKey]);

  const setNewValue = useCallback(
    (newValue: T) => {
      if (newValue) {
        const stringifiedData = JSON.stringify(newValue);
        AsyncStorage.setItem(originalKey, stringifiedData);
        setValue(newValue);
      }
    },
    [originalKey]
  );

  const clearAllPersistData = useCallback(async () => {
    setValue(initialState);
    await AsyncStorage.removeItem(originalKey);
    return initialState;
  }, [originalKey, initialState]);

  useEffect(() => {
    getPersistedData();
  }, [getPersistedData]);

  return [value, setNewValue, clearAllPersistData];
}
