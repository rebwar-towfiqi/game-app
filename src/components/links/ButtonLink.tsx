import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef } from 'react';

export type ButtonLinkProps = {
  variant?: 'primary' | 'outline' | 'ghost' | 'light' | 'dark';
  size?: 'sm' | 'base' | 'lg';
  href: string;
  children: React.ReactNode;
  isDarkBg?: boolean;
  className?: string;
} & React.ComponentPropsWithoutRef<'a'>;

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
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
    const baseClasses =
      'inline-flex items-center font-medium rounded focus:outline-none focus-visible:ring focus-visible:ring-primary-500 shadow-sm';

    const sizeClasses = clsx({
      'px-3 py-1.5 text-sm md:text-base': size === 'base',
      'px-2 py-1 text-xs md:text-sm': size === 'sm',
      'px-5 py-2 text-base md:text-lg': size === 'lg',
    });

    const variantClasses = clsx({
      'bg-primary-500 text-white border border-primary-600 hover:bg-primary-600 active:bg-primary-700 disabled:bg-primary-700':
        variant === 'primary',

      'text-primary-500 border border-primary-500 hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100':
        variant === 'outline' && !isDarkBg,
      'text-primary-500 border border-primary-500 hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800':
        variant === 'outline' && isDarkBg,

      'text-primary-500 shadow-none hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100':
        variant === 'ghost' && !isDarkBg,
      'text-primary-500 shadow-none hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800':
        variant === 'ghost' && isDarkBg,

      'bg-white text-gray-700 border border-gray-300 hover:text-dark hover:bg-gray-100 active:bg-white/80 disabled:bg-gray-200':
        variant === 'light',

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
