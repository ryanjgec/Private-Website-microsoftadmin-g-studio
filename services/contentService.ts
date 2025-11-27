import { ContentItem, ContentType } from '../types';
import { INITIAL_ARTICLES, INITIAL_CASE_STUDIES } from '../constants';

const ARTICLES_KEY = 'msadmin_articles_v2';
const CASE_STUDIES_KEY = 'msadmin_casestudies_v2';

// Initialize LocalStorage if empty
const initStorage = () => {
  if (!localStorage.getItem(ARTICLES_KEY)) {
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(INITIAL_ARTICLES));
  }
  if (!localStorage.getItem(CASE_STUDIES_KEY)) {
    localStorage.setItem(CASE_STUDIES_KEY, JSON.stringify(INITIAL_CASE_STUDIES));
  }
};

const getItems = (type: ContentType): ContentItem[] => {
  initStorage();
  const key = type === ContentType.Article ? ARTICLES_KEY : CASE_STUDIES_KEY;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveItem = (type: ContentType, item: ContentItem): void => {
  initStorage();
  const items = getItems(type);
  const existingIndex = items.findIndex(i => i.id === item.id);
  
  if (existingIndex >= 0) {
    items[existingIndex] = item;
  } else {
    items.unshift(item); // Add to top
  }
  
  const key = type === ContentType.Article ? ARTICLES_KEY : CASE_STUDIES_KEY;
  localStorage.setItem(key, JSON.stringify(items));
};

const deleteItem = (type: ContentType, id: string): void => {
  const items = getItems(type);
  const newItems = items.filter(i => i.id !== id);
  const key = type === ContentType.Article ? ARTICLES_KEY : CASE_STUDIES_KEY;
  localStorage.setItem(key, JSON.stringify(newItems));
};

const getItemBySlug = (type: ContentType, slug: string): ContentItem | undefined => {
  const items = getItems(type);
  return items.find(i => i.slug === slug);
};

export const ContentService = {
  getArticles: () => getItems(ContentType.Article),
  getCaseStudies: () => getItems(ContentType.CaseStudy),
  saveArticle: (item: ContentItem) => saveItem(ContentType.Article, item),
  saveCaseStudy: (item: ContentItem) => saveItem(ContentType.CaseStudy, item),
  deleteArticle: (id: string) => deleteItem(ContentType.Article, id),
  deleteCaseStudy: (id: string) => deleteItem(ContentType.CaseStudy, id),
  getArticleBySlug: (slug: string) => getItemBySlug(ContentType.Article, slug),
  getCaseStudyBySlug: (slug: string) => getItemBySlug(ContentType.CaseStudy, slug),
};