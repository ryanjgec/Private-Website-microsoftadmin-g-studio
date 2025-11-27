
import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthState, User, ContentType } from './types';

// Components
import Layout from './components/Layout';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Contact from './pages/Contact';
import Experience from './pages/Experience'; // Used for the "About" page
import Legal from './pages/Legal';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Editor from './pages/admin/Editor';
import ResumeModal from './components/ResumeModal';

// Contexts
export const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export const AuthContext = createContext<{
  auth: AuthState;
  login: (user: User) => void;
  logout: () => void;
}>({
  auth: { user: null, isAuthenticated: false },
  login: () => {},
  logout: () => {},
});

export const ResumeContext = createContext<{
  isResumeModalOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
}>({
  isResumeModalOpen: false,
  openResumeModal: () => {},
  closeResumeModal: () => {},
});

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useContext(AuthContext);
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  // Theme State
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newVal = !prev;
      if (newVal) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      }
      return newVal;
    });
  };

  // Auth State
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('msadmin_auth');
    return saved ? JSON.parse(saved) : { user: null, isAuthenticated: false };
  });

  const login = (user: User) => {
    const newState = { user, isAuthenticated: true };
    setAuth(newState);
    localStorage.setItem('msadmin_auth', JSON.stringify(newState));
  };

  const logout = () => {
    const newState = { user: null, isAuthenticated: false };
    setAuth(newState);
    localStorage.removeItem('msadmin_auth');
  };

  // Resume Modal State
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const openResumeModal = () => setIsResumeModalOpen(true);
  const closeResumeModal = () => setIsResumeModalOpen(false);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <AuthContext.Provider value={{ auth, login, logout }}>
        <ResumeContext.Provider value={{ isResumeModalOpen, openResumeModal, closeResumeModal }}>
          <HashRouter>
            <ScrollToTop />
            <ResumeModal />
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              {/* Merged About & Experience Page */}
              <Route path="/about" element={<Layout><Experience /></Layout>} />
              
              <Route path="/articles" element={<Layout><Articles /></Layout>} />
              <Route path="/articles/:slug" element={<Layout><ArticleDetail /></Layout>} />
              <Route path="/case-studies" element={<Layout><CaseStudies /></Layout>} />
              <Route path="/case-studies/:slug" element={<Layout><CaseStudyDetail /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/legal" element={<Layout><Legal /></Layout>} />
              
              {/* Admin Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
              <Route path="/admin/article/new" element={<ProtectedRoute><Layout><Editor type={ContentType.Article} /></Layout></ProtectedRoute>} />
              <Route path="/admin/article/edit/:id" element={<ProtectedRoute><Layout><Editor type={ContentType.Article} /></Layout></ProtectedRoute>} />
              <Route path="/admin/casestudy/new" element={<ProtectedRoute><Layout><Editor type={ContentType.CaseStudy} /></Layout></ProtectedRoute>} />
              <Route path="/admin/casestudy/edit/:id" element={<ProtectedRoute><Layout><Editor type={ContentType.CaseStudy} /></Layout></ProtectedRoute>} />
            </Routes>
          </HashRouter>
        </ResumeContext.Provider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
