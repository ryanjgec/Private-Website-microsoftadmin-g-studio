
import { ContentItem, ContentType, AnalyticsDay, ActivityLog, DashboardStats, TrashItem } from '../types';
import { INITIAL_ARTICLES, INITIAL_CASE_STUDIES } from '../constants';

// --- Database Abstraction Layer ---
class LocalDatabase {
  private static KEYS = {
    ARTICLES: 'msadmin_db_articles_v2',
    CASE_STUDIES: 'msadmin_db_casestudies_v2',
    ANALYTICS: 'msadmin_db_analytics',
    LOGS: 'msadmin_db_logs',
    TRASH: 'msadmin_db_trash'
  };

  constructor() {
    this.init();
  }

  private init() {
    if (!localStorage.getItem(LocalDatabase.KEYS.ARTICLES)) {
      localStorage.setItem(LocalDatabase.KEYS.ARTICLES, JSON.stringify(INITIAL_ARTICLES));
    }
    if (!localStorage.getItem(LocalDatabase.KEYS.CASE_STUDIES)) {
      localStorage.setItem(LocalDatabase.KEYS.CASE_STUDIES, JSON.stringify(INITIAL_CASE_STUDIES));
    }
    if (!localStorage.getItem(LocalDatabase.KEYS.ANALYTICS)) {
      localStorage.setItem(LocalDatabase.KEYS.ANALYTICS, JSON.stringify({}));
    }
    if (!localStorage.getItem(LocalDatabase.KEYS.LOGS)) {
      localStorage.setItem(LocalDatabase.KEYS.LOGS, JSON.stringify([]));
    }
    if (!localStorage.getItem(LocalDatabase.KEYS.TRASH)) {
      localStorage.setItem(LocalDatabase.KEYS.TRASH, JSON.stringify([]));
    }
  }

  // Generic Get
  public get<T>(key: string): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  // Generic Save
  public save(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Specialized Getters
  public getArticles(): ContentItem[] {
    return this.get<ContentItem[]>(LocalDatabase.KEYS.ARTICLES);
  }

  public getCaseStudies(): ContentItem[] {
    return this.get<ContentItem[]>(LocalDatabase.KEYS.CASE_STUDIES);
  }
  
  public getTrash(): TrashItem[] {
    return this.get<TrashItem[]>(LocalDatabase.KEYS.TRASH);
  }

  // Analytics
  public trackView() {
    const analytics = this.get<Record<string, number>>(LocalDatabase.KEYS.ANALYTICS);
    const today = new Date().toISOString().split('T')[0];
    
    if (analytics[today]) {
      analytics[today]++;
    } else {
      analytics[today] = 1;
    }
    
    // Prune old data (keep last 30 days) to save space
    const dates = Object.keys(analytics).sort();
    if (dates.length > 30) {
      delete analytics[dates[0]];
    }

    this.save(LocalDatabase.KEYS.ANALYTICS, analytics);
  }

  public getAnalyticsHistory(): AnalyticsDay[] {
    const analytics = this.get<Record<string, number>>(LocalDatabase.KEYS.ANALYTICS);
    return Object.entries(analytics)
      .map(([date, views]) => ({ date, views }))
      .sort((a, b) => a.date.localeCompare(b.date)); // Sort mostly chronological
  }

  public getTotalViews(): number {
    const analytics = this.get<Record<string, number>>(LocalDatabase.KEYS.ANALYTICS);
    return Object.values(analytics).reduce((acc, curr) => acc + curr, 0);
  }

  // Logging
  public logActivity(log: Omit<ActivityLog, 'id' | 'timestamp'>) {
    const logs = this.get<ActivityLog[]>(LocalDatabase.KEYS.LOGS);
    const newLog: ActivityLog = {
      ...log,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    };
    
    // Keep last 50 logs
    const updatedLogs = [newLog, ...logs].slice(0, 50);
    this.save(LocalDatabase.KEYS.LOGS, updatedLogs);
  }

  public getLogs(): ActivityLog[] {
    return this.get<ActivityLog[]>(LocalDatabase.KEYS.LOGS);
  }

  public getStorageStats(): DashboardStats {
    let totalBytes = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalBytes += (localStorage[key].length + key.length) * 2; // Approximate char size in bytes
      }
    }

