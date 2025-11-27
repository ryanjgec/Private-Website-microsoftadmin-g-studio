import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContentType, ContentItem, ContentStatus } from '../../types';
import { ContentService } from '../../services/contentService';
import { 
  ArrowLeft, Save, Upload, Image as ImageIcon,
  Bold, Italic, List, ListOrdered, Code, Heading, Quote, Link as LinkIcon
} from 'lucide-react';

interface EditorProps {
  type: ContentType;
}

const Editor: React.FC<EditorProps> = ({ type }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;
  const isCaseStudy = type === ContentType.CaseStudy;

  // Refs for file inputs and textarea
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  // --- Formatting Helpers ---
  const insertFormat = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.content;
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    const newContent = `${before}${prefix}${selected}${suffix}${after}`;
    
    setFormData(prev => ({ ...prev, content: newContent }));

    // Restore focus and cursor selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  // Image Upload Handlers
  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContentImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const textarea = textareaRef.current;
    // Capture cursor position immediately to insert image where user was typing
    const cursorPosition = textarea ? textarea.selectionStart : formData.content.length;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Append Markdown image syntax to content at cursor position
        const markdownImage = `\n![${file.name}](${reader.result})\n`;
        
        setFormData(prev => {
          const text = prev.content;
          const before = text.substring(0, cursorPosition);
          const after = text.substring(cursorPosition);
          return { ...prev, content: `${before}${markdownImage}${after}` };
        });
      };
      reader.readAsDataURL(file);
    }
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

           {/* Cover Image Upload */}
           <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cover Image URL</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input 
                  type="text" 
                  name="imageUrl" 
                  value={formData.imageUrl} 
                  onChange={handleChange} 
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border-gray-300 focus:ring-ms-blue focus:border-ms-blue dark:bg-slate-800 dark:border-slate-700 dark:text-white sm:text-sm" 
                  placeholder="https://..."
                />
                <input 
                  type="file" 
                  ref={coverImageInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleCoverImageUpload} 
                />
                <button
                  type="button"
                  onClick={() => coverImageInputRef.current?.click()}
                  className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium dark:bg-slate-700 dark:border-slate-600 dark:text-gray-200 dark:hover:bg-slate-600"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </button>
              </div>
              {formData.imageUrl && formData.imageUrl.startsWith('data:') && (
                 <p className="mt-1 text-xs text-yellow-600 dark:text-yellow-400">
                    * Using base64 encoded image. Large images may affect performance.
                 </p>
              )}
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

           {/* Enhanced Markdown Editor */}
           <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content (Markdown)</label>
             
             {/* Toolbar */}
             <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 border-b-0 rounded-t-md">
                <button type="button" onClick={() => insertFormat('**', '**')} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300" title="Bold">
                   <Bold size={16} />
                </button>
                <button type="button" onClick={() => insertFormat('*', '*')} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300" title="Italic">
                   <Italic size={16} />
                </button>
                <div className="w-px h-6 bg-gray-300 dark:bg-slate-600 mx-1"></div>
                <button type="button" onClick={() => insertFormat('\n## ')} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300" title="Heading 2">
                   <Heading size={16} />
                </button>
                <button type="button" onClick={() => insertFormat('\n> ')} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300" title="Quote">
                   <Quote size={16} />
                </button>
                <button type="button" onClick={() => insertFormat('\n- ')} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300" title="Bulleted List">
                   <List size={16} />
                </button>
                <button type="button" onClick={() => insertFormat('\n1. ')} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300" title="Numbered List">
                   <ListOrdered size={16} />
                </button>
                <div className="w-px h-6 bg-gray-300 dark:bg-slate-600 mx-1"></div>
                <button type="button" onClick={() => insertFormat('[', '](url)')} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300" title="Link">
                   <LinkIcon size={16} />
                </button>
                <button type="button" onClick={() => insertFormat('\n```\n', '\n```\n')} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300" title="Code Block">
                   <Code size={16} />
                </button>
                
                <div className="flex-grow"></div>
                
                {/* Image Upload in Toolbar */}
                <input 
                  type="file" 
                  ref={contentImageInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleContentImageUpload} 
                />
                <button
                  type="button"
                  onClick={() => contentImageInputRef.current?.click()}
                  className="flex items-center gap-1 px-2 py-1.5 rounded bg-white hover:bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600 border border-gray-300 dark:border-slate-600 text-xs font-medium"
                >
                  <ImageIcon size={14} />
                  Insert Image
                </button>
             </div>

             <textarea 
               ref={textareaRef}
               name="content" 
               rows={15} 
               required 
               value={formData.content} 
               onChange={handleChange} 
               className="block w-full rounded-b-md rounded-t-none border-gray-300 shadow-sm focus:border-ms-blue focus:ring-ms-blue dark:bg-slate-900 dark:border-slate-700 dark:text-white font-mono text-sm py-2 px-3" 
             />
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