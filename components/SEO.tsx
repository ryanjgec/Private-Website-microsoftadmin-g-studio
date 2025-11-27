import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url, type = 'website' }) => {
  useEffect(() => {
    // Update Title
    document.title = title;

    const updateMeta = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta
    updateMeta('name', 'description', description);

    // Open Graph
    updateMeta('property', 'og:title', title);
    updateMeta('property', 'og:description', description);
    updateMeta('property', 'og:type', type);
    updateMeta('property', 'og:url', url || window.location.href);
    if (image) {
        updateMeta('property', 'og:image', image);
    }

    // Twitter Card
    updateMeta('name', 'twitter:card', 'summary_large_image');
    updateMeta('name', 'twitter:title', title);
    updateMeta('name', 'twitter:description', description);
    if (image) {
        updateMeta('name', 'twitter:image', image);
    }

  }, [title, description, image, url, type]);

  return null;
};

export default SEO;