import React from 'react';
import ValidationWarning from './ValidationWarning';

type MyProps = {
  name: string;
  subject: string;
  valid: boolean;
  options: string[];
  defaultValue: string;
  reference?: React.RefObject<HTMLSelectElement>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  warningMessage: string;
};

export const Select: ({
  name,
  subject,
  valid,
  options,
  defaultValue,
  reference,
  onChange,
  warningMessage,
}: MyProps) => JSX.Element = ({
  name,
  subject,
  valid,
  options,
  defaultValue,
  reference,
  onChange,
  warningMessage,
}: MyProps): JSX.Element => {
  const cls = {
    baseClass: `form-select form-select-lg
      appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none capitalize`,
    validClass: `is-valid`,
    invalidClass: `is-invalid`,
  };

  const className = valid ? `${cls.baseClass}` : `${cls.baseClass} ${cls.invalidClass}`;

  return (
    <>
      <div className="mt-3">
        <select
          defaultValue={defaultValue}
          className={className}
          aria-label=".form-select-lg"
          placeholder={subject}
          name={name}
          onChange={onChange}
          ref={reference}
          data-testid="select"
        >
          <option disabled value="">
            {subject}
          </option>
          {options.map((option: string): JSX.Element => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
      <ValidationWarning valid={valid}>{warningMessage}</ValidationWarning>
    </>
  );
};
