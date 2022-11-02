import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type MyProps = {
  form: UseFormReturn<FieldValues, unknown>;
  name: string;
  subject: string;
};

export const RadioBtn: ({ form, name, subject }: MyProps) => JSX.Element = ({
  form,
  name,
  subject,
}: MyProps): JSX.Element => {
  const { register } = form;

  const className = {
    baseClass: `form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`,
  };

  return (
    <>
      <div className="form-check form-check-inline">
        <input
          {...register(name)}
          type="radio"
          className={className.baseClass}
          id={name + subject}
          value={subject}
          data-testid="radioBtn"
        />
        <label
          className="form-check-label inline-block text-gray-800 capitalize"
          htmlFor={name + subject}
        >
          {subject}
        </label>
      </div>
    </>
  );
};
