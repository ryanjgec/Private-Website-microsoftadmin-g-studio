
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../App';
import { Lock, ArrowLeft, ShieldCheck } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'sayan@microsoftadmin.in' && password === 'admin123') {
      login({ name: 'Sayan Ghosh', email, role: 'admin' });
      navigate('/admin');
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-1/4 top-0 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-ms-blue mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/70 border border-white/50 dark:border-slate-700/50 shadow-2xl rounded-2xl p-8 sm:p-10 ring-1 ring-gray-900/5">
            <div className="text-center mb-8">
                <div className="mx-auto h-12 w-12 bg-ms-blue rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <h2 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Admin Portal
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Secure access for content management
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <p className="text-red-600 dark:text-red-400 text-sm text-center font-medium">{error}</p>
                    </div>
                )}
                
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email address</label>
                    <div className="relative">
                        <input 
                            type="email" 
                            required 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            className="block w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-slate-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-ms-blue focus:border-transparent dark:bg-slate-800/50 dark:border-slate-600 dark:text-white transition-all"
                            placeholder="admin@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                    <input 
                        type="password" 
                        required 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        className="block w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-slate-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-ms-blue focus:border-transparent dark:bg-slate-800/50 dark:border-slate-600 dark:text-white transition-all"
                        placeholder="••••••••"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg shadow-blue-500/25 text-sm font-bold text-white bg-ms-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ms-blue transition-all transform hover:-translate-y-0.5"
                >
                    Authenticate
                </button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700 text-center">
                 <p className="text-xs text-gray-400 dark:text-gray-500">
                    Protected by Azure AD Identity Services (Simulated)
                 </p>
                 <div className="mt-2 text-xs text-gray-300 select-all">
                    Hint: sayan@microsoftadmin.in / admin123
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
