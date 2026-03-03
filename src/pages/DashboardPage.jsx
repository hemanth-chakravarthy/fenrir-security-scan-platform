import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, SlidersHorizontal, Columns3, Plus,
    RefreshCw, ArrowUpRight, ArrowDownRight, Download, Square
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar.jsx';
import { StatusChip, VulnerabilityBadges } from '../components/ui/Badges.jsx';
import { Button } from '../components/ui/Button.jsx';
import { mockScans, mockScanStats } from '../mock/data.js';
import { useToastStore } from '../store/index.js';

function SeverityCard({ label, count, change, up, icon, color }) {
    return (
        <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-1 truncate">{label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-1">{count}</p>
                <div className={`flex items-center gap-1 text-xs font-medium ${up ? 'text-red-500' : 'text-green-500'}`}>
                    {up ? <ArrowUpRight className="w-3 h-3 flex-shrink-0" /> : <ArrowDownRight className="w-3 h-3 flex-shrink-0" />}
                    <span className="leading-tight">{up ? '+' : ''}{change}% {up ? 'increase' : 'decrease'} than yesterday</span>
                </div>
            </div>
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}>
                {icon}
            </div>
        </div>
    );
}

function ProgressBar({ progress, status }) {
    const color = status === 'Failed' ? 'bg-red-500' : 'bg-[#0CC8A8]';
    return (
        <div className="flex items-center gap-2 min-w-[80px]">
            <div className="flex-1 h-1.5 bg-neutral-100 dark:bg-dark-border rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 w-7 text-right flex-shrink-0">{progress}%</span>
        </div>
    );
}

