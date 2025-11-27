
export enum ContentType {
  Article = 'ARTICLE',
  CaseStudy = 'CASE_STUDY'
}

export enum ContentStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  summary: string; // Short description or "Problem" for case studies
  content: string; // Markdown content
  tags: string[];
  status: ContentStatus;
  date: string;
  imageUrl?: string;
  
  // Specific to Case Studies
  client?: string;
  environment?: string; // e.g., "5000+ Mailboxes"
  outcome?: string; // Short outcome summary
}

export interface TrashItem extends ContentItem {
  originalType: ContentType;
  deletedAt: string;
}

export interface User {
  email: string;
  name: string;
  role: 'admin' | 'guest';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// --- Analytics & System Types ---

export interface AnalyticsDay {
  date: string; // YYYY-MM-DD
  views: number;
}

export interface ActivityLog {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'RESTORE' | 'LOGIN' | 'SYSTEM';
  entityType: 'ARTICLE' | 'CASE_STUDY' | 'SYSTEM' | 'USER';
  entityTitle: string;
  timestamp: string; // ISO string
  user: string;
}

export interface DashboardStats {
  totalArticles: number;
  totalCaseStudies: number;
  totalViews: number;
  storageUsedBytes: number;
  storageQuotaBytes: number; // typically 5MB for LS
  trashCount: number;
}