    return {
      totalArticles: this.getArticles().length,
      totalCaseStudies: this.getCaseStudies().length,
      totalViews: this.getTotalViews(),
      storageUsedBytes: totalBytes,
      storageQuotaBytes: 5 * 1024 * 1024, // 5MB standard limit
      trashCount: this.getTrash().length
    };
  }
  
  // Trash Operations
  public moveToTrash(type: ContentType, id: string) {
    const key = type === ContentType.Article ? LocalDatabase.KEYS.ARTICLES : LocalDatabase.KEYS.CASE_STUDIES;
    const items = this.get<ContentItem[]>(key);
    
    const itemIndex = items.findIndex(i => i.id === id);
    if (itemIndex === -1) {
      console.warn(`Item with id ${id} not found in ${key}`);
      return;
    }

    const item = items[itemIndex];

    // Remove from main list
    const newItems = items.filter(i => i.id !== id);
    this.save(key, newItems);

    // Add to trash
    const trash = this.getTrash();
    const trashItem: TrashItem = {
      ...item,
      originalType: type,
      deletedAt: new Date().toISOString()
    };
    trash.unshift(trashItem);
    this.save(LocalDatabase.KEYS.TRASH, trash);
  }

  public restoreFromTrash(id: string) {
    const trash = this.getTrash();
    const itemToRestore = trash.find(t => t.id === id);
    
    if (!itemToRestore) return;

    // Remove from trash
    const newTrash = trash.filter(t => t.id !== id);
    this.save(LocalDatabase.KEYS.TRASH, newTrash);

    // Restore to original list
    const key = itemToRestore.originalType === ContentType.Article ? LocalDatabase.KEYS.ARTICLES : LocalDatabase.KEYS.CASE_STUDIES;
    const items = this.get<ContentItem[]>(key);
    
    // Remove trash-specific fields
    const { originalType, deletedAt, ...restoredItem } = itemToRestore;
    
    items.unshift(restoredItem);
    this.save(key, items);
  }

  public permanentDelete(id: string) {
    const trash = this.getTrash();
    const newTrash = trash.filter(t => t.id !== id);
    this.save(LocalDatabase.KEYS.TRASH, newTrash);
  }
}

// Singleton Instance
const db = new LocalDatabase();

// --- Service Layer ---

export const ContentService = {
  // Read
  getArticles: () => db.getArticles(),
  getCaseStudies: () => db.getCaseStudies(),
  getTrash: () => db.getTrash(),
  getArticleBySlug: (slug: string) => db.getArticles().find(i => i.slug === slug),
  getCaseStudyBySlug: (slug: string) => db.getCaseStudies().find(i => i.slug === slug),
  
  // Write (Transactions)
  saveArticle: (item: ContentItem) => {
    const items = db.getArticles();
    const idx = items.findIndex(i => i.id === item.id);
    let action: 'CREATE' | 'UPDATE' = 'CREATE';

    if (idx >= 0) {
      items[idx] = item;
      action = 'UPDATE';
    } else {
      items.unshift(item);
    }
    
    db.save('msadmin_db_articles_v2', items);
    db.logActivity({
      action: action,
      entityType: 'ARTICLE',
      entityTitle: item.title,
      user: 'Admin'
    });
  },

  saveCaseStudy: (item: ContentItem) => {
    const items = db.getCaseStudies();
    const idx = items.findIndex(i => i.id === item.id);
    let action: 'CREATE' | 'UPDATE' = 'CREATE';

    if (idx >= 0) {
      items[idx] = item;
      action = 'UPDATE';
    } else {
      items.unshift(item);
    }
    
    db.save('msadmin_db_casestudies_v2', items);
    db.logActivity({
      action: action,
      entityType: 'CASE_STUDY',
      entityTitle: item.title,
      user: 'Admin'
    });
  },

  deleteArticle: (id: string) => {
    const item = db.getArticles().find(i => i.id === id);
    if (!item) return;
    db.moveToTrash(ContentType.Article, id);
    db.logActivity({
      action: 'DELETE',
      entityType: 'ARTICLE',
      entityTitle: item.title,
      user: 'Admin'
    });
  },

  deleteCaseStudy: (id: string) => {
    const item = db.getCaseStudies().find(i => i.id === id);
    if (!item) return;
    db.moveToTrash(ContentType.CaseStudy, id);
    db.logActivity({
      action: 'DELETE',
      entityType: 'CASE_STUDY',
      entityTitle: item.title,
      user: 'Admin'
    });
  },
  
  restoreItem: (id: string) => {
    const item = db.getTrash().find(i => i.id === id);
    if (!item) return;
    db.restoreFromTrash(id);
    db.logActivity({
      action: 'RESTORE',
      entityType: item.originalType === ContentType.Article ? 'ARTICLE' : 'CASE_STUDY',
      entityTitle: item.title,
      user: 'Admin'
    });
  },

  permanentDelete: (id: string) => {
    db.permanentDelete(id);
  },

  // Analytics & Admin
  trackPageView: () => db.trackView(),
  getAnalytics: () => db.getAnalyticsHistory(),
  getRecentActivity: () => db.getLogs(),
  getSystemStats: () => db.getStorageStats(),
};
