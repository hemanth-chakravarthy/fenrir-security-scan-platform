import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/index.js';
import { Button } from '../components/ui/Button.jsx';
import { ShieldAlert } from 'lucide-react';

export default function NotFoundPage() {
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-dark-900">
            <div className="text-center px-6 animate-fadeIn">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-dark-surface flex items-center justify-center">
                        <ShieldAlert className="w-10 h-10 text-[#0CC8A8]" />
                    </div>
                </div>
                <h1 className="text-6xl font-bold text-neutral-900 dark:text-white mb-2">404</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">Page not found.</p>
                <Button
                    variant="primary"
                    onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                >
                    {isAuthenticated ? 'Go to Dashboard' : 'Go to Login'}
                </Button>
            </div>
        </div>
    );
}
