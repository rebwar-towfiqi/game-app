import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import * as React from 'react';

export type ButtonLinkProps = {
  isDarkBg?: boolean;
  variant?: 'primary' | 'outline' | 'ghost' | 'light' | 'dark';
  size?: 'sm' | 'base';
  href: string;
  className?: string;
} & LinkProps &
  React.ComponentPropsWithRef<'a'>;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'base',
      isDarkBg = false,
      href,
      ...rest
    },
    ref
  ) => {
    const baseClasses = 'inline-flex items-center rounded font-medium focus-visible:ring-primary-500 focus:outline-none focus-visible:ring shadow-sm transition-colors duration-75 disabled:cursor-not-allowed';

    const sizeClasses = clsx({
      'px-3 py-1.5 text-sm md:text-base': size === 'base',
      'px-2 py-1 text-xs md:text-sm': size === 'sm',
    });

    const variantClasses = clsx({
  // Primary
  'bg-primary-500 text-white border border-primary-600 hover:bg-primary-600 active:bg-primary-700 disabled:bg-primary-700':
    variant === 'primary',

  // Outline - Light
  'text-primary-500 border border-primary-500 hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100':
    variant === 'outline' && !isDarkBg,

  // Outline - Dark
  'text-primary-500 border border-primary-500 hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800':
    variant === 'outline' && isDarkBg,

  // Ghost - Light
  'text-primary-500 shadow-none hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100':
    variant === 'ghost' && !isDarkBg,

  // Ghost - Dark
  'text-primary-500 shadow-none hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800':
    variant === 'ghost' && isDarkBg,

  // Light
  'bg-white text-gray-700 border border-gray-300 hover:text-dark hover:bg-gray-100 active:bg-white/80 disabled:bg-gray-200':
    variant === 'light',

  // Dark
  'bg-gray-900 text-white border border-gray-600 hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700':
    variant === 'dark',
});


    return (
      <Link
        href={href}
        ref={ref}
        className={clsx(baseClasses, sizeClasses, variantClasses, className)}
        {...rest}
      >
        {children}
      </Link>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';

export default ButtonLink;
