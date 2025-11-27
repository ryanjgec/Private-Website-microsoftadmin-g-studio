import { ContentItem, ContentType, ContentStatus } from './types';

export const INITIAL_ARTICLES: ContentItem[] = [
  {
    id: '1',
    title: 'Exchange Online Mailbox Migration Best Practices',
    slug: 'exchange-online-migration-best-practices',
    summary: 'A comprehensive guide to planning, executing, and validating hybrid mailbox migrations with zero downtime.',
    content: `
# Exchange Online Migration Best Practices

Migrating to Exchange Online is a critical task for any modern enterprise. This guide covers the essential steps for a successful Hybrid migration.

## 1. Pre-Migration Assessment
*   Analyze network bandwidth.
*   Clean up Active Directory attributes.
*   Identify large mailboxes (>100GB).

## 2. Hybrid Configuration
Using the HCW (Hybrid Configuration Wizard) is standard, but ensuring your certificates and connector validation is key.

## 3. The Move Request
Powershell is your friend here.

\`\`\`powershell
New-MoveRequest -Identity "user@domain.com" -RemoteHostName "mail.onprem.com" -RemoteCredential $cred -TargetDeliveryDomain "tenant.mail.onmicrosoft.com"
\`\`\`

## 4. Post-Migration
Always verify free/busy status and calendar sharing permissions immediately after the move completes.
    `,
    tags: ['Exchange Online', 'Migration', 'PowerShell', 'Hybrid'],
    status: ContentStatus.Published,
    date: '2023-10-15',
    imageUrl: 'https://picsum.photos/seed/exchange/800/400'
  },
  {
    id: '2',
    title: 'Intune Device Compliance Policies: A Deep Dive',
    slug: 'intune-device-compliance-policies',
    summary: 'Ensuring device security before granting access. How to configure and troubleshoot compliance policies in Endpoint Manager.',
    content: '# Intune Compliance\n\nCompliance policies are the gatekeepers of your zero-trust architecture...',
    tags: ['Intune', 'Security', 'MDM', 'Compliance'],
    status: ContentStatus.Published,
    date: '2023-11-02',
    imageUrl: 'https://picsum.photos/seed/intune/800/400'
  },
  {
    id: '3',
    title: 'Conditional Access Implementation Guide',
    slug: 'conditional-access-implementation-guide',
    summary: 'Moving beyond MFA: Context-aware access controls. Best practices for configuring Entra ID CA policies.',
    content: '# Conditional Access\n\nIdentity is the new perimeter. Here is how we lock it down...',
    tags: ['Entra ID', 'Security', 'Identity', 'MFA'],
    status: ContentStatus.Published,
    date: '2023-12-10',
    imageUrl: 'https://picsum.photos/seed/entra/800/400'
  }
];

export const INITIAL_CASE_STUDIES: ContentItem[] = [
  {
    id: 'cs1',
    title: 'Managed 5,000+ mailboxes with advanced security',
    slug: 'atlas-air-mailbox-security',
    client: 'Atlas Air',
    environment: '5,000+ Mailboxes, Hybrid Exchange',
    summary: 'Secured a large-scale hybrid environment against phishing and unauthorized access.',
    outcome: 'Reduced security incidents by 40% and improved uptime.',
    content: `
## Problem
The client faced increasing phishing attacks and needed to standardize email security across a complex hybrid environment.

## Actions taken
*   Deployed Defender for Office 365 (Safe Links, Safe Attachments).
*   Implemented strict SPF, DKIM, and DMARC policies.
*   Automated mailbox cleanup scripts via PowerShell.

## Outcome
Achieved a **99.9%** reduction in delivered phishing emails and standardized the offboarding process.
    `,
    tags: ['Security', 'Exchange', 'Defender'],
    status: ContentStatus.Published,
    date: '2023-08-20',
    imageUrl: 'https://picsum.photos/seed/atlas/800/400'
  },
  {
    id: 'cs2',
    title: 'Deployed Intune MDM for 1,000+ devices',
    slug: 'jde-intune-deployment',
    client: 'JDE',
    environment: '1,000+ iOS & Windows Devices',
    summary: 'Transitioned from legacy GPO management to modern cloud-native MDM with Intune.',
    outcome: 'Zero-touch provisioning achieved via Autopilot.',
    content: '# JDE Intune Rollout\n\nFull transition to modern management...',
    tags: ['Intune', 'Autopilot', 'Windows 11'],
    status: ContentStatus.Published,
    date: '2023-05-15',
    imageUrl: 'https://picsum.photos/seed/jde/800/400'
  },
  {
    id: 'cs3',
    title: 'Seamless tenant-to-tenant migration',
    slug: 'jde-peets-migration',
    client: 'JDE Peet’s',
    environment: 'Merger & Acquisition Scenario',
    summary: 'Executed a complex identity and data migration following a corporate merger.',
    outcome: 'Day-1 access enabled for all migrated users with no data loss.',
    content: '# Tenant Migration\n\nCross-tenant synchronization and identity mapping were key...',
    tags: ['Migration', 'Entra ID', 'SharePoint'],
    status: ContentStatus.Published,
    date: '2023-09-01',
    imageUrl: 'https://picsum.photos/seed/peets/800/400'
  }
];