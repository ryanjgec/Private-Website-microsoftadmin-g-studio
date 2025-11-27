import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContentType, ContentItem, ContentStatus } from '../../types';
import { ContentService } from '../../services/contentService';
import { ArrowLeft, Save } from 'lucide-react';

interface EditorProps {
  type: ContentType;
}

const Editor: React.FC<EditorProps> = ({ type }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;
  const isCaseStudy = type === ContentType.CaseStudy;

  const [formData, setFormData] = useState<ContentItem>({
    id: crypto.randomUUID(),
    title: '',
    slug: '',
    summary: '',
    content: '',
    tags: [],
    status: ContentStatus.Draft,
    date: new Date().toISOString().split('T')[0],
    imageUrl: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/800/400`,
    // Case Study specifics
    client: '',
    environment: '',
    outcome: ''
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (isEdit && id) {
       const existing = type === ContentType.Article 
         ? ContentService.getArticles().find(a => a.id === id)
         : ContentService.getCaseStudies().find(c => c.id === id);
       
       if (existing) {
         setFormData(existing);
       }
    }
  }, [id, isEdit, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-slugify title
    if (name === 'title' && !isEdit) {
      setFormData(prev => ({ 
        ...prev, 
        title: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') 
      }));
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === ContentType.Article) {
      ContentService.saveArticle(formData);
    } else {
      ContentService.saveCaseStudy(formData);
    }
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
           <button onClick={() => navigate('/admin')} className="flex items-center text-sm text-gray-500 hover:text-ms-blue">
             <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
           </button>
           <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
             {isEdit ? 'Edit' : 'Create'} {isCaseStudy ? 'Case Study' : 'Article'}
           </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800 space-y-6">
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input type="text" name="title" required value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ms-blue focus:ring-ms-blue dark:bg-slate-800 dark:border-slate-700 dark:text-white py-2 px-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug (URL)</label>
                <input type="text" name="slug" required value={formData.slug} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ms-blue focus:ring-ms-blue dark:bg-slate-800 dark:border-slate-700 dark:text-white py-2 px-3" />
              </div>
           </div>

           {isCaseStudy && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 dark:bg-slate-800 rounded-md">
                <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Client Name</label>
                   <input type="text" name="client" value={formData.client} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white py-1 px-2" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Environment</label>
                   <input type="text" name="environment" value={formData.environment} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white py-1 px-2" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Outcome (Short)</label>
                   <input type="text" name="outcome" value={formData.outcome} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white py-1 px-2" />
                </div>
             </div>
           )}

           <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Summary</label>
             <textarea name="summary" rows={3} required value={formData.summary} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ms-blue focus:ring-ms-blue dark:bg-slate-800 dark:border-slate-700 dark:text-white py-2 px-3" />
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content (Markdown Supported)</label>
             <textarea name="content" rows={12} required value={formData.content} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ms-blue focus:ring-ms-blue dark:bg-slate-800 dark:border-slate-700 dark:text-white font-mono text-sm py-2 px-3" />
           </div>

           <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (Press Enter)</label>
              <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleAddTag} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ms-blue focus:ring-ms-blue dark:bg-slate-800 dark:border-slate-700 dark:text-white py-2 px-3" />
              <div className="flex flex-wrap gap-2 mt-2">
                 {formData.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                       {tag}
                       <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-blue-900 hover:text-blue-500 font-bold">×</button>
                    </span>
                 ))}
              </div>
           </div>

           <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-slate-800">
              <select name="status" value={formData.status} onChange={handleChange} className="rounded-md border-gray-300 shadow-sm focus:border-ms-blue focus:ring-ms-blue dark:bg-slate-800 dark:border-slate-700 dark:text-white py-2 px-3">
                 <option value={ContentStatus.Draft}>Draft</option>
                 <option value={ContentStatus.Published}>Published</option>
              </select>
              
              <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-ms-blue hover:bg-blue-700 shadow-sm">
                 <Save className="w-5 h-5 mr-2" />
                 Save & Publish
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};

export default Editor;