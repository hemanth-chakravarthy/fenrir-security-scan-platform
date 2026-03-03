import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, Apple } from 'lucide-react';
import { useAuthStore, useToastStore } from '../store/index.js';
import { Button } from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import ThemeToggle from '../components/layout/ThemeToggle.jsx';

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const MetaIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
    </svg>
);

function validateForm(form) {
    const errors = {};
    if (!form.firstName || form.firstName.trim().length < 2)
        errors.firstName = 'First name must be at least 2 characters.';
    if (!form.lastName || form.lastName.trim().length < 2)
        errors.lastName = 'Last name must be at least 2 characters.';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errors.email = 'Please enter a valid email address.';
    if (!form.password || form.password.length < 8)
        errors.password = 'Password must be at least 8 characters.';
    if (!form.terms)
        errors.terms = 'You must agree to the Terms & Conditions.';
    return errors;
}

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const { addToast } = useToastStore();

    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', terms: false });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm(form);
        if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
        setLoading(true);
        setTimeout(() => {
            login({ email: form.email, name: `${form.firstName} ${form.lastName}` });
            navigate('/dashboard');
        }, 600);
    };

    const handleSocialLogin = () => {
        setLoading(true);
        setTimeout(() => {
            login({ email: 'admin@edu.com', name: 'Security Lead' });
            navigate('/dashboard');
        }, 500);
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-neutral-100 dark:bg-dark-900">
            <div className="hidden lg:flex flex-col flex-1 login-gradient px-10 xl:px-16 py-10 relative overflow-hidden">
                <div className="flex items-center gap-2.5 z-10 relative">
                    <div className="w-7 h-7 rounded-full bg-[#0CC8A8] flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white/30 border-2 border-white" />
                    </div>
                    <span className="font-bold text-white text-xl tracking-tight">aps</span>
                    <div className="ml-auto"><ThemeToggle /></div>
                </div>

                <div className="flex-1 flex flex-col justify-center z-10 relative max-w-lg">
                    <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-6">
                        Expert level Cybersecurity<br />
                        in <span className="text-[#0CC8A8]">hours</span> not weeks.
                    </h1>
                    <div className="mb-10">
                        <p className="text-sm font-semibold text-white mb-4">What's included</p>
                        <div className="space-y-3">
                            {[
                                'Effortlessly spider and map targets to uncover hidden security flaws',
                                'Deliver high-quality, validated findings in hours, not weeks.',
                                'Generate professional, enterprise-grade security reports automatically.',
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-4 h-4 rounded-full bg-[#0CC8A8]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-2.5 h-2.5 text-[#0CC8A8]" />
                                    </div>
                                    <p className="text-sm text-neutral-300 leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-green-400 text-sm">★</span>
                            <span className="text-sm text-neutral-300">Trustpilot</span>
                        </div>
                        <p className="text-sm text-white font-semibold">
                            Rated 4.5/5.0 <span className="text-neutral-400 font-normal">(100k+ reviews)</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 lg:flex-none lg:w-[420px] xl:w-[480px] flex items-center justify-center min-h-screen lg:min-h-0 px-5 sm:px-8 py-10 bg-white dark:bg-dark-800">
                <div className="w-full max-w-sm">

                    <div className="lg:hidden flex items-center gap-2 mb-8">
                        <div className="w-6 h-6 rounded-full bg-[#0CC8A8] flex items-center justify-center flex-shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/30 border-[1.5px] border-white" />
                        </div>
                        <span className="font-bold text-neutral-900 dark:text-white text-lg">aps</span>
                        <div className="ml-auto"><ThemeToggle /></div>
                    </div>

                    <div className="lg:hidden mb-6 p-4 rounded-xl login-gradient">
                        <h1 className="text-lg font-bold text-white leading-snug">
                            Expert level Cybersecurity in{' '}
                            <span className="text-[#0CC8A8]">hours</span> not weeks.
                        </h1>
                    </div>

                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1 text-center">Sign up</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mb-6">
                        Already have an account?{' '}
                        <button className="text-[#0CC8A8] hover:underline font-medium">Log in</button>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <Input name="firstName" placeholder="First name*" value={form.firstName}
                                onChange={handleChange} error={errors.firstName} aria-invalid={!!errors.firstName} />
                            <Input name="lastName" placeholder="Last name*" value={form.lastName}
                                onChange={handleChange} error={errors.lastName} aria-invalid={!!errors.lastName} />
                        </div>
                        <Input name="email" type="email" placeholder="Email address*" value={form.email}
                            onChange={handleChange} error={errors.email} aria-invalid={!!errors.email} />
                        <Input
                            name="password" type={showPassword ? 'text' : 'password'}
                            placeholder="Password (8+ characters)*" value={form.password}
                            onChange={handleChange} error={errors.password} aria-invalid={!!errors.password}
                            rightIcon={
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            }
                        />

                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <div className="relative flex-shrink-0 mt-0.5">
                                    <input type="checkbox" name="terms" checked={form.terms}
                                        onChange={handleChange} className="sr-only" />
                                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${form.terms ? 'bg-[#0CC8A8] border-[#0CC8A8]'
                                            : errors.terms ? 'border-red-400'
                                                : 'border-neutral-300 dark:border-dark-border2'
                                        }`}>
                                        {form.terms && <Check className="w-2.5 h-2.5 text-white" />}
                                    </div>
                                </div>
                                <span className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                    I agree to Aps's{' '}
                                    <button type="button" className="text-[#0CC8A8] hover:underline">Terms & Conditions</button>{' '}
                                    and acknowledge the{' '}
                                    <button type="button" className="text-[#0CC8A8] hover:underline">Privacy Policy</button>
                                </span>
                            </label>
                            {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms}</p>}
                        </div>

                        <Button type="submit" variant="primary"
                            className="w-full py-3 text-base font-semibold rounded-full mt-1"
                            disabled={loading}>
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-custom" />
                                    Creating account...
                                </span>
                            ) : 'Create account'}
                        </Button>
                    </form>

                    <div className="flex items-center gap-3 mt-4">
                        <button onClick={handleSocialLogin} disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-black text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 min-h-[44px]">
                            <Apple className="w-5 h-5" />
                        </button>
                        <button onClick={handleSocialLogin} disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-neutral-200 rounded-full text-sm font-medium hover:bg-neutral-50 transition-colors disabled:opacity-50 min-h-[44px]">
                            <GoogleIcon />
                        </button>
                        <button onClick={handleSocialLogin} disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 min-h-[44px]">
                            <MetaIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
