import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import warningMessages from 'utils/warning-messages';
import { ValidationWarning } from './ValidationWarning';

type MyProps = {
  form: UseFormReturn<FieldValues, unknown>;
  subject: string;
  options: string[];
  defaultValue: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select: ({
  form,
  subject,
  options,
  defaultValue,
  onChange,
}: MyProps) => JSX.Element = ({
  form,
  subject,
  options,
  defaultValue,
  onChange,
}: MyProps): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = form;

  const name: string = subject.toLowerCase();

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

  const className: string = errors[name]
    ? `${cls.baseClass} ${cls.invalidClass}`
    : `${cls.baseClass}`;

  return (
    <>
      <div className="mt-3">
        <select
          {...register(name, {
            required: warningMessages[name]?.emptyInput || '',
            onChange: onChange,
          })}
          defaultValue={defaultValue}
          className={className}
          placeholder={`Select ${subject}`}
          id={name}
          data-testid="select"
        >
          <option disabled value="">
            {`Select ${subject}`}
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
      <ValidationWarning valid={!errors[name]}>
        {(errors[name]?.message as string) || warningMessages[name]?.emptyInput || ''}
      </ValidationWarning>
    </>
  );
};
