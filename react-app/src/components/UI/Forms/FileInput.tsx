import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import warningMessages from 'utils/warning-messages';
import { ValidationWarning } from './ValidationWarning';

type MyProps = {
  form: UseFormReturn<FieldValues, unknown>;
  subject: string;
  children: string;
};

export const FileInput: ({ form, subject, children }: MyProps) => JSX.Element = ({
  form,
  subject,
  children,
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

  const className: string = errors[name]
    ? `${cls.baseClass} ${cls.invalidClass}`
    : `${cls.baseClass}`;

  const validFileExtensions: string[] = ['image/png', 'image/jpeg', 'image/gif'];

  return (
    <>
      <div className="mt-3">
        <label htmlFor={name} className="form-label inline-block mb-2 text-gray-700 text-start">
          {children}
        </label>
        <input
          {...register(name, {
            required: warningMessages.file.emptyInput,
            validate: (file: FileList): string | true => {
              return (
                validFileExtensions.includes(file[0].type) || warningMessages.file.wrongImgFormat
              );
            },
          })}
          type="file"
          className={className}
          placeholder={subject}
          id={name}
          accept="image/png, image/gif, image/jpeg"
          data-testid="fileInput"
        />
      </div>
      <ValidationWarning valid={!errors[name]}>
        {(errors[name]?.message as string) || warningMessages.file.emptyInput}
      </ValidationWarning>
    </>
  );
};
