import { useToastStore } from '../../store/index.js';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const icons = {
    success: <CheckCircle className="w-4 h-4 text-green-500" />,
    error: <AlertCircle className="w-4 h-4 text-red-500" />,
    info: <Info className="w-4 h-4 text-[#0CC8A8]" />,
};

export default function Toast() {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="animate-slideInRight pointer-events-auto flex items-center gap-3 min-w-[280px] max-w-sm bg-white dark:bg-dark-surface border border-neutral-200 dark:border-dark-border rounded-lg shadow-lg px-4 py-3"
                >
                    {icons[toast.type] || icons.info}
                    <p className="flex-1 text-sm text-neutral-800 dark:text-neutral-200">{toast.message}</p>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            ))}
        </div>
    );
}
