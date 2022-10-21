import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import warningMessages from 'utils/warning-messages';
import { ValidationWarning } from './ValidationWarning';

type MyProps = {
  form: UseFormReturn<FieldValues, unknown>;
  subject: string;
};

export const TextInput: ({ form, subject }: MyProps) => JSX.Element = ({
  form,
  subject,
}: MyProps): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = form;

  const name: string = subject.toLowerCase();

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

  const className: string = errors[name]
    ? `${cls.baseClass} ${cls.invalidClass}`
    : `${cls.baseClass}`;

  return (
    <>
      <div className="form-floating mt-3">
        <input
          {...register(name, {
            required: warningMessages[name]?.emptyInput,
            minLength: {
              value: 3,
              message: warningMessages[name]?.emptyInput,
            },
          })}
          type="text"
          className={className}
          placeholder={subject}
          id={name}
          data-testid="textInput"
        />
        <label htmlFor={name} className="text-gray-700">
          {subject}
        </label>
      </div>
      <ValidationWarning valid={!errors[name]}>
        {(errors[name]?.message as string) || warningMessages[name]?.emptyInput}
      </ValidationWarning>
    </>
  );
};
