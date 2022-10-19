import React from 'react';
import ValidationWarning from './ValidationWarning';

type MyProps = {
  name: string;
  subject: string;
  valid: boolean;
  reference: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  warningMessage: string;
};

export const TextInput: ({
  name,
  subject,
  valid,
  reference,
  onChange,
  warningMessage,
}: MyProps) => JSX.Element = ({
  name,
  subject,
  valid,
  reference,
  onChange,
  warningMessage,
}: MyProps): JSX.Element => {
  const cls = {
    baseClass: `form-control
      block
      w-full
      px-3
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,
    validClass: `is-valid`,
    invalidClass: `is-invalid`,
  };

  const className = valid ? `${cls.baseClass}` : `${cls.baseClass} ${cls.invalidClass}`;

  return (
    <>
      <div className="form-floating mt-3">
        <input
          type="text"
          className={className}
          placeholder={subject}
          name={name}
          onChange={onChange}
          ref={reference}
          data-testid="textInput"
          id={subject}
        />
        <label htmlFor={subject} className="text-gray-700">
          {subject}
        </label>
      </div>
      <ValidationWarning valid={valid}>{warningMessage}</ValidationWarning>
    </>
  );
};
