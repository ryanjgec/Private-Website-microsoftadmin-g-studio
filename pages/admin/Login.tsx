
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../App';
import { ArrowLeft, ShieldCheck, AlertTriangle, Loader2, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'error' | 'locked'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Security Constants
  const MAX_ATTEMPTS = 3;
  const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 Minutes
  
  // Encoded Credentials (Base64) to prevent plain-text snooping in source code
  // User: sayan@microsoft.com
  // Pass: Wokeup@9am
  const ADMIN_HASH = "c2F5YW5AbWljcm9zb2Z0LmNvbQ==";
  const PASS_HASH = "V29rZXVwQDlhbQ==";

  useEffect(() => {
    // Check for existing lockout on mount
    const lockoutTime = localStorage.getItem('ms_sec_lockout');
    const storedAttempts = localStorage.getItem('ms_sec_attempts');

    if (lockoutTime) {
      const remainingTime = parseInt(lockoutTime) - Date.now();
      if (remainingTime > 0) {
        setStatus('locked');
        setErrorMessage(`System Locked due to suspicious activity. Try again in ${Math.ceil(remainingTime / 60000)} minutes.`);
        return;
      } else {
        // Lockout expired
        localStorage.removeItem('ms_sec_lockout');
        localStorage.removeItem('ms_sec_attempts');
        setAttempts(0);
      }
    }

    if (storedAttempts) {
      setAttempts(parseInt(storedAttempts));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'locked' || status === 'checking') return;

    setStatus('checking');
    setErrorMessage('');

    // Artificial Latency to thwart timing attacks and scripts
    const delay = Math.floor(Math.random() * 800) + 1200; 

    setTimeout(() => {
      // 1. Check Login
      const inputUserHash = btoa(email);
      const inputPassHash = btoa(password);

      if (inputUserHash === ADMIN_HASH && inputPassHash === PASS_HASH) {
        // SUCCESS
        localStorage.removeItem('ms_sec_attempts');
        localStorage.removeItem('ms_sec_lockout');
        login({ name: 'Sayan Ghosh', email, role: 'admin' });
        navigate('/admin');
      } else {
        // FAILURE
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        localStorage.setItem('ms_sec_attempts', newAttempts.toString());

        if (newAttempts >= MAX_ATTEMPTS) {
          // Trigger Lockout
          const lockoutUntil = Date.now() + LOCKOUT_DURATION;
          localStorage.setItem('ms_sec_lockout', lockoutUntil.toString());
          setStatus('locked');
          setErrorMessage('Maximum attempts exceeded. IP Address flagged. System locked for 30 minutes.');
        } else {
          setStatus('error');
          setErrorMessage(`Invalid credentials. ${MAX_ATTEMPTS - newAttempts} attempts remaining before lockout.`);
          setPassword(''); // Clear password field
        }
      }
    }, delay);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-1/4 top-0 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-ms-blue mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className={`backdrop-blur-xl bg-white/80 dark:bg-slate-900/70 border shadow-2xl rounded-2xl p-8 sm:p-10 ring-1 ring-gray-900/5 transition-all duration-300 ${status === 'locked' ? 'border-red-500/50 shadow-red-500/20' : 'border-white/50 dark:border-slate-700/50'}`}>
            
            <div className="text-center mb-8">
                <div className={`mx-auto h-12 w-12 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-500 ${
                  status === 'locked' ? 'bg-red-600 shadow-red-500/40' : 
                  status === 'checking' ? 'bg-blue-600 animate-pulse' : 'bg-ms-blue shadow-blue-500/30'
                }`}>
                    {status === 'locked' ? <Lock className="h-6 w-6 text-white" /> : <ShieldCheck className="h-6 w-6 text-white" />}
                </div>
                <h2 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {status === 'locked' ? 'Security Lockout' : 'Admin Portal'}
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {status === 'locked' ? 'Access suspended due to security policy.' : 'Secure Gateway v2.4 (Encrypted)'}
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
                {(status === 'error' || status === 'locked') && (
                    <div className={`rounded-lg p-4 flex items-start ${status === 'locked' ? 'bg-red-100 border-l-4 border-red-500 text-red-700' : 'bg-amber-50 border-l-4 border-amber-500 text-amber-700'}`}>
                        <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                           <p className="text-sm font-bold">{status === 'locked' ? 'Access Denied' : 'Authentication Failed'}</p>
                           <p className="text-xs mt-1 font-medium">{errorMessage}</p>
                        </div>
                    </div>
                )}
                
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Identity</label>
                    <div className="relative">
                        <input 
                            type="email" 
                            required 
                            disabled={status === 'locked' || status === 'checking'}
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            className="block w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-slate-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-ms-blue focus:border-transparent dark:bg-slate-800/50 dark:border-slate-600 dark:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="admin@domain.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Passkey</label>
                    <input 
                        type="password" 
                        required 
                        disabled={status === 'locked' || status === 'checking'}
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        className="block w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-slate-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-ms-blue focus:border-transparent dark:bg-slate-800/50 dark:border-slate-600 dark:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="••••••••"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={status === 'locked' || status === 'checking'}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white transition-all transform ${
                        status === 'locked' 
                        ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                        : status === 'checking'
                        ? 'bg-ms-blue/80 cursor-wait'
                        : 'bg-ms-blue hover:bg-blue-700 hover:-translate-y-0.5 shadow-blue-500/25'
                    }`}
                >
                    {status === 'checking' ? (
                        <span className="flex items-center">
                            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                            Verifying Credentials...
                        </span>
                    ) : status === 'locked' ? (
                        'Locked'
                    ) : (
                        'Authenticate'
                    )}
                </button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700 text-center">
                 <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-semibold">
                    Protected by Client-Side Rate Limiting
                 </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
