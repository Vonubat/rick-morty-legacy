import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import warningMessages from 'utils/warning-messages';
import { ValidationWarning } from './ValidationWarning';

type MyProps = {
  form: UseFormReturn<FieldValues, unknown>;
  subject: string;
  children: string;
};

export const Checkbox: ({ form, subject, children }: MyProps) => JSX.Element = ({
  form,
  subject,
  children,
}: MyProps): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = form;

  const name: string = subject.toLowerCase();

  const className = {
    baseClass: `form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`,
  };

  return (
    <>
      <div className="form-check flex flex-nowrap mt-3">
        <input
          {...register(name, {
            required: warningMessages[name]?.emptyInput,
          })}
          type="checkbox"
          className={className.baseClass}
          id={name}
          data-testid="checkbox"
        />
        <label className="form-check-label inline-block text-gray-800" htmlFor={name}>
          {children}
        </label>
      </div>
      <ValidationWarning valid={!errors[name]}>
        {(errors[name]?.message as string) || warningMessages[name]?.emptyInput}
      </ValidationWarning>
    </>
  );
};
