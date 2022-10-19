import React from 'react';

type MyProps = {
  valid: boolean;
  children: string;
};

export const ValidationWarning: ({ valid, children }: MyProps) => JSX.Element = ({
  valid,
  children,
}: MyProps): JSX.Element => {
  const cls = {
    baseClass: ``,
    validClass: `text-transparent`,
    invalidClass: `text-red-700`,
  };

  const className = `${cls.baseClass} ${valid ? cls.validClass : cls.invalidClass}`;

  return (
    <p className={className} data-testid="validationWarning">
      {children}
    </p>
  );
};
