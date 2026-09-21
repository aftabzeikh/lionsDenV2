import React from 'react';

const variantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  bodyLarge: 'p',
  bodySmall: 'p',
  caption: 'span',
  label: 'label',
  button: 'span',
  link: 'a',
};

const styleMapping = {
  h1: 'text-4xl md:text-5xl font-bold tracking-tight',
  h2: 'text-3xl md:text-4xl font-bold tracking-tight',
  h3: 'text-2xl md:text-3xl font-semibold',
  h4: 'text-xl md:text-2xl font-semibold',
  h5: 'text-lg md:text-xl font-medium',
  h6: 'text-base md:text-lg font-medium',
  body: 'text-base',
  bodyLarge: 'text-lg',
  bodySmall: 'text-sm',
  caption: 'text-xs text-muted',
  label: 'text-sm font-medium',
  button: 'text-sm font-bold uppercase tracking-wider',
  link: 'text-primary hover:underline cursor-pointer',
};

export const Text = ({ 
  variant = 'body', 
  className = '', 
  children, 
  as,
  ...props 
}) => {
  const Component = as || variantMapping[variant] || 'p';
  const baseStyle = styleMapping[variant] || styleMapping.body;
  
  return (
    <Component className={`${baseStyle} ${className}`} {...props}>
      {children}
    </Component>
  );
};
