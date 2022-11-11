import { IFormsContextState } from 'types/models';
import React, { createContext, useContext } from 'react';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';

const FormsContextState: React.Context<IFormsContextState | undefined> = createContext<
  IFormsContextState | undefined
>(undefined);

interface MyProps {
  children?: React.ReactNode;
}

export const FormsContextProvider: ({ children }: MyProps) => JSX.Element = ({
  children,
}: MyProps): JSX.Element => {
  const formsPageForm: UseFormReturn<FieldValues, unknown> = useForm();
  const searchBarForm: UseFormReturn<FieldValues, unknown> = useForm();

  return (
    <FormsContextState.Provider value={{ formsPageForm, searchBarForm }}>
      {children}
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
