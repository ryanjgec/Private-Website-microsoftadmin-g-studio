import React from 'react';
import { Linkedin, Mail, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center space-x-3">
      <span className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
        <Share2 className="w-4 h-4 mr-1.5" />
        Share:
      </span>
      <a
        href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-[#0077b5] hover:bg-blue-50 transition-all dark:bg-slate-800 dark:hover:bg-slate-700"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin size={18} />
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`}
        className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:text-gray-200"
        aria-label="Share via Email"
        title="Share via Email"
      >
        <Mail size={18} />
      </a>
    </div>
  );
};

export default ShareButtons;