import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

import usePersist from 'react-native-persist-context';

type InformationContextProps = {
  libraryVersion: string;
};

type InformationContextType = {
  libraryVersion: string;
  handleInformationLibraryVersion: (value: string) => void;
  handleClearInformations: () => Promise<void>;
} & InformationContextProps;

type InformationProviderProps = {
  children: ReactNode | ReactNode[];
};

const InfortmationContext = createContext({} as InformationContextType);

export default function InformationProvider({
  children,
}: InformationProviderProps) {
  const [data, setData, clear] = usePersist<InformationContextProps>(
    'information',
    {
      libraryVersion: '0.0.0',
    }
  );

  const handleInformationLibraryVersion = (version: string) => {
    setData({
      ...data,
      libraryVersion: version,
    });
  };

  const handleClearInformations = async () => {
    const newData = await clear();
    console.log(newData);
  };

  return (
    <InfortmationContext.Provider
      value={{
        ...data,
        handleInformationLibraryVersion,
        handleClearInformations,
      }}
    >
      {children}
    </InfortmationContext.Provider>
  );
}

export const useInformation = () => useContext(InfortmationContext);
