
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContentService } from '../../services/contentService';
import { ContentStatus, ContentItem, ContentType, ActivityLog, DashboardStats, TrashItem } from '../../types';
import { Plus, Edit, Trash2, FileText, Briefcase, Eye, Database, Activity, RefreshCw, RotateCcw, AlertOctagon, Archive } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type ViewMode = 'active' | 'trash';

const Dashboard: React.FC = () => {
  const [articles, setArticles] = useState<ContentItem[]>([]);
  const [caseStudies, setCaseStudies] = useState<ContentItem[]>([]);
  const [trashItems, setTrashItems] = useState<TrashItem[]>([]);
  const [analyticsData, setAnalyticsData] = useState<{name: string, views: number}[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('active');
  const navigate = useNavigate();

  const loadData = (delay = 400) => {
    // We only set loading true on initial load, not on background refreshes
    if (articles.length === 0) setLoading(true);
    
    setTimeout(() => {
        setArticles(ContentService.getArticles());
        setCaseStudies(ContentService.getCaseStudies());
        setTrashItems(ContentService.getTrash());
        
        const rawAnalytics = ContentService.getAnalytics();
        const chartData = rawAnalytics.map(d => ({
            name: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            views: d.views
        }));
        setAnalyticsData(chartData);
        setLogs(ContentService.getRecentActivity());
        setStats(ContentService.getSystemStats());
        setLoading(false);
    }, delay);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (type: ContentType, id: string) => {
    if (confirm('Are you sure you want to move this item to Trash?')) {
       // 1. Optimistic UI Update (Remove immediately from view)
       if (type === ContentType.Article) {
         setArticles(prev => prev.filter(a => a.id !== id));
         ContentService.deleteArticle(id);
       } else {
         setCaseStudies(prev => prev.filter(c => c.id !== id));
         ContentService.deleteCaseStudy(id);
       }
       
       // 2. Refresh Trash in background
       setTrashItems(ContentService.getTrash());
       setLogs(ContentService.getRecentActivity());
       setStats(ContentService.getSystemStats());
    }
  };

  const handleRestore = (id: string) => {
      // 1. Optimistic UI Update
      setTrashItems(prev => prev.filter(t => t.id !== id));
      
      // 2. Perform Action
      ContentService.restoreItem(id);
      
      // 3. Refresh Lists
      setArticles(ContentService.getArticles());
      setCaseStudies(ContentService.getCaseStudies());
      setLogs(ContentService.getRecentActivity());
  };

  const handlePermanentDelete = (id: string) => {
      if (confirm('This action cannot be undone. Delete permanently?')) {
          setTrashItems(prev => prev.filter(t => t.id !== id));
          ContentService.permanentDelete(id);
          setStats(ContentService.getSystemStats());
      }
  };

  if (loading) {
      return (
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <RefreshCw className="w-8 h-8 text-ms-blue animate-spin mb-4" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">Synchronizing...</p>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    System Status: <span className="text-emerald-600 dark:text-emerald-400 font-bold">Online</span> • Database: <span className="text-blue-600 dark:text-blue-400 font-bold">LocalStorage (v2)</span>
                </p>
            </div>
            <div className="flex space-x-2">
                 <div className="flex bg-white dark:bg-slate-900 p-1 rounded-lg border border-gray-300 dark:border-slate-700 shadow-sm">
                    <button 
                        onClick={() => setViewMode('active')}
                        className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${viewMode === 'active' ? 'bg-ms-blue text-white shadow' : 'text-gray-600 dark:text-gray-400 hover:text-ms-blue'}`}
                    >
                        Active
                    </button>
                    <button 
                        onClick={() => setViewMode('trash')}
                        className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors flex items-center gap-2 ${viewMode === 'trash' ? 'bg-red-600 text-white shadow' : 'text-gray-600 dark:text-gray-400 hover:text-red-600'}`}
                    >
                        <Trash2 size={14} /> Trash
                        {trashItems.length > 0 && <span className="bg-red-100 text-red-800 dark:bg-red-900 text-[10px] px-1.5 py-0.5 rounded-full">{trashItems.length}</span>}
                    </button>
                 </div>
                 <button onClick={() => loadData(300)} className="p-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-500 hover:text-ms-blue transition-colors shadow-sm">
                    <RefreshCw size={20} />
                </button>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Total Views</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stats?.totalViews}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50 text-ms-blue dark:bg-blue-900/50 dark:text-blue-300">
                <Eye className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Content Items</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{(articles.length + caseStudies.length)}</p>
              </div>
              <div className="p-3 rounded-full bg-purple-50 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Activity Logs</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{logs.length}</p>
              </div>
              <div className="p-3 rounded-full bg-orange-50 text-orange-600 dark:bg-orange-900/50 dark:text-orange-300">
                <Activity className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Storage Used</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{((stats?.storageUsedBytes || 0) / 1024).toFixed(2)} KB</p>
              </div>
              <div className="p-3 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-300">
                <Database className="w-6 h-6" />
              </div>
            </div>
             {/* Progress Bar for Storage */}
            <div className="mt-4 w-full bg-gray-200 dark:bg-slate-800 rounded-full h-1.5">
                <div 
                    className="bg-emerald-500 h-1.5 rounded-full" 
                    style={{ width: `${Math.min(((stats?.storageUsedBytes || 0) / (stats?.storageQuotaBytes || 1)) * 100, 100)}%` }}
                ></div>
            </div>
          </div>
        </div>

        {/* Views: Active Content vs Trash */}
        {viewMode === 'active' ? (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {/* Analytics Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-slate-800">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-ms-blue" /> Traffic Overview
                    </h2>
                    <div className="h-72 w-full">
                        {analyticsData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyticsData}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0078D4" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#0078D4" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                                <XAxis 
                                    dataKey="name" 
                                    stroke="#6B7280" 
                                    fontSize={12} 
                                    tickLine={false} 
                                    axisLine={false} 
                                    tickMargin={10}
                                />
                                <YAxis 
                                    stroke="#6B7280" 
                                    fontSize={12} 
                                    tickLine={false} 
                                    axisLine={false} 
                                    tickMargin={10}
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1F2937', 
                                        borderColor: '#374151', 
                                        borderRadius: '8px', 
                                        color: '#F3F4F6',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}
                                    itemStyle={{ color: '#F3F4F6' }}
                                    cursor={{ stroke: '#0078D4', strokeWidth: 1 }}
                                />
                                <Area type="monotone" dataKey="views" stroke="#0078D4" fillOpacity={1} fill="url(#colorViews)" strokeWidth={3} activeDot={{ r: 6 }} />
                            </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-gray-200 dark:border-slate-700">
                                No data available.
                            </div>
                        )}
                    </div>
                </div>

                {/* Activity Log */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-slate-800">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h2>
                    <div className="flow-root">
                        <ul className="-mb-8">
                            {logs.slice(0, 5).map((log, idx) => (
                                <li key={log.id}>
                                    <div className="relative pb-8">
                                        {idx !== 4 && <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-slate-800" aria-hidden="true" />}
                                        <div className="relative flex space-x-3">
                                            <div>
                                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-slate-900 shadow-sm ${
                                                    log.action === 'CREATE' ? 'bg-green-100 text-green-600' :
                                                    log.action === 'DELETE' ? 'bg-red-100 text-red-600' :
                                                    log.action === 'RESTORE' ? 'bg-purple-100 text-purple-600' :
                                                    'bg-blue-100 text-blue-600'
                                                }`}>
                                                    {log.action === 'CREATE' ? <Plus size={14} /> : 
                                                     log.action === 'DELETE' ? <Trash2 size={14} /> :
                                                     log.action === 'RESTORE' ? <RotateCcw size={14} /> : 
                                                     <Edit size={14} />}
                                                </span>
                                            </div>
                                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                <div>
                                                    <p className="text-sm text-slate-900 dark:text-gray-200 font-bold">
                                                        {log.action} <span className="text-gray-500 font-normal">{log.entityType.toLowerCase()}</span>
                                                    </p>
                                                    <p className="text-xs text-gray-500 font-medium">{log.entityTitle}</p>
                                                </div>
                                                <div className="text-right text-xs whitespace-nowrap text-gray-400">
                                                    <time>{new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</time>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Articles List */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md border border-gray-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-800/30">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Articles</h2>
                        <Link to="/admin/article/new" className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-bold rounded-lg text-white bg-ms-blue hover:bg-blue-700 transition-colors shadow-sm transform hover:-translate-y-0.5">
                        <Plus className="w-4 h-4 mr-1" /> New
                        </Link>
                    </div>
                    <ul className="divide-y divide-gray-100 dark:divide-slate-800 max-h-[400px] overflow-y-auto">
                        {articles.length === 0 && <li className="p-6 text-center text-gray-500">No articles found.</li>}
                        {articles.map(article => (
                        <li key={article.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors group">
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-ms-blue transition-colors">{article.title}</p>
                                <div className="flex items-center mt-1">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold shadow-sm ${
                                        article.status === ContentStatus.Published ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {article.status}
                                    </span>
                                    <span className="text-xs text-gray-400 ml-2 font-medium">{article.date}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => navigate(`/admin/article/edit/${article.id}`)} className="p-2 text-gray-500 hover:text-ms-blue hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors border border-gray-200 dark:border-slate-700"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(ContentType.Article, article.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors border border-gray-200 dark:border-slate-700"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>

                {/* Case Studies List */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md border border-gray-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-800/30">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Case Studies</h2>
                        <Link to="/admin/casestudy/new" className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-bold rounded-lg text-white bg-ms-blue hover:bg-blue-700 transition-colors shadow-sm transform hover:-translate-y-0.5">
                        <Plus className="w-4 h-4 mr-1" /> New
                        </Link>
                    </div>
                    <ul className="divide-y divide-gray-100 dark:divide-slate-800 max-h-[400px] overflow-y-auto">
                         {caseStudies.length === 0 && <li className="p-6 text-center text-gray-500">No case studies found.</li>}
                        {caseStudies.map(study => (
                        <li key={study.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors group">
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-ms-blue transition-colors">{study.title}</p>
                                <p className="text-xs text-gray-500 mt-1 flex items-center font-medium">
                                    <Briefcase className="w-3 h-3 mr-1" />
                                    {study.client}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 ml-4 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => navigate(`/admin/casestudy/edit/${study.id}`)} className="p-2 text-gray-500 hover:text-ms-blue hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors border border-gray-200 dark:border-slate-700"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(ContentType.CaseStudy, study.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors border border-gray-200 dark:border-slate-700"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
        ) : (
            /* TRASH VIEW */
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md border border-red-200 dark:border-red-900/30 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center bg-red-50 dark:bg-red-900/10">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Trash2 className="w-5 h-5 text-red-600" /> Recycle Bin
                    </h2>
                    <span className="text-xs text-red-600 dark:text-red-400 font-medium bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-sm border border-red-100 dark:border-red-900/50">
                        {trashItems.length} items
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-800">
                        <thead className="bg-gray-50 dark:bg-slate-800/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Item</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Deleted At</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-slate-800">
                            {trashItems.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        <Archive className="w-12 h-12 mx-auto text-gray-300 dark:text-slate-700 mb-3" />
                                        <p>Trash is empty.</p>
                                    </td>
                                </tr>
                            )}
                            {trashItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</div>
                                        <div className="text-xs text-gray-500">{item.id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full ${
                                            item.originalType === ContentType.Article 
                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                        }`}>
                                            {item.originalType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(item.deletedAt).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => handleRestore(item.id)}
                                            className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 mr-4 font-bold flex items-center justify-end w-full sm:w-auto sm:inline-flex gap-1"
                                        >
                                            <RotateCcw size={14} /> Restore
                                        </button>
                                        <button 
                                            onClick={() => handlePermanentDelete(item.id)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 flex items-center justify-end w-full sm:w-auto sm:inline-flex gap-1 mt-2 sm:mt-0 font-bold"
                                        >
                                            <AlertOctagon size={14} /> Delete Forever
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
