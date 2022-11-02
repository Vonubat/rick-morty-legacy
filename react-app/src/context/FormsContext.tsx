import { IUserCharacter } from 'types/models';
import React, { createContext, useContext, useState } from 'react';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';

interface IFormsContextState {
  userCards: IUserCharacter[];
}

interface IFormsContextUpdater {
  setUserCards: React.Dispatch<React.SetStateAction<IUserCharacter[]>>;
  form: UseFormReturn<FieldValues, unknown>;
}

interface MyProps {
  children?: React.ReactNode;
}

const FormsContextState: React.Context<IFormsContextState | undefined> = createContext<
  IFormsContextState | undefined
>(undefined);

const FormsContextUpdater: React.Context<IFormsContextUpdater | undefined> = createContext<
  IFormsContextUpdater | undefined
>(undefined);

export const FormsContextProvider: ({ children }: MyProps) => JSX.Element = ({
  children,
}: MyProps): JSX.Element => {
  const [userCards, setUserCards] = useState<IUserCharacter[]>([]);
  const form: UseFormReturn<FieldValues, unknown> = useForm();

  return (
    <FormsContextState.Provider value={{ userCards }}>
      <FormsContextUpdater.Provider value={{ setUserCards, form }}>
        {children}
      </FormsContextUpdater.Provider>
    </FormsContextState.Provider>
  );
};

export const useFormsContextState: () => IFormsContextState = (): IFormsContextState => {
  // get the context
  const context: IFormsContextState | undefined = useContext(FormsContextState);
  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('useFormsContextState was used outside of its Provider');
  }
  return context;
};

export const useFormsContextUpdater: () => IFormsContextUpdater = (): IFormsContextUpdater => {
  // get the context
  const context: IFormsContextUpdater | undefined = useContext(FormsContextUpdater);
  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('useFormsContextUpdater was used outside of its Provider');
  }
  return context;
};
