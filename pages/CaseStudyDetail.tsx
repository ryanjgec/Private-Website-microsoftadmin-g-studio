
import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { ContentService } from '../services/contentService';
import SEO from '../components/SEO';
import ShareButtons from '../components/ShareButtons';

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? ContentService.getCaseStudyBySlug(slug) : undefined;

  useEffect(() => {
    if (study) {
      ContentService.trackPageView();
    }
  }, [study]);

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  const studyUrl = `https://www.microsoftadmin.in/#/case-studies/${study.slug}`;

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen py-12">
      <SEO 
        title={`${study.title} | Case Study`} 
        description={study.summary} 
        image={study.imageUrl}
        url={studyUrl}
        type="article"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/case-studies" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-ms-blue mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Case Studies
        </Link>
        
        <header className="mb-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-ms-blue text-sm font-bold mb-4 dark:bg-slate-800 dark:text-blue-400">
            Client: {study.client}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            {study.title}
          </h1>
          
          <div className="flex justify-center mb-8">
             <ShareButtons title={study.title} url={studyUrl} />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 text-left max-w-2xl mx-auto bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700">
             <div className="flex-1">
                <p className="text-sm text-slate-500 dark:text-gray-400 font-bold uppercase tracking-wide mb-1">Environment</p>
                <p className="text-slate-900 dark:text-white font-bold">{study.environment}</p>
             </div>
             <div className="flex-1 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700 pt-4 sm:pt-0 sm:pl-6">
                <p className="text-sm text-slate-500 dark:text-gray-400 font-bold uppercase tracking-wide mb-1">Core Outcome</p>
                <p className="text-emerald-700 dark:text-emerald-400 font-bold">{study.outcome}</p>
             </div>
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-p:text-slate-800 dark:prose-p:text-slate-300 prose-headings:text-slate-900 dark:prose-headings:text-white prose-li:text-slate-800 dark:prose-li:text-slate-300 prose-strong:text-slate-900 dark:prose-strong:text-white">
          <ReactMarkdown>{study.content}</ReactMarkdown>
        </div>

        <div className="mt-12 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900 p-6 rounded-lg">
          <h3 className="flex items-center text-lg font-bold text-emerald-800 dark:text-emerald-400 mb-2">
            <CheckCircle className="w-5 h-5 mr-2" />
            Project Success
          </h3>
          <p className="text-emerald-900 dark:text-emerald-200 font-medium">
            {study.outcome}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
