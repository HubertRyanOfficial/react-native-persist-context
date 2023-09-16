import * as React from 'react';

import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import InformationProvider, {
  useInformation,
} from './contexts/InformationsContext';

function App() {
  const {
    libraryVersion,
    handleInformationLibraryVersion,
    handleClearInformations,
  } = useInformation();

  const handleChangeLibraryVersion = () => {
    handleInformationLibraryVersion('1.0.0');
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleChangeLibraryVersion}>
        <Text style={styles.text}>RN Persist Context - {libraryVersion}</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handleClearInformations}>
        <Text style={styles.text}>Clear</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default function AppWrapper() {
  return (
    <InformationProvider>
      <App />
    </InformationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
});
