import React from 'react';
import { Briefcase, Award, GraduationCap } from 'lucide-react';

const Experience: React.FC = () => {
  const jobs = [
    {
      role: 'Infra Managed Services Analyst (Microsoft 365 Administrator)',
      company: 'Accenture',
      period: 'Dec 2021 – Present',
      desc: 'Administration of global Microsoft 365 tenants and Exchange hybrid environments supporting up to 60,000 users.',
      achievements: [
        'Automated Group creations, mailboxes provisioning, Teams Enterprise Voice assignments, using PowerShell, and reducing manual workload by 25%.',
        'Achieved SLA-backed 99.9% service uptime; managed mailbox migrations and Azure AD Connect synchronization.',
        'Implemented Conditional Access, MFA, app registrations, and Defender for Office 365 to strengthen security posture.',
        'Configured and enforced email authentication (SPF, DKIM, DMARC) and compliance policies across domains.',
        'Administered Intune MDM/MAM for corporate and BYOD devices, increasing device compliance by 30%.',
        'Managed Teams Enterprise Voice workflows, including complex Auto Attendants, Call Queues, and Direct Routing.',
        'Resolved 150+ service requests/incidents monthly through ServiceNow and Jira.',
        'Administered Confluence for a cross-functional project with responsibilities including site governance, role-based access management, and content lifecycle optimization.',
        'Consistently apply AI tools such as Copilot, ChatGPT, Perplexity, and Claude Gemini to streamline operational workflows.'
      ]
    }
  ];

  const education = [
    {
      degree: 'B.Tech in Information Technology',
      school: 'Jalpaiguri Govt. Engineering College',
      period: '2016 - 2019'
    },
    {
      degree: 'Diploma in Computer Science & Technology',
      school: 'Siliguri Govt. Polytechnic',
      period: '2013 - 2016'
    }
  ];

  const certifications = [
    'Microsoft 365 Certified: Administrator Expert (MS-102)',
    'Microsoft 365 Certified: Fundamentals (MS-900)',
    'Microsoft Certified: Azure Fundamentals (AZ-900)',
    'Atlassian Certified: Confluence Essentials (ACA-920)'
  ];

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      {/* About Section */}
      <section className="py-16 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">About Me</h1>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Microsoft 365 Architect & Administrator with 4+ years of experience in securing and optimizing enterprise cloud environments.
            </p>
          </div>
          
          <div className="prose prose-lg prose-blue dark:prose-invert mx-auto text-gray-600 dark:text-gray-300">
            <p className="mb-6">
              I specialize in managing multiple global O365/M365 environments supporting 15,000-60,000 users across multiple regions. I have strong expertise in Exchange Online, Intune, Teams, OneDrive, and Azure AD, allowing me to deliver excellent results in complex cloud infrastructures.
            </p>
            <p className="mb-6">
              I use PowerShell automation to streamline operations, reducing manual workload and enhancing service reliability. My experience in implementing security measures—including Conditional Access, Multi-Factor Authentication (MFA), and Microsoft Defender for Office 365—ensures robust protection and compliance.
            </p>
            <p>
              With a proven track record in advanced troubleshooting and escalation resolution, I drive service improvements that address challenges and promote long-term enhancements. My commitment to ITIL compliance and digital efficiency has consistently strengthened tenant security and operational excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Experience & Education Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Experience (Takes up 2/3) */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
              <Briefcase className="w-6 h-6 mr-2 text-ms-blue" />
              Professional Experience
            </h2>
            <div className="flow-root">
              <ul className="-mb-8">
                {jobs.map((job, idx) => (
                  <li key={idx}>
                    <div className="relative pb-12">
                      {idx !== jobs.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-slate-700" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center ring-8 ring-white dark:ring-slate-900">
                            <div className="h-2.5 w-2.5 rounded-full bg-ms-blue" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 justify-between space-y-1">
                          <div>
                            <p className="text-xl font-bold text-slate-900 dark:text-white">{job.role}</p>
                            <p className="text-sm font-medium text-ms-blue">{job.company}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{job.period}</p>
                          </div>
                          <div className="mt-4 text-gray-600 dark:text-gray-300">
                            <p className="mb-3 font-medium">{job.desc}</p>
                            <ul className="list-disc pl-5 space-y-2">
                              {job.achievements.map((achievement, i) => (
                                <li key={i}>{achievement}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Education & Certs (Takes up 1/3) */}
          <div className="space-y-12">
            
            {/* Certifications */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2 text-ms-blue" />
                Certifications
              </h2>
              <div className="bg-gray-50 dark:bg-slate-950 rounded-lg p-6 border border-gray-100 dark:border-slate-800">
                <ul className="space-y-4">
                  {certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mt-0.5">
                        <span className="block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <span className="ml-3 text-sm text-slate-700 dark:text-gray-300 font-medium">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <GraduationCap className="w-6 h-6 mr-2 text-ms-blue" />
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                    <p className="text-ms-blue font-medium">{edu.school}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;