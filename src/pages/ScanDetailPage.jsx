import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Download, Square, ArrowLeft, ChevronDown, ChevronUp, X, Circle
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar.jsx';
import { SeverityBadge } from '../components/ui/Badges.jsx';
import { Button } from '../components/ui/Button.jsx';
import { mockActiveScan, mockActivityLog, mockFindings } from '../mock/data.js';
import { useToastStore } from '../store/index.js';
import clsx from 'clsx';

// ── Circular Progress ──
function CircularProgress({ percent, status }) {
    const r = 52;
    const circ = 2 * Math.PI * r;
    const offset = circ - (percent / 100) * circ;
    return (
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center rounded-full bg-neutral-900 dark:bg-dark-900 flex-shrink-0 mx-auto sm:mx-0">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r={r} fill="none" stroke="#2A2A2A" strokeWidth="8" />
                <circle cx="64" cy="64" r={r} fill="none"
                    stroke="#0CC8A8" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={circ} strokeDashoffset={offset}
                    className="progress-ring__circle"
                />
            </svg>
            <div className="relative flex flex-col items-center justify-center">
                <p className="text-xl sm:text-2xl font-bold text-white leading-none">{percent}%</p>
                <p className="text-xs text-neutral-400 mt-1">{status}</p>
            </div>
        </div>
    );
}

