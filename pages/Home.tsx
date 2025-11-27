import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Server, ShieldCheck, Users, Cloud, Terminal, 
  Smartphone, Layout, ArrowRight 
} from 'lucide-react';
import { ContentService } from '../services/contentService';
import { ContentStatus } from '../types';

const Home: React.FC = () => {
  const articles = ContentService.getArticles().filter(a => a.status === ContentStatus.Published).slice(0, 3);
  const caseStudies = ContentService.getCaseStudies().filter(c => c.status === ContentStatus.Published).slice(0, 3);

  const expertise = [
    { icon: <Layout className="w-6 h-6" />, title: 'Microsoft 365 Administration', desc: 'Holistic tenant management & optimization' },
    { icon: <Smartphone className="w-6 h-6" />, title: 'Intune MDM', desc: 'Device compliance, Autopilot & MAM policies' },
    { icon: <Server className="w-6 h-6" />, title: 'Exchange Online', desc: 'Hybrid migrations & mail flow management' },
    { icon: <ShieldCheck className="w-6 h-6" />, title: 'Entra ID & Security', desc: 'Conditional Access & Identity Governance' },
    { icon: <Users className="w-6 h-6" />, title: 'Teams & OneDrive', desc: 'Collaboration security & governance' },
    { icon: <Terminal className="w-6 h-6" />, title: 'PowerShell Automation', desc: 'Scripting for bulk operations & reporting' },
    { icon: <ShieldCheck className="w-6 h-6" />, title: 'Defender Security', desc: 'Threat protection & vulnerability management' },
    { icon: <Cloud className="w-6 h-6" />, title: 'Multi-Tenant Mgmt', desc: 'Enterprise-scale architecture support' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 pt-16 pb-20 lg:pt-32 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Modern Workplace Engineer</span>
              <span className="block text-ms-blue mt-2">Sayan Ghosh</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Identity-Driven. Security-Focused. Outcome-Obsessed.
              <br className="hidden md:inline" /> 4+ years delivering stable, secure M365 environments across global enterprises.
            </p>
            <div className="mt-10 sm:flex sm:justify-center gap-4">
              <div className="rounded-md shadow">
                <Link to="/experience" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-ms-blue hover:bg-blue-700 md:py-4 md:text-lg transition-all hover:shadow-lg">
                  View Experience
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link to="/articles" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-ms-blue bg-blue-100 hover:bg-blue-200 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-700 md:py-4 md:text-lg transition-all">
                  Read Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunity Banner */}
      <div className="bg-ms-blue text-white">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-blue-800">
                <ShieldCheck className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <p className="ml-3 font-medium text-white truncate">
                <span className="md:hidden">Available for new roles!</span>
                <span className="hidden md:inline">Currently serving notice period • Available for M365 Admin Roles</span>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a
                href="#"
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-ms-blue bg-white hover:bg-blue-50"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About / Expertise Grid */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-ms-blue font-semibold tracking-wide uppercase">Core Expertise</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              What I Bring to the Table
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertise.map((item, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                <div className="text-ms-blue mb-4">{item.icon}</div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Knowledge Base</h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Technical deep dives and guides.</p>
            </div>
            <Link to="/articles" className="hidden sm:flex items-center text-ms-blue hover:text-blue-700 font-medium">
              View all <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {articles.map((article) => (
              <Link key={article.id} to={`/articles/${article.slug}`} className="group flex flex-col rounded-lg overflow-hidden border border-gray-200 dark:border-slate-800 hover:shadow-lg transition-all">
                <div className="flex-shrink-0 h-48 w-full overflow-hidden bg-gray-200">
                  <img className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" src={article.imageUrl} alt={article.title} />
                </div>
                <div className="flex-1 bg-white dark:bg-slate-800 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ms-blue mb-2">
                      {article.tags[0]}
                    </p>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-ms-blue transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-base text-gray-500 dark:text-gray-400 line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={article.date}>{article.date}</time>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

       {/* Featured Case Studies */}
       <section className="py-20 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Case Studies</h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Real-world problems, engineered solutions.</p>
            </div>
            <Link to="/case-studies" className="hidden sm:flex items-center text-ms-blue hover:text-blue-700 font-medium">
              View all <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {caseStudies.map((study) => (
              <Link key={study.id} to={`/case-studies/${study.slug}`} className="relative group bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-slate-800 hover:border-ms-blue dark:hover:border-ms-blue transition-all">
                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-ms-blue text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                  {study.client}
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-ms-blue">
                  {study.title}
                </h3>
                <div className="mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {study.environment}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {study.summary}
                </p>
                <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                   <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Outcome: {study.outcome}
                   </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;