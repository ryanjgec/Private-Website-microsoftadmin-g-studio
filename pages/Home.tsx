
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Server, ShieldCheck, Users, Cloud, Terminal, 
  Smartphone, Layout, ArrowRight, Download, Briefcase
} from 'lucide-react';
import { ContentService } from '../services/contentService';
import { ContentStatus, ContentItem } from '../types';
import { ResumeContext } from '../App';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const [featuredArticles, setFeaturedArticles] = useState<ContentItem[]>([]);
  const [featuredCaseStudies, setFeaturedCaseStudies] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { openResumeModal } = useContext(ResumeContext);

  useEffect(() => {
    ContentService.trackPageView();
    
    // Simulate data fetching delay for UX
    const timer = setTimeout(() => {
        setFeaturedArticles(ContentService.getArticles().filter(a => a.status === ContentStatus.Published).slice(0, 3));
        setFeaturedCaseStudies(ContentService.getCaseStudies().filter(c => c.status === ContentStatus.Published).slice(0, 3));
        setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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
        description="Driving reliable, compliant, and secure Microsoft 365 operations at scale. Hands-on experience with Exchange, Teams, Azure AD, and Intune."
        url="https://www.microsoftadmin.in/"
      />
      
      {/* Hero Section - Glass Card + Grid Pattern */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 pt-16 pb-20">
        
        {/* Background Grid & ambient glows */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none"></div>
          <div className="absolute right-0 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-white/50 dark:border-slate-700/50 shadow-2xl rounded-3xl p-8 md:p-14 lg:p-16 ring-1 ring-gray-900/5 text-center transform transition-all hover:scale-[1.01] duration-500">
              
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-ms-blue dark:text-blue-300 text-xs font-bold tracking-widest uppercase mb-8 border border-blue-200 dark:border-blue-800 shadow-sm">
                 Microsoft 365 Administrator
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-8">
                 Driving reliable, compliant, and secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-ms-blue to-blue-600">Microsoft 365 operations</span> at scale.
              </h1>
              
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-700 dark:text-gray-300 leading-relaxed mb-12 font-medium dark:font-light">
                 Hands-on experience running multi-region tenants with deep expertise in Exchange, Teams, Azure AD, Intune, PowerShell for scripting/automation, and advanced troubleshooting.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                 <Link 
                   to="/case-studies" 
                   className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-ms-blue hover:bg-blue-700 shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-200"
                 >
                   <Briefcase className="w-5 h-5 mr-2" />
                   View Case Studies
                 </Link>
                 
                 <button 
                   onClick={openResumeModal} 
                   className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-gray-300 dark:border-slate-600 text-base font-bold rounded-xl text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                 >
                   <Download className="w-5 h-5 mr-2" />
                   Download Resume
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
                <p className="text-sm text-slate-600 dark:text-gray-400 leading-snug font-medium">{item.desc}</p>
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
              <p className="mt-2 text-slate-600 dark:text-gray-400 text-lg">Knowledge base & technical guides.</p>
            </div>
            <Link to="/articles" className="hidden sm:flex items-center text-ms-blue hover:text-blue-700 font-bold transition-colors">
              View all <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {loading ? (
              // Loading Skeletons for Articles
              [1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm h-full">
                  <div className="h-52 w-full bg-gray-200 dark:bg-slate-700 animate-pulse" />
                  <div className="flex-1 p-8 flex flex-col space-y-4">
                     <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 animate-pulse rounded" />
                     <div className="h-8 w-full bg-gray-200 dark:bg-slate-700 animate-pulse rounded" />
                     <div className="space-y-2 flex-1">
                        <div className="h-4 w-full bg-gray-200 dark:bg-slate-700 animate-pulse rounded" />
                        <div className="h-4 w-5/6 bg-gray-200 dark:bg-slate-700 animate-pulse rounded" />
                        <div className="h-4 w-4/6 bg-gray-200 dark:bg-slate-700 animate-pulse rounded" />
                     </div>
                  </div>
                </div>
              ))
            ) : (
              featuredArticles.map((article) => (
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
                      <p className="text-base text-slate-700 dark:text-gray-400 line-clamp-3 leading-relaxed font-medium dark:font-normal">
                        {article.summary}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            )}
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
              <p className="mt-2 text-slate-600 dark:text-gray-400 text-lg">Solving problems at scale.</p>
            </div>
            <Link to="/case-studies" className="hidden sm:flex items-center text-ms-blue hover:text-blue-700 font-bold transition-colors">
              View all <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {loading ? (
                // Loading Skeletons for Case Studies
                [1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-50 dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 h-full animate-pulse">
                     <div className="flex justify-end mb-6">
                        <div className="h-6 w-24 bg-gray-200 dark:bg-slate-800 rounded-full" />
                     </div>
                     <div className="space-y-4 mb-6">
                        <div className="h-8 w-3/4 bg-gray-200 dark:bg-slate-800 rounded" />
                        <div className="h-6 w-1/3 bg-gray-200 dark:bg-slate-800 rounded" />
                     </div>
                     <div className="space-y-2 mb-6">
                        <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 rounded" />
                        <div className="h-4 w-5/6 bg-gray-200 dark:bg-slate-800 rounded" />
                     </div>
                     <div className="border-t border-gray-200 dark:border-slate-800 pt-6">
                        <div className="h-5 w-1/2 bg-gray-200 dark:bg-slate-800 rounded" />
                     </div>
                  </div>
                ))
            ) : (
                featuredCaseStudies.map((study) => (
                <Link key={study.id} to={`/case-studies/${study.slug}`} className="relative group bg-gray-50 dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute top-6 right-6">
                    <div className="bg-white dark:bg-slate-800 text-ms-blue text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-gray-100 dark:border-slate-700">
                        {study.client}
                    </div>
                    </div>
                    <div className="mt-8 mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-ms-blue transition-colors">
                        {study.title}
                    </h3>
                    <div className="inline-block px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs font-bold">
                        {study.environment}
                    </div>
                    </div>
                    <p className="text-slate-700 dark:text-gray-400 mb-6 leading-relaxed font-medium dark:font-normal">
                    {study.summary}
                    </p>
                    <div className="pt-6 border-t border-gray-200 dark:border-slate-800 flex items-center text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Outcome: {study.outcome}
                    </div>
                </Link>
                ))
            )}
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
