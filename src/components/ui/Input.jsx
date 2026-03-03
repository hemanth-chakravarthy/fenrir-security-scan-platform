import clsx from 'clsx';
import { forwardRef } from 'react';

const Input = forwardRef(function Input(
    { label, error, className, type = 'text', rightIcon, ...props },
    ref
) {
    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    ref={ref}
                    type={type}
                    className={clsx(
                        'w-full px-3 py-2.5 text-sm rounded-lg border transition-all duration-150',
                        'bg-white dark:bg-dark-surface',
                        'text-neutral-900 dark:text-neutral-100',
                        'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
                        'focus:outline-none focus:ring-2 focus:ring-[#0CC8A8] focus:border-transparent',
                        error
                            ? 'border-red-400 dark:border-red-500 focus:ring-red-400'
                            : 'border-neutral-300 dark:border-dark-border hover:border-neutral-400 dark:hover:border-dark-border2',
                        rightIcon && 'pr-10',
                        className
                    )}
                    {...props}
                />
                {rightIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-1" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
});

export default Input;
