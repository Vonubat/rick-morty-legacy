import React from 'react';
import ValidationWarning from './ValidationWarning';

type MyProps = {
  name: string;
  subject: string;
  valid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reference: React.RefObject<HTMLInputElement>;
  warningMessage: string;
  children: string;
};

export const FileInput: ({
  name,
  subject,
  valid,
  reference,
  onChange,
  warningMessage,
  children,
}: MyProps) => JSX.Element = ({
  name,
  subject,
  valid,
  reference,
  onChange,
  warningMessage,
  children,
}: MyProps): JSX.Element => {
  const cls = {
    baseClass: `form-control
      block
      w-full
      px-3
      py-1.5
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
      <div className="mt-3">
        <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700 text-start">
          {children}
        </label>
        <input
          type="file"
          id="formFile"
          className={className}
          placeholder={subject}
          name={name}
          onChange={onChange}
          ref={reference}
          accept="image/png, image/gif, image/jpeg"
          data-testid="fileInput"
        />
      </div>
      <ValidationWarning valid={valid}>{warningMessage}</ValidationWarning>
    </>
  );
};
