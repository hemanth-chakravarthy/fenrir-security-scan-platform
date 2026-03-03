import clsx from 'clsx';

export function Button({ children, variant = 'primary', size = 'md', className, disabled, onClick, ...props }) {
    const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed gap-2';

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-2.5 text-base',
    };

    const variants = {
        primary: 'bg-[#0CC8A8] hover:bg-[#0AAE92] text-white focus:ring-[#0CC8A8] dark:focus:ring-offset-gray-900',
        secondary: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-dark-surface dark:hover:bg-dark-surface2 dark:text-neutral-100 border border-neutral-200 dark:border-dark-border focus:ring-neutral-300',
        danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 dark:focus:ring-offset-gray-900',
        ghost: 'hover:bg-neutral-100 dark:hover:bg-dark-surface text-neutral-600 dark:text-neutral-400 focus:ring-neutral-200',
        outline: 'border border-neutral-300 dark:border-dark-border hover:bg-neutral-50 dark:hover:bg-dark-surface text-neutral-700 dark:text-neutral-300 focus:ring-neutral-200',
    };

    return (
        <button
            className={clsx(base, sizes[size], variants[variant], className)}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
