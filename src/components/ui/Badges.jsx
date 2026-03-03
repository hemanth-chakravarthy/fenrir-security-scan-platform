import clsx from 'clsx';

const severityConfig = {
    Critical: 'bg-red-500 text-white',
    High: 'bg-orange-500 text-white',
    Medium: 'bg-amber-500 text-white',
    Low: 'bg-green-500 text-white',
};

const severityConfigLight = {
    Critical: 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400',
    High: 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400',
    Medium: 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    Low: 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400',
};

export function SeverityBadge({ severity, variant = 'solid' }) {
    const config = variant === 'solid' ? severityConfig : severityConfigLight;
    return (
        <span
            className={clsx(
                'inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-semibold',
                config[severity] || 'bg-neutral-100 text-neutral-600'
            )}
        >
            {severity}
        </span>
    );
}

const statusConfig = {
    Completed: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400',
    Scheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400',
    Failed: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
    'In Progress': 'bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-400',
};

export function StatusChip({ status }) {
    return (
        <span
            className={clsx(
                'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium',
                statusConfig[status] || 'bg-neutral-100 text-neutral-600'
            )}
        >
            {status}
        </span>
    );
}

export function VulnerabilityBadges({ vulnerabilities }) {
    const { critical, high, medium, low } = vulnerabilities;
    const items = [
        { count: critical, bg: 'bg-red-500' },
        { count: high, bg: 'bg-orange-500' },
        { count: medium, bg: 'bg-amber-500' },
        { count: low, bg: 'bg-green-500' },
    ].filter((item) => item.count > 0);

    return (
        <div className="flex items-center gap-1">
            {items.map((item, i) => (
                <span
                    key={i}
                    className={clsx(
                        'inline-flex items-center justify-center w-6 h-6 rounded-sm text-white text-xs font-bold',
                        item.bg
                    )}
                >
                    {item.count}
                </span>
            ))}
        </div>
    );
}
