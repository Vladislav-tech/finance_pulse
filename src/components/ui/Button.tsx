import React from 'react';

interface ButtonPros {
  className?: string;
  children: React.ReactNode;
}

function Button({ className, children }: ButtonPros) {
  return <button className={className}>{children}</button>;
}

export default Button;
