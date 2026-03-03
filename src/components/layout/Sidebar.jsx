import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, FolderOpen, Search, Calendar,
    Bell, Settings, HelpCircle, ChevronRight, Menu, X, LogOut
} from 'lucide-react';
import { useAuthStore, useToastStore } from '../../store/index.js';
import ThemeToggle from './ThemeToggle.jsx';
import clsx from 'clsx';

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Projects', icon: FolderOpen, path: '#' },
    { label: 'Scans', icon: Search, path: '/dashboard' },
    { label: 'Schedule', icon: Calendar, path: '#' },
];

const bottomNavItems = [
    { label: 'Notifications', icon: Bell, path: '#' },
    { label: 'Settings', icon: Settings, path: '#' },
    { label: 'Support', icon: HelpCircle, path: '#' },
];

export default function Sidebar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const { logout } = useAuthStore();
    const { addToast } = useToastStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        addToast('Logged out successfully.', 'success');
        navigate('/login');
    };

    const NavItemLink = ({ item }) => (
        <NavLink
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
                clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group',
                    isActive && item.path !== '#'
                        ? 'bg-[#0CC8A8]/15 text-[#0CC8A8] dark:bg-[#0CC8A8]/20'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-dark-surface hover:text-neutral-900 dark:hover:text-neutral-100'
                )
            }
        >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            <span>{item.label}</span>
        </NavLink>
    );

    const sidebarContent = (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2.5 px-4 py-5 border-b border-neutral-200 dark:border-dark-border">
                <div className="w-7 h-7 rounded-full bg-[#0CC8A8] flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-white/30 border-2 border-white" />
                </div>
                <span className="font-bold text-neutral-900 dark:text-white text-lg tracking-tight">aps</span>
                <div className="ml-auto">
                    <ThemeToggle />
                </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => (
                    <NavItemLink key={item.label} item={item} />
                ))}
            </nav>

            <div className="px-3 py-3 space-y-1 border-t border-neutral-200 dark:border-dark-border">
                {bottomNavItems.map((item) => (
                    <NavItemLink key={item.label} item={item} />
                ))}
            </div>

            <div className="px-3 pb-4 pt-2 border-t border-neutral-200 dark:border-dark-border relative">
                <button
                    onClick={() => setShowLogout(!showLogout)}
                    className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-dark-surface transition-colors group"
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                        A
                    </div>
                    <div className="text-left flex-1 min-w-0">
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">admin@edu.com</p>
                        <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Security Lead</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
                </button>
                {showLogout && (
                    <div className="absolute bottom-full left-3 right-3 mb-1 bg-white dark:bg-dark-surface border border-neutral-200 dark:border-dark-border rounded-lg shadow-lg overflow-hidden animate-fadeIn">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <>
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-dark-surface border border-neutral-200 dark:border-dark-border shadow-md"
                onClick={() => setMobileOpen(true)}
            >
                <Menu className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
            </button>

            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <aside
                className={clsx(
                    'lg:hidden fixed top-0 left-0 h-full w-64 z-50 bg-white dark:bg-dark-800 border-r border-neutral-200 dark:border-dark-border transition-transform duration-300',
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <button
                    className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-dark-surface"
                    onClick={() => setMobileOpen(false)}
                >
                    <X className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                </button>
                {sidebarContent}
            </aside>

            <aside className="hidden lg:flex flex-col w-56 min-h-screen bg-white dark:bg-dark-800 border-r border-neutral-200 dark:border-dark-border flex-shrink-0">
                {sidebarContent}
            </aside>
        </>
    );
}
