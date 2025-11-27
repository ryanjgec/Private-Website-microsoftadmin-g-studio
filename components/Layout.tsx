import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext, AuthContext, ResumeContext } from '../App';
import { Menu, X, Sun, Moon, Shield, Linkedin, Mail, LogOut, LayoutDashboard } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { auth, logout } = useContext(AuthContext);
  const { openResumeModal } = useContext(ResumeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-ms-light dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                <div className="p-1.5 bg-ms-blue rounded-lg group-hover:bg-blue-700 transition-colors">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                    Sayan Ghosh
                  </h1>
                  <span className="text-xs text-ms-blue font-medium tracking-wider uppercase">Microsoft 365 Admin</span>
                </div>
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
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
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
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-emerald-600"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-ms-blue" />
                <span className="text-lg font-bold text-slate-900 dark:text-white">Sayan Ghosh</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-sm">
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
                <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue">Home</Link></li>
                <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue">About</Link></li>
                <li><Link to="/articles" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue">Articles</Link></li>
                <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/articles" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue">Articles</Link></li>
                <li><Link to="/case-studies" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue">Case Studies</Link></li>
                <li>
                  <button onClick={openResumeModal} className="text-gray-600 dark:text-gray-400 hover:text-ms-blue text-left">
                    Download Resume
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Sayan Ghosh. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
              www.microsoftadmin.in
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;