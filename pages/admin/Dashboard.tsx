import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContentService } from '../../services/contentService';
import { ContentStatus, ContentItem, ContentType } from '../../types';
import { Plus, Edit, Trash2, FileText, Briefcase, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  const [articles, setArticles] = useState<ContentItem[]>([]);
  const [caseStudies, setCaseStudies] = useState<ContentItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setArticles(ContentService.getArticles());
    setCaseStudies(ContentService.getCaseStudies());
  }, []);

  const handleDelete = (type: ContentType, id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
       if (type === ContentType.Article) {
         ContentService.deleteArticle(id);
         setArticles(ContentService.getArticles());
       } else {
         ContentService.deleteCaseStudy(id);
         setCaseStudies(ContentService.getCaseStudies());
       }
    }
  };

  // Mock data for the chart
  const data = [
    { name: 'Mon', views: 400 },
    { name: 'Tue', views: 300 },
    { name: 'Wed', views: 550 },
    { name: 'Thu', views: 450 },
    { name: 'Fri', views: 600 },
    { name: 'Sat', views: 200 },
    { name: 'Sun', views: 250 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-ms-blue dark:bg-blue-900 dark:text-blue-300">
                <FileText className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Articles</p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-white">{articles.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Case Studies</p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-white">{caseStudies.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                <Eye className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Views (7d)</p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-white">2,750</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800 mb-12">
           <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-6">Traffic Overview</h2>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
                 <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
                 <Bar dataKey="views" fill="#0078D4" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Content Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Articles List */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-lg font-medium text-slate-900 dark:text-white">Articles</h2>
                <Link to="/admin/article/new" className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-ms-blue hover:bg-blue-700">
                   <Plus className="w-4 h-4 mr-1" /> New
                </Link>
             </div>
             <ul className="divide-y divide-gray-200 dark:divide-slate-800">
                {articles.map(article => (
                   <li key={article.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                      <div className="min-w-0 flex-1">
                         <p className="text-sm font-medium text-ms-blue truncate">{article.title}</p>
                         <p className="text-xs text-gray-500">{article.status} • {article.date}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                         <button onClick={() => navigate(`/admin/article/edit/${article.id}`)} className="text-gray-400 hover:text-ms-blue"><Edit className="w-4 h-4" /></button>
                         <button onClick={() => handleDelete(ContentType.Article, article.id)} className="text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                   </li>
                ))}
             </ul>
          </div>

          {/* Case Studies List */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-lg font-medium text-slate-900 dark:text-white">Case Studies</h2>
                <Link to="/admin/casestudy/new" className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-ms-blue hover:bg-blue-700">
                   <Plus className="w-4 h-4 mr-1" /> New
                </Link>
             </div>
             <ul className="divide-y divide-gray-200 dark:divide-slate-800">
                {caseStudies.map(study => (
                   <li key={study.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                      <div className="min-w-0 flex-1">
                         <p className="text-sm font-medium text-ms-blue truncate">{study.title}</p>
                         <p className="text-xs text-gray-500">{study.client}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                         <button onClick={() => navigate(`/admin/casestudy/edit/${study.id}`)} className="text-gray-400 hover:text-ms-blue"><Edit className="w-4 h-4" /></button>
                         <button onClick={() => handleDelete(ContentType.CaseStudy, study.id)} className="text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                   </li>
                ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;