
import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { ContentService } from '../services/contentService';
import SEO from '../components/SEO';
import ShareButtons from '../components/ShareButtons';

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? ContentService.getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (article) {
      ContentService.trackPageView();
    }
  }, [article]);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const articleUrl = `https://www.microsoftadmin.in/#/articles/${article.slug}`;

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen py-12">
      <SEO 
        title={`${article.title} | Sayan Ghosh`} 
        description={article.summary} 
        image={article.imageUrl}
        url={articleUrl}
        type="article"
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/articles" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-ms-blue mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Articles
        </Link>
        
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {article.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
            <div className="flex items-center text-slate-700 dark:text-gray-400 text-sm font-medium">
              <Calendar className="w-4 h-4 mr-2" />
              <time>{article.date}</time>
            </div>
            <ShareButtons title={article.title} url={articleUrl} />
          </div>
        </header>

        {article.imageUrl && (
          <div className="w-full h-64 sm:h-96 rounded-xl overflow-hidden mb-10 shadow-sm border border-gray-100 dark:border-slate-800">
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-slate dark:prose-invert max-w-none prose-p:text-slate-800 dark:prose-p:text-slate-300 prose-headings:text-slate-900 dark:prose-headings:text-white prose-li:text-slate-800 dark:prose-li:text-slate-300 prose-strong:text-slate-900 dark:prose-strong:text-white">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
