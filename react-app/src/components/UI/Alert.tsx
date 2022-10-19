import React from 'react';

type MyProps = {
  visibility: boolean;
  color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'; // tailwind presentation
  children: string;
};

export const Alert: ({ visibility, color, children }: MyProps) => JSX.Element = ({
  visibility,
  color,
  children,
}: MyProps): JSX.Element => {
  const cls = {
    baseClass: `fixed font-semibold text-center inset-x-0 top-5 mx-10 animate-bounce rounded-lg py-5 px-6 mb-4 text-base mb-3`,
    visibleClass: `block`,
    invisibleClass: `hidden`,
    // https://tailwindcss.com/docs/content-configuration#dynamic-class-names
    // https://tailwind-elements.com/docs/standard/components/alerts/
    alertColors: {
      primary: 'bg-blue-100 text-blue-700',
      secondary: 'bg-purple-100 text-purple-700',
      success: 'bg-green-100 text-green-700',
      danger: 'bg-red-100 text-red-700',
      warning: 'bg-yellow-100 text-yellow-700',
      info: 'bg-indigo-100 text-indigo-700',
      light: 'bg-gray-50 text-gray-500',
      dark: 'bg-gray-300 text-gray-800',
    },
  };

  const className = `${cls.baseClass} ${visibility ? cls.visibleClass : cls.invisibleClass} ${
    cls.alertColors[color]
  }`;

  return (
    <div className={className} role="alert">
      {children}
    </div>
  );
};
