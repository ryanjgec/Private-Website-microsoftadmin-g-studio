import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  Server, ShieldCheck, Users, Cloud, Terminal, 
  Smartphone, Layout, ArrowRight, Download 
} from 'lucide-react';
import { ContentService } from '../services/contentService';
import { ContentStatus } from '../types';
import { ResumeContext } from '../App';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const articles = ContentService.getArticles().filter(a => a.status === ContentStatus.Published).slice(0, 3);
  const caseStudies = ContentService.getCaseStudies().filter(c => c.status === ContentStatus.Published).slice(0, 3);
  const { openResumeModal } = useContext(ResumeContext);

  const expertise = [
    { icon: <Layout className="w-6 h-6" />, title: 'M365 Admin', desc: 'Holistic tenant management & optimization' },
    { icon: <Smartphone className="w-6 h-6" />, title: 'Intune MDM', desc: 'Device compliance, Autopilot & MAM policies' },
    { icon: <Server className="w-6 h-6" />, title: 'Exchange Online', desc: 'Hybrid migrations & mail flow management' },
    { icon: <ShieldCheck className="w-6 h-6" />, title: 'Entra ID', desc: 'Conditional Access & Identity Governance' },
    { icon: <Users className="w-6 h-6" />, title: 'Teams', desc: 'Collaboration security & governance' },
    { icon: <Terminal className="w-6 h-6" />, title: 'PowerShell', desc: 'Scripting for bulk operations & reporting' },
    { icon: <ShieldCheck className="w-6 h-6" />, title: 'Defender', desc: 'Threat protection & vulnerability management' },
    { icon: <Cloud className="w-6 h-6" />, title: 'Multi-Tenant', desc: 'Enterprise-scale architecture support' },
  ];

  return (
    <div>
      <SEO 
        title="Sayan Ghosh | Microsoft 365 Administrator" 
        description="Modern Workplace Engineer specializing in Microsoft 365, Exchange Online, Intune, and Entra ID security. Identity-Driven, Security-Focused, Outcome-Obsessed."
        url="https://www.microsoftadmin.in/"
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 pt-20 pb-24 lg:pt-32 lg:pb-32">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-emerald-100 dark:bg-emerald-900/10 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-ms-blue text-sm font-bold tracking-wide uppercase mb-6 dark:bg-blue-900/30 dark:text-blue-300">
              Modern Workplace Engineer
            </span>
            <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 dark:text-white sm:text-5xl md:text-7xl">
              <span className="block mb-2">Secure. Automate.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-ms-blue to-blue-600 pb-2">
                Optimize Microsoft 365.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 md:text-xl leading-relaxed">
              I am <span className="font-semibold text-slate-900 dark:text-white">Sayan Ghosh</span>. I help global enterprises build resilient, identity-driven cloud environments.
              <br className="hidden md:inline" /> 4+ years of expertise in Exchange, Intune, and Entra ID.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/case-studies" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-ms-blue hover:bg-blue-700 shadow-lg shadow-blue-500/30 hover:-translate-y-1 transition-all duration-200">
                View My Work
              </Link>
              <button onClick={openResumeModal} className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-gray-200 dark:border-slate-700 text-base font-bold rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 shadow-sm hover:shadow-md transition-all duration-200 group">
                <Download className="w-5 h-5 mr-2 text-gray-400 group-hover:text-ms-blue transition-colors" />
                Resume
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunity Banner */}
      <div className="bg-ms-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-ms-blue opacity-50"></div>
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <p className="font-medium text-white text-lg">
              Currently serving notice period • <span className="font-bold border-b border-white/30">Available for M365 Administration Roles</span>
            </p>
          </div>
        </div>
      </div>

      {/* Expertise Grid */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-ms-blue tracking-widest uppercase mb-2">Expertise</h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Technical Arsenal
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {expertise.map((item, index) => (
              <div key={index} className="group bg-gray-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1">
                <div className="text-gray-400 group-hover:text-ms-blue transition-colors duration-300 mb-4 bg-white dark:bg-slate-800 w-12 h-12 rounded-lg flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Latest Insights</h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-lg">Knowledge base & technical guides.</p>
            </div>
            <Link to="/articles" className="hidden sm:flex items-center text-ms-blue hover:text-blue-700 font-bold transition-colors">
              View all <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {articles.map((article) => (
              <Link key={article.id} to={`/articles/${article.slug}`} className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1">
                <div className="flex-shrink-0 h-52 w-full overflow-hidden">
                  <img className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" src={article.imageUrl} alt={article.title} />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-bold text-ms-blue uppercase tracking-wide mb-3">
                      {article.tags[0]}
                    </p>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-ms-blue transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-base text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/articles" className="inline-flex items-center text-ms-blue font-bold">
               View all articles <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

       {/* Featured Case Studies */}
       <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Case Studies</h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-lg">Solving problems at scale.</p>
            </div>
            <Link to="/case-studies" className="hidden sm:flex items-center text-ms-blue hover:text-blue-700 font-bold transition-colors">
              View all <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {caseStudies.map((study) => (
              <Link key={study.id} to={`/case-studies/${study.slug}`} className="relative group bg-gray-50 dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-6 right-6">
                   <div className="bg-white dark:bg-slate-800 text-ms-blue text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {study.client}
                   </div>
                </div>
                <div className="mt-8 mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-ms-blue transition-colors">
                    {study.title}
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                    {study.environment}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {study.summary}
                </p>
                <div className="pt-6 border-t border-gray-200 dark:border-slate-800 flex items-center text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                   <ShieldCheck className="w-4 h-4 mr-2" />
                   Outcome: {study.outcome}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/case-studies" className="inline-flex items-center text-ms-blue font-bold">
               View all case studies <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;