import React from 'react';
import { Link } from 'react-router-dom';
import { ContentService } from '../services/contentService';
import { ContentStatus } from '../types';

const Articles: React.FC = () => {
  const articles = ContentService.getArticles().filter(a => a.status === ContentStatus.Published);

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Articles</h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Technical guides, best practices, and scripts.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.id} to={`/articles/${article.slug}`} className="flex flex-col bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all">
              <div className="h-48 w-full bg-gray-200 relative">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex space-x-2 mb-3">
                    {article.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{article.summary}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800 text-sm text-gray-500 dark:text-gray-500">
                  Published: {article.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;