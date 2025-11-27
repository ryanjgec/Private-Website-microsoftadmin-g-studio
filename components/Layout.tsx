
import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext, AuthContext, ResumeContext } from '../App';
import { Menu, X, Sun, Moon, Linkedin, Mail, LogOut, LayoutDashboard, ArrowUp } from 'lucide-react';

const Logo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
    {/* Icon Circle */}
    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0078D4] text-white font-bold text-sm sm:text-lg tracking-tight shadow-sm shrink-0">
      SG
    </div>
    {/* Text Stack */}
    <div className="flex flex-col justify-center">
      <div className="flex flex-col sm:flex-row sm:gap-1 leading-none">
        <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight uppercase">SAYAN</span>
        <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight uppercase">GHOSH</span>
      </div>
      <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 leading-none mt-0.5 sm:mt-1 tracking-wide">
        microsoftadmin.in
      </span>
    </div>
  </div>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { auth, logout } = useContext(AuthContext);
  const { openResumeModal } = useContext(ResumeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' }, 
    { name: 'Articles', path: '/articles' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-ms-light dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center group">
                <Logo />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-ms-blue bg-blue-50 dark:bg-slate-800'
                      : 'text-gray-600 dark:text-gray-300 hover:text-ms-blue hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {auth.isAuthenticated && (
                 <Link
                 to="/admin"
                 className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
               >
                 <LayoutDashboard size={16} />
                 Admin
               </Link>
              )}

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {auth.isAuthenticated ? (
                <button
                onClick={handleLogout}
                className="ml-2 flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                <LogOut size={16} />
              </button>
              ) : (
                <Link to="/login" className="text-xs text-gray-400 hover:text-ms-blue">Login</Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-xl">
            <div className="px-4 pt-2 pb-4 space-y-2 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'text-ms-blue bg-blue-50 dark:bg-slate-800'
                      : 'text-gray-700 dark:text-gray-300 hover:text-ms-blue hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {auth.isAuthenticated && (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-emerald-600 bg-emerald-50/50"
                >
                  Admin Dashboard
                </Link>
              )}
              <div className="border-t border-gray-100 dark:border-slate-800 pt-3 mt-2">
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Scroll To Top Button */}
      <button 
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-ms-blue text-white shadow-lg hover:bg-blue-700 transition-all duration-300 z-40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ms-blue ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowUp size={24} />
      </button>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                 <Logo className="scale-90 origin-left opacity-90" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-sm text-sm">
                Modern Workplace Engineer specialized in securing and optimizing Microsoft 365 environments.
                Identity-Driven, Security-Focused, Outcome-Obsessed.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/sayankghosh/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-ms-blue transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="mailto:sayan@microsoftadmin.in" className="text-gray-400 hover:text-ms-blue transition-colors">
                  <Mail size={24} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue text-sm">Home</Link></li>
                <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue text-sm">About</Link></li>
                <li><Link to="/articles" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue text-sm">Articles</Link></li>
                <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue text-sm">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Legal & Privacy</h3>
              <ul className="space-y-2">
                <li><Link to="/legal#terms" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue text-sm">Terms & Conditions</Link></li>
                <li><Link to="/legal#privacy" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue text-sm">Privacy Policy</Link></li>
                <li><Link to="/legal#disclaimer" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue text-sm">Disclaimer</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Sayan Ghosh. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0 font-medium">
              microsoftadmin.in
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