// ── Step Tracker ──
function StepTracker({ steps, currentStep }) {
    return (
        <div className="flex items-start gap-0 overflow-x-auto pb-1 w-full">
            {steps.map((step, i) => {
                const isActive = i === currentStep;
                const isDone = i < currentStep;
                return (
                    <div key={step} className="flex flex-col items-center min-w-[60px] sm:min-w-[80px] flex-1">
                        <div className="relative flex items-center w-full">
                            {i > 0 && (
                                <div className={`flex-1 h-px ${isDone ? 'bg-[#0CC8A8]' : 'bg-neutral-300 dark:bg-dark-border'}`} />
                            )}
                            <div className={clsx(
                                'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-colors',
                                isActive
                                    ? 'border-[#0CC8A8] bg-[#0CC8A8] text-white shadow-lg shadow-[#0CC8A8]/30'
                                    : isDone
                                        ? 'border-[#0CC8A8] bg-[#0CC8A8] text-white'
                                        : 'border-neutral-300 dark:border-dark-border bg-transparent text-neutral-400'
                            )}>
                                {isActive ? (
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                    </svg>
                                ) : isDone ? (
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : (
                                    <span className="text-xs">{i + 1}</span>
                                )}
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`flex-1 h-px ${isDone ? 'bg-[#0CC8A8]' : 'bg-neutral-300 dark:bg-dark-border'}`} />
                            )}
                        </div>
                        <p className={clsx('text-xs mt-1.5 text-center leading-tight',
                            isActive ? 'text-[#0CC8A8] font-semibold' : 'text-neutral-400')}>
                            {step}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

// ── Activity Log Entry ──
function LogEntry({ entry }) {
    return (
        <div className="font-console text-neutral-300 dark:text-neutral-300 leading-relaxed text-xs sm:text-sm">
            <span className="text-neutral-500">[{entry.time}]</span>{' '}
            {entry.text}
            {entry.highlight && <a href="#" className="text-[#0CC8A8] hover:underline">{entry.highlight}</a>}
            {entry.highlightAfter}
            {entry.code && (
                <><br />
                    <span className="inline-block ml-4 text-neutral-400 font-console bg-black/20 dark:bg-black/30 px-2 py-0.5 rounded my-1">{entry.code}</span>
                    <br />
                </>
            )}
            {entry.textAfter}
            {entry.quote && <span className="text-amber-400">{entry.quote}</span>}
            {entry.textAfterPath}
            {entry.codepath && (
                <span className="inline-flex items-center px-1.5 py-0.5 bg-neutral-700 dark:bg-dark-border rounded text-neutral-200 font-console text-xs mx-0.5">{entry.codepath}</span>
            )}
            {entry.highlighted2 && (
                <span className="inline-flex items-center px-1.5 py-0.5 bg-neutral-700 dark:bg-dark-border2 rounded text-neutral-200 font-console text-xs mx-0.5">{entry.highlighted2}</span>
            )}
            {entry.textAfterH2}
            {entry.bold && <span className="font-bold text-amber-400">{entry.bold}</span>}
            {entry.textAfterBold}
        </div>
    );
}

export default function ScanDetailPage() {
    const { scanId } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const [activeTab, setActiveTab] = useState('activity');
    const [consoleOpen, setConsoleOpen] = useState(true);
    const [scanStopped, setScanStopped] = useState(false);
    const [showFindings, setShowFindings] = useState(false); // mobile finding log toggle

    const scan = mockActiveScan;

    const handleStopScan = () => { setScanStopped(true); addToast('Scan stopped successfully.', 'success'); };
    const handleExportReport = () => addToast('Report exported!', 'success');

    return (
        <div className="flex min-h-screen bg-neutral-50 dark:bg-dark-900">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="flex items-center justify-between gap-2 px-3 sm:px-5 py-3 border-b border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-800 sticky top-0 z-20">
                    <nav className="flex items-center gap-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 ml-10 lg:ml-0 overflow-hidden">
                        <button onClick={() => navigate('/dashboard')}
                            className="font-medium text-neutral-700 dark:text-neutral-200 hover:text-[#0CC8A8] flex items-center gap-1 whitespace-nowrap">
                            <ArrowLeft className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="hidden xs:inline">Scan</span>
                        </button>
                        <span className="hidden sm:inline mx-0.5">›</span>
                        <span className="hidden sm:inline cursor-pointer hover:text-[#0CC8A8]">🏠</span>
                        <span className="hidden sm:inline mx-0.5">/</span>
                        <span className="hidden md:inline truncate">Private Assets</span>
                        <span className="hidden md:inline mx-0.5">/</span>
                        <span className="text-[#0CC8A8] font-medium whitespace-nowrap">New Scan</span>
                    </nav>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button onClick={handleExportReport}
                            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-neutral-200 dark:border-dark-border text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-dark-surface transition-colors min-h-[36px]">
                            <Download className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="hidden sm:inline">Export Report</span>
                        </button>
                        <button onClick={handleStopScan}
                            disabled={scanStopped || scan.progress === 100}
                            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-xs sm:text-sm font-medium transition-colors min-h-[36px]">
                            <Square className="w-3 h-3 flex-shrink-0" />
                            <span className="hidden sm:inline">{scanStopped ? 'Stopped' : 'Stop Scan'}</span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 px-3 sm:px-5 py-4 space-y-3 overflow-auto">
                    <div className="bg-white dark:bg-dark-800 rounded-xl border border-neutral-200 dark:border-dark-border p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                            <CircularProgress percent={scan.progress} status={scan.status} />
                            <div className="flex-1 w-full">
                                <StepTracker steps={scan.steps} currentStep={scan.currentStep} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4 pt-4 border-t border-neutral-100 dark:border-dark-border">
                            {[
                                { label: 'Scan Type', value: scan.type },
                                { label: 'Targets', value: scan.targets },
                                { label: 'Started At', value: scan.startedAt },
                                { label: 'Credentials', value: scan.credentials },
                                { label: 'Files', value: scan.files },
                                { label: 'Checklists', value: scan.checklists, accent: true },
                            ].map((item) => (
                                <div key={item.label}>
                                    <p className="text-xs text-neutral-400 mb-0.5">{item.label}</p>
                                    <p className={clsx('text-xs sm:text-sm font-semibold leading-snug',
                                        item.accent ? 'text-[#0CC8A8]' : 'text-neutral-800 dark:text-neutral-200')}>
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-3">
                        <div className="flex-1 min-w-0 bg-white dark:bg-dark-800 rounded-xl border border-neutral-200 dark:border-dark-border overflow-hidden">
                            <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-neutral-100 dark:border-dark-border">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-2 h-2 rounded-full bg-[#0CC8A8] animate-pulse-dot flex-shrink-0" />
                                    <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 whitespace-nowrap">Live Scan Console</span>
                                    {!scanStopped && (
                                        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-neutral-100 dark:bg-dark-surface rounded-full">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#0CC8A8] animate-pulse-dot" />
                                            <span className="text-xs text-neutral-500 dark:text-neutral-400">Running...</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => setShowFindings(!showFindings)}
                                        className="lg:hidden p-1.5 text-xs font-medium text-[#0CC8A8] border border-[#0CC8A8]/30 rounded-md">
                                        {showFindings ? 'Console' : 'Findings'}
                                    </button>
                                    <button onClick={() => setConsoleOpen(!consoleOpen)}
                                        className="p-1.5 hover:bg-neutral-100 dark:hover:bg-dark-surface rounded-md text-neutral-400 transition-colors">
                                        {consoleOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>
                                    <button className="p-1.5 hover:bg-neutral-100 dark:hover:bg-dark-surface rounded-md text-neutral-400 transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {consoleOpen && (
                                <>
                                    <div className="flex border-b border-neutral-100 dark:border-dark-border px-3 sm:px-4">
                                        {[
                                            { key: 'activity', label: 'Activity Log' },
                                            { key: 'verification', label: 'Verification Loops' },
                                        ].map((tab) => (
                                            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                                                className={clsx('py-2.5 px-1 mr-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                                                    activeTab === tab.key
                                                        ? 'border-[#0CC8A8] text-[#0CC8A8]'
                                                        : 'border-transparent text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300')}>
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className={clsx('p-3 sm:p-4 overflow-y-auto bg-neutral-50 dark:bg-dark-900/50 space-y-3',
                                        showFindings ? 'hidden lg:block' : 'block',
                                        'max-h-72 sm:max-h-80')}>
                                        {activeTab === 'activity' ? (
                                            mockActivityLog.map((entry, i) => <LogEntry key={i} entry={entry} />)
                                        ) : (
                                            <div className="font-console text-neutral-400 text-xs sm:text-sm space-y-1">
                                                <p>[10:45:00] Verification loop 1 started...</p>
                                                <p>[10:45:12] Checking SQL injection vectors...</p>
                                                <p>[10:45:34] <span className="text-red-400">CONFIRMED:</span> SQL injection in <span className="text-[#0CC8A8]">/api/users/profile</span></p>
                                                <p>[10:45:45] Checking IDOR vectors...</p>
                                                <p>[10:46:01] <span className="text-red-400">CONFIRMED:</span> IDOR in X-UserId header</p>
                                                <p>[10:46:14] Checking rate limiting on <span className="text-[#0CC8A8]">/api/search</span>...</p>
                                                <p>[10:46:30] <span className="text-amber-400">WARNING:</span> No rate limiting detected</p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className={clsx(
                            'bg-white dark:bg-dark-800 rounded-xl border border-neutral-200 dark:border-dark-border overflow-hidden',
                            'w-full lg:w-72 xl:w-80 flex-shrink-0',
                            showFindings ? 'block' : 'hidden lg:block'
                        )}>
                            <div className="px-3 sm:px-4 py-3 border-b border-neutral-100 dark:border-dark-border">
                                <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Finding Log</h3>
                            </div>
                            <div className="p-3 space-y-3 max-h-80 lg:max-h-96 overflow-y-auto">
                                {mockFindings.map((finding) => (
                                    <div key={finding.id}
                                        className="p-3 rounded-lg border border-neutral-100 dark:border-dark-border hover:border-neutral-200 dark:hover:border-dark-border2 transition-all animate-fadeIn">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <SeverityBadge severity={finding.severity} />
                                            <span className="text-xs text-neutral-400 font-mono">{finding.time}</span>
                                        </div>
                                        <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-0.5 leading-snug">{finding.title}</p>
                                        <p className="text-xs text-[#0CC8A8] mb-1.5 font-mono">{finding.endpoint}</p>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{finding.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="border-t border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-800 px-3 sm:px-5 py-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                            <div className="flex items-center gap-1.5">
                                <Circle className="w-2.5 h-2.5 text-neutral-300 flex-shrink-0" />
                                <span>Sub-Agents: 0</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Circle className="w-2.5 h-2.5 text-[#0CC8A8] flex-shrink-0" />
                                <span>Parallel Exec: 2</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Circle className="w-2.5 h-2.5 text-neutral-400 flex-shrink-0" />
                                <span>Ops: 1</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                            {[
                                { color: 'bg-red-500', label: 'Critical', severity: 'Critical' },
                                { color: 'bg-orange-500', label: 'High', severity: 'High' },
                                { color: 'bg-amber-500', label: 'Medium', severity: 'Medium' },
                                { color: 'bg-green-500', label: 'Low', severity: 'Low' },
                            ].map(({ color, label, severity }) => (
                                <span key={severity} className="flex items-center gap-1">
                                    <span className={`w-2 h-2 rounded-full ${color} inline-block flex-shrink-0`} />
                                    {label}: {mockFindings.filter(f => f.severity === severity).length}
                                </span>
                            ))}
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