export default function DashboardPage() {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const [search, setSearch] = useState('');
    const stats = mockScanStats;

    const filteredScans = useMemo(() => {
        const q = search.toLowerCase();
        if (!q) return mockScans;
        return mockScans.filter(
            (s) => s.name.toLowerCase().includes(q) || s.type.toLowerCase().includes(q) || s.status.toLowerCase().includes(q)
        );
    }, [search]);

    return (
        <div className="flex min-h-screen bg-neutral-50 dark:bg-dark-900">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="flex items-center justify-between gap-2 px-3 sm:px-5 py-3 border-b border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-800 sticky top-0 z-20">
                    <nav className="flex items-center gap-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 ml-10 lg:ml-0 overflow-hidden">
                        <span className="font-medium text-neutral-700 dark:text-neutral-200 whitespace-nowrap">Scan</span>
                        <span className="mx-0.5 hidden sm:inline">›</span>
                        <span className="hidden sm:inline cursor-pointer hover:text-[#0CC8A8]">🏠</span>
                        <span className="mx-0.5 hidden sm:inline">/</span>
                        <span className="hidden md:inline text-neutral-500 truncate">Private Assets</span>
                        <span className="mx-0.5 hidden md:inline">/</span>
                        <span className="text-[#0CC8A8] font-medium whitespace-nowrap">New Scan</span>
                    </nav>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                            onClick={() => addToast('Report exported!', 'success')}
                            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-neutral-200 dark:border-dark-border text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-dark-surface transition-colors min-h-[36px]"
                        >
                            <Download className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="hidden sm:inline">Export Report</span>
                        </button>
                        <button
                            onClick={() => addToast('Scan stopped.', 'info')}
                            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm font-medium transition-colors min-h-[36px]"
                        >
                            <Square className="w-3 h-3 flex-shrink-0" />
                            <span className="hidden sm:inline">Stop Scan</span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 px-3 sm:px-5 py-4 overflow-auto">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-4 bg-white dark:bg-dark-800 rounded-xl border border-neutral-200 dark:border-dark-border px-3 py-2.5">
                        <span><strong className="text-neutral-700 dark:text-neutral-200">Org:</strong> {stats.org}</span>
                        <span className="hidden sm:block text-neutral-200 dark:text-dark-border">|</span>
                        <span><strong className="text-neutral-700 dark:text-neutral-200">Owner:</strong> {stats.owner}</span>
                        <span className="hidden sm:block text-neutral-200 dark:text-dark-border">|</span>
                        <span className="hidden md:inline"><strong>Total:</strong> {stats.totalScans}</span>
                        <span className="hidden md:block text-neutral-200 dark:text-dark-border">|</span>
                        <span className="hidden md:inline"><strong>Scheduled:</strong> {stats.scheduled}</span>
                        <span className="hidden md:block text-neutral-200 dark:text-dark-border">|</span>
                        <span className="hidden lg:inline"><strong>Rescans:</strong> {stats.rescans}</span>
                        <span className="hidden lg:block text-neutral-200 dark:text-dark-border">|</span>
                        <span className="hidden lg:inline"><strong>Failed:</strong> {stats.failedScans}</span>
                        <div className="flex items-center gap-1 ml-auto text-neutral-400">
                            <RefreshCw className="w-3 h-3" />
                            <span>{stats.lastUpdated}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                        {[
                            { label: 'Critical Severity', ...stats.severity.critical, icon: <span className="text-red-500 text-xs">⊘</span>, color: 'bg-red-100 dark:bg-red-500/20' },
                            { label: 'High Severity', ...stats.severity.high, icon: <span className="text-orange-500 text-xs">⚠</span>, color: 'bg-orange-100 dark:bg-orange-500/20' },
                            { label: 'Medium Severity', ...stats.severity.medium, icon: <span className="text-amber-500 text-xs">⚠</span>, color: 'bg-amber-100 dark:bg-amber-500/20' },
                            { label: 'Low Severity', ...stats.severity.low, icon: <span className="text-blue-500 text-xs">🔍</span>, color: 'bg-blue-100 dark:bg-blue-500/20' },
                        ].map((card) => (
                            <div key={card.label} className="bg-white dark:bg-dark-800 rounded-xl p-3 sm:p-4 border border-neutral-200 dark:border-dark-border">
                                <SeverityCard {...card} />
                            </div>
                        ))}
                    </div>
                    <div className="bg-white dark:bg-dark-800 rounded-xl border border-neutral-200 dark:border-dark-border overflow-hidden">
                        <div className="flex flex-wrap items-center gap-2 p-3 sm:p-4 border-b border-neutral-200 dark:border-dark-border">
                            <div className="flex-1 relative min-w-[160px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                <input
                                    type="text"
                                    placeholder="Search scans..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-200 dark:border-dark-border rounded-lg bg-neutral-50 dark:bg-dark-900 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0CC8A8] focus:border-transparent"
                                />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => addToast('Filters applied.', 'info')}
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-dark-border text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-dark-surface transition-colors min-h-[34px]"
                                >
                                    <SlidersHorizontal className="w-3.5 h-3.5" />
                                    <span className="hidden xs:inline">Filter</span>
                                </button>
                                <button
                                    onClick={() => addToast('Columns updated.', 'info')}
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-dark-border text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-dark-surface transition-colors min-h-[34px]"
                                >
                                    <Columns3 className="w-3.5 h-3.5" />
                                    <span className="hidden xs:inline">Column</span>
                                </button>
                                <button
                                    onClick={() => addToast('New scan started!', 'success')}
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0CC8A8] hover:bg-[#0AAE92] text-white text-xs font-medium transition-colors min-h-[34px]"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>New scan</span>
                                </button>
                            </div>
                        </div>
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-neutral-100 dark:border-dark-border">
                                        {['Scan Name', 'Type', 'Status', 'Progress', 'Vulnerability', 'Last Scan'].map((col) => (
                                            <th key={col} className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap">{col}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredScans.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-12 text-center text-sm text-neutral-400">No scans found.</td>
                                        </tr>
                                    ) : filteredScans.map((scan) => (
                                        <tr key={scan.id} onClick={() => navigate(`/scan/${scan.id}`)}
                                            className="border-b border-neutral-50 dark:border-dark-border/50 hover:bg-neutral-50 dark:hover:bg-dark-surface cursor-pointer transition-colors group">
                                            <td className="px-4 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-[#0CC8A8] transition-colors">{scan.name}</td>
                                            <td className="px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400">{scan.type}</td>
                                            <td className="px-4 py-3"><StatusChip status={scan.status} /></td>
                                            <td className="px-4 py-3 min-w-[140px]"><ProgressBar progress={scan.progress} status={scan.status} /></td>
                                            <td className="px-4 py-3"><VulnerabilityBadges vulnerabilities={scan.vulnerabilities} /></td>
                                            <td className="px-4 py-3 text-xs text-neutral-400 whitespace-nowrap">{scan.lastScan}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="md:hidden divide-y divide-neutral-100 dark:divide-dark-border">
                            {filteredScans.length === 0 ? (
                                <div className="py-12 text-center text-sm text-neutral-400">No scans found.</div>
                            ) : filteredScans.map((scan) => (
                                <div key={scan.id} onClick={() => navigate(`/scan/${scan.id}`)}
                                    className="px-3 py-3 hover:bg-neutral-50 dark:hover:bg-dark-surface cursor-pointer transition-colors active:bg-neutral-100 dark:active:bg-dark-surface2">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">{scan.name}</p>
                                            <p className="text-xs text-neutral-400 mt-0.5">{scan.type} · {scan.lastScan}</p>
                                        </div>
                                        <StatusChip status={scan.status} />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1">
                                            <ProgressBar progress={scan.progress} status={scan.status} />
                                        </div>
                                        <VulnerabilityBadges vulnerabilities={scan.vulnerabilities} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-t border-neutral-100 dark:border-dark-border">
                            <p className="text-xs text-neutral-400">Showing {filteredScans.length} of {mockScans.length} Scans</p>
                            <div className="flex items-center gap-1">
                                <button className="w-7 h-7 flex items-center justify-center rounded border border-neutral-200 dark:border-dark-border text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:border-neutral-400 transition-colors text-xs">‹</button>
                                <button className="w-7 h-7 flex items-center justify-center rounded border border-neutral-200 dark:border-dark-border text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:border-neutral-400 transition-colors text-xs">›</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

