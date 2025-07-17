import clsx from 'clsx';
import { ButtonHTMLAttributes,forwardRef } from 'react';

type IconButtonProps = {
  isDarkBg?: boolean;
  variant?: 'primary' | 'outline' | 'ghost' | 'light' | 'dark';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled = false,
      isDarkBg = false,
      variant = 'outline',
      ...rest
    },
    ref
  ) => {
    const disabled = buttonDisabled;

    const variantClass = clsx({
      'bg-primary-500 text-white border-primary-600 border': variant === 'primary',
      'text-primary-500 border border-primary-500': variant === 'outline',
      'text-primary-500 shadow-none': variant === 'ghost',
      'bg-white text-gray-700 border border-gray-300': variant === 'light',
      'bg-gray-900 text-white border border-gray-600': variant === 'dark',
      'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800':
        isDarkBg && variant === 'outline',
    });

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={clsx(
          'inline-flex items-center justify-center rounded font-medium transition-colors duration-75',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'min-h-[28px] min-w-[28px] p-1 md:min-h-[34px] md:min-w-[34px] md:p-2',
          variantClass,
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
