import React from 'react';
import ValidationWarning from './ValidationWarning';

type MyProps = {
  name: string;
  valid: boolean;
  children: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reference: React.RefObject<HTMLInputElement>;
  warningMessage: string;
};

export const Checkbox: ({
  name,
  valid,
  children,
  onChange,
  reference,
  warningMessage,
}: MyProps) => JSX.Element = ({
  name,
  valid,
  children,
  onChange,
  reference,
  warningMessage,
}: MyProps): JSX.Element => {
  const className = `form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`;

  return (
    <>
      <div className="form-check flex flex-nowrap mt-3">
        <input
          className={className}
          type="checkbox"
          value=""
          name={name}
          onChange={onChange}
          ref={reference}
          data-testid="checkbox"
          id="checkbox"
        />
        <label className="form-check-label inline-block text-gray-800" htmlFor="checkbox">
          {children}
        </label>
      </div>
      <ValidationWarning valid={valid}>{warningMessage}</ValidationWarning>
    </>
  );
};
