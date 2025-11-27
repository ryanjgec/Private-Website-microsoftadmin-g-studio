
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ContentService } from '../services/contentService';
import { ContentStatus, ContentItem } from '../types';

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      setArticles(ContentService.getArticles().filter(a => a.status === ContentStatus.Published));
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Articles</h1>
          <p className="mt-4 text-xl text-slate-600 dark:text-gray-400 font-medium">
            Technical guides, best practices, and scripts.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
             // Skeletons
             [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden h-[400px]">
                  <div className="h-48 bg-gray-200 dark:bg-slate-800 animate-pulse" />
                  <div className="p-6 flex-1 space-y-4">
                    <div className="flex gap-2">
                        <div className="h-5 w-20 bg-gray-200 dark:bg-slate-800 animate-pulse rounded-full" />
                        <div className="h-5 w-16 bg-gray-200 dark:bg-slate-800 animate-pulse rounded-full" />
                    </div>
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-800 animate-pulse rounded" />
                    <div className="space-y-2 pt-2">
                       <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 animate-pulse rounded" />
                       <div className="h-4 w-5/6 bg-gray-200 dark:bg-slate-800 animate-pulse rounded" />
                       <div className="h-4 w-4/6 bg-gray-200 dark:bg-slate-800 animate-pulse rounded" />
                    </div>
                    <div className="pt-4 mt-auto">
                        <div className="h-4 w-32 bg-gray-200 dark:bg-slate-800 animate-pulse rounded" />
                    </div>
                  </div>
                </div>
             ))
          ) : (
             articles.map((article) => (
                <Link key={article.id} to={`/articles/${article.slug}`} className="flex flex-col bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all">
                <div className="h-48 w-full bg-gray-200 relative">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                    <div className="flex space-x-2 mb-3">
                        {article.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {tag}
                        </span>
                        ))}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{article.title}</h3>
                    <p className="text-slate-700 dark:text-gray-400 text-sm line-clamp-3 font-medium dark:font-normal">{article.summary}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800 text-sm text-slate-500 dark:text-gray-500 font-semibold">
                    Published: {article.date}
                    </div>
                </div>
                </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Articles;
