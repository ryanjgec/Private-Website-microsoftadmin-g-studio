
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ContentService } from '../services/contentService';
import { ContentStatus, ContentItem } from '../types';
import { ArrowRight } from 'lucide-react';

const CaseStudies: React.FC = () => {
  const [studies, setStudies] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setStudies(ContentService.getCaseStudies().filter(s => s.status === ContentStatus.Published));
        setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Case Studies</h1>
          <p className="mt-4 text-xl text-slate-600 dark:text-gray-400 font-medium">
            Solving complex problems at enterprise scale.
          </p>
        </div>

        <div className="space-y-12">
          {loading ? (
             // Skeletons
             [1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col lg:flex-row bg-gray-50 dark:bg-slate-950 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 shadow-sm h-[350px] lg:h-[280px]">
                   <div className="lg:w-1/3 bg-gray-200 dark:bg-slate-800 animate-pulse" />
                   <div className="flex-1 p-8 flex flex-col justify-center space-y-4">
                      <div className="flex justify-between items-center">
                         <div className="h-4 w-32 bg-gray-200 dark:bg-slate-800 animate-pulse rounded" />
                         <div className="h-4 w-24 bg-gray-200 dark:bg-slate-800 animate-pulse rounded" />
                      </div>
                      <div className="h-8 w-3/4 bg-gray-200 dark:bg-slate-800 animate-pulse rounded" />
                      <div className="space-y-3">
                         <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 animate-pulse rounded" />
                         <div className="h-4 w-5/6 bg-gray-200 dark:bg-slate-800 animate-pulse rounded" />
                      </div>
                      <div className="pt-2">
                         <div className="h-5 w-40 bg-gray-200 dark:bg-slate-800 animate-pulse rounded" />
                      </div>
                   </div>
                </div>
             ))
          ) : (
            studies.map((study, idx) => (
                <div key={study.id} className="flex flex-col lg:flex-row bg-gray-50 dark:bg-slate-950 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                   <div className="lg:w-1/3 bg-gray-200">
                      <img src={study.imageUrl} alt={study.title} className="w-full h-full object-cover min-h-[250px]" />
                   </div>
                   <div className="flex-1 p-8 flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-4">
                         <span className="text-sm font-bold text-ms-blue tracking-wide uppercase">{study.client}</span>
                         <span className="text-sm font-semibold text-slate-500 dark:text-gray-400">{study.date}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        {study.title}
                      </h3>
                      <div className="mb-6">
                        <p className="text-slate-700 dark:text-gray-300 mb-2 font-medium"><strong className="text-slate-900 dark:text-white">Environment:</strong> {study.environment}</p>
                        <p className="text-slate-700 dark:text-gray-300 font-medium"><strong className="text-slate-900 dark:text-white">Outcome:</strong> {study.outcome}</p>
                      </div>
                      <Link to={`/case-studies/${study.slug}`} className="inline-flex items-center font-bold text-ms-blue hover:text-blue-700">
                        Read Full Study <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                   </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
