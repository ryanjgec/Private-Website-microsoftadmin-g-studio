import { ContentItem, ContentType, ContentStatus } from './types';

export const RESUME_CONTENT = `Sayan Ghosh
Microsoft 365 Administrator
Kolkata, India || https://infra365.online
+91-7001164440 || sayan@microsoftadmin.in

PROFESSIONAL SUMMARY
I am an experienced Microsoft 365 architect with over 4 years at Accenture, specializing in managing multiple global O365/M365 environments supporting 15,000-60,000 users across multiple regions. I have strong expertise in Exchange Online, Intune, Teams, OneDrive, and Azure AD, allowing me to deliver excellent results in complex cloud infrastructures.
I use PowerShell automation to streamline operations, reducing manual workload and enhancing service reliability. My experience in implementing security measures—including Conditional Access, Multi-Factor Authentication (MFA), and Microsoft Defender for Office 365—ensures robust protection and compliance.
With a proven track record in advanced troubleshooting and escalation resolution, I drive service improvements that address challenges and promote long-term enhancements. My commitment to ITIL compliance and digital efficiency has consistently strengthened tenant security and operational excellence.

CORE SKILLS
Microsoft 365 & Cloud Infrastructure:
Exchange Online & Hybrid, Teams Administration (Voice, Auto Attendants, Call Queues, Routing, Rooms, Policies), Intune & Endpoint Management (MDM/MAM, BYOD, compliance, app deployment, endpoint security).

Identity & Security:
Azure AD / Entra ID (user/group management, hybrid sync), IAM (Conditional Access, MFA, SSO, app registrations, RBAC), Defender for Office 365 (threat protection, Secure Score, SPF/DKIM/DMARC), Data Governance & Compliance (DLP, sensitivity labels, eDiscovery, retention).

Automation, Collaboration & AI Tools:
PowerShell scripting and automation, ITIL incident/problem/change management with ServiceNow and Jira, advanced Confluence site administration with a focus on governance, access controls, and content lifecycle management. Proficient use of AI assistants—Copilot, ChatGPT, Perplexity, and Claude Gemini—for enhancing efficiency and technical support.

PROFESSIONAL EXPERIENCE
Accenture – Infra Managed Services Analyst (Microsoft 365 Administrator)
Kolkata, India | Dec 2021 – Present
• Led the administration of global Microsoft 365 tenants and Exchange hybrid environments supporting up to 60,000 users.
• Automated Group creations, mailboxes provisioning, Teams Enterprise Voice assignments, using PowerShell, and reducing manual workload by 25%.
• Achieved SLA-backed 99.9% service uptime; managed mailbox migrations and Azure AD Connect synchronization.
• Implemented Conditional Access, MFA, app registrations, and Defender for Office 365 to strengthen security posture.
• Configured and enforced email authentication (SPF, DKIM, DMARC) and compliance policies across domains.
• Administered Intune MDM/MAM for corporate and BYOD devices, increasing device compliance by 30%.
• Managed Teams Enterprise Voice workflows, including complex Auto Attendants, Call Queues, and Direct Routing.
• Resolved 150+ service requests/incidents monthly through ServiceNow and Jira.
• Administered Confluence for a cross-functional project with responsibilities including site governance, role-based access management, and content lifecycle optimization, supporting cross-functional teams and knowledge sharing.
• Consistently apply AI tools such as Copilot, ChatGPT, Perplexity, and Claude Gemini to streamline operational workflows, accelerate troubleshooting, and enhance reporting accuracy.

CERTIFICATIONS
• Microsoft 365 Certified: Fundamentals (MS-900) - June 2023
• Microsoft Certified: Azure Fundamentals (AZ-900) - June 2025
• Atlassian Certified: Confluence Essentials (ACA-920) - May 2025
• Microsoft 365 Certified: Administrator Expert (MS-102) – Oct 2025

EDUCATION
B.Tech in Information Technology
Jalpaiguri Govt. Engineering College | 2016 - 2019

Diploma in Computer Science & Technology
Siliguri Govt. Polytechnic | 2013 - 2016

ADDITIONAL INFORMATION
• Languages: English (Fluent), Hindi (Fluent), Bengali (Native)
• Availability: Flexible for global time zones, experienced in 24/7 on-call support.
• Professional Development: Active member of the Microsoft & Atlassian community, regularly contributing to technical forums and staying current with Microsoft & Confluence product updates.
`;

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