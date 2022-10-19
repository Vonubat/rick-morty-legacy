import React from 'react';
import ValidationWarning from './ValidationWarning';

type MyProps = {
  name: string;
  valid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reference: React.RefObject<HTMLInputElement>;
  warningMessage: string;
};

export const DateInput: ({
  name,
  valid,
  onChange,
  reference,
  warningMessage,
}: MyProps) => JSX.Element = ({
  name,
  valid,
  onChange,
  reference,
  warningMessage,
}: MyProps): JSX.Element => {
  const cls = {
    baseClass: `form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,
    isValid: `is-valid`,
    isInvalid: `is-invalid`,
  };

  const className = valid ? `${cls.baseClass}` : `${cls.baseClass} ${cls.isInvalid}`;

  return (
    <>
      <div className="datepicker relative form-floating mt-3">
        <input
          type="date"
          className={className}
          placeholder="Select a date"
          name={name}
          onChange={onChange}
          ref={reference}
          data-testid="dateInput"
          id="dateInput"
        />
        <label htmlFor="dateInput" className="text-gray-700">
          Select a date
        </label>
      </div>
      <ValidationWarning valid={valid}>{warningMessage}</ValidationWarning>
    </>
  );
};
