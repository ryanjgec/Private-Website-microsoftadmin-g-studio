
import React, { useContext, useState } from 'react';
import { Briefcase, Award, GraduationCap, Download, UserCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { ResumeContext } from '../App';
import SEO from '../components/SEO';

const Experience: React.FC = () => {
  const { openResumeModal } = useContext(ResumeContext);
  const [isBioExpanded, setIsBioExpanded] = useState(false);

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
       <SEO 
        title="About Sayan Ghosh | Experience & Certifications" 
        description="Professional background of Sayan Ghosh - Microsoft 365 Administrator at Accenture."
      />
      
      {/* Hero Section - Glass Card + Grid Pattern */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 pt-16 pb-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
           <div className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-white/50 dark:border-slate-700/50 shadow-2xl rounded-3xl p-8 md:p-14 text-center ring-1 ring-gray-900/5 transition-all duration-500">
              
              <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-ms-blue mb-6">
                 <UserCheck className="w-8 h-8" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
                 About Me
              </h1>
              
              <div className="max-w-3xl mx-auto text-lg md:text-xl text-slate-700 dark:text-gray-300 leading-relaxed font-medium dark:font-light mb-8 text-left md:text-center">
                 {!isBioExpanded ? (
                   <p className="animate-fade-in">
                      Microsoft 365 Architect & Administrator with 4+ years of experience in securing and optimizing enterprise cloud environments. I specialize in managing large-scale tenants, automation via PowerShell, and identity-driven security.
                   </p>
                 ) : (
                   <div className="space-y-6 text-base md:text-lg animate-fade-in">
                     <p>
                       I specialize in managing multiple global O365/M365 environments supporting 15,000-60,000 users across multiple regions. I have strong expertise in Exchange Online, Intune, Teams, OneDrive, and Azure AD, allowing me to deliver excellent results in complex cloud infrastructures.
                     </p>
                     <p>
                       I use PowerShell automation to streamline operations, reducing manual workload and enhancing service reliability. My experience in implementing security measures—including Conditional Access, Multi-Factor Authentication (MFA), and Microsoft Defender for Office 365—ensures robust protection and compliance.
                     </p>
                     <p>
                       With a proven track record in advanced troubleshooting and escalation resolution, I drive service improvements that address challenges and promote long-term enhancements. My commitment to ITIL compliance and digital efficiency has consistently strengthened tenant security and operational excellence.
                     </p>
                   </div>
                 )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setIsBioExpanded(!isBioExpanded)}
                  className="inline-flex items-center text-ms-blue font-bold hover:text-blue-700 transition-colors"
                >
                  {isBioExpanded ? (
                    <>Show Less <ChevronUp className="ml-1 w-4 h-4" /></>
                  ) : (
                    <>Read Full Bio <ChevronDown className="ml-1 w-4 h-4" /></>
                  )}
                </button>

                <div className="hidden sm:block text-gray-300 dark:text-slate-700">|</div>

                <button 
                  onClick={openResumeModal} 
                  className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-xl text-white bg-ms-blue hover:bg-blue-700 shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </button>
              </div>
           </div>
        </div>
      </section>

      {/* Experience & Education Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Experience (Takes up 2/3) */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center border-b border-gray-100 dark:border-slate-800 pb-4">
              <Briefcase className="w-6 h-6 mr-3 text-ms-blue" />
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
                      <div className="relative flex space-x-4">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center ring-8 ring-white dark:ring-slate-900">
                            <div className="h-2.5 w-2.5 rounded-full bg-ms-blue" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 justify-between space-y-1">
                          <div>
                            <p className="text-xl font-bold text-slate-900 dark:text-white">{job.role}</p>
                            <p className="text-base font-medium text-ms-blue">{job.company}</p>
                            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1 flex items-center">
                                <span className="bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide">
                                    {job.period}
                                </span>
                            </p>
                          </div>
                          <div className="mt-4 text-slate-700 dark:text-gray-300">
                            <p className="mb-4 font-semibold italic border-l-4 border-gray-200 dark:border-slate-700 pl-4">{job.desc}</p>
                            <ul className="space-y-3">
                              {job.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ms-blue"></span>
                                    <span className="leading-relaxed font-medium dark:font-normal">{achievement}</span>
                                </li>
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
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center border-b border-gray-100 dark:border-slate-800 pb-4">
                <Award className="w-6 h-6 mr-3 text-ms-blue" />
                Certifications
              </h2>
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <ul className="space-y-4">
                  {certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mt-0.5">
                        <span className="block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <span className="ml-3 text-sm text-slate-700 dark:text-gray-300 font-semibold">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center border-b border-gray-100 dark:border-slate-800 pb-4">
                <GraduationCap className="w-6 h-6 mr-3 text-ms-blue" />
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                    <p className="text-ms-blue font-bold mt-1">{edu.school}</p>
                    <p className="text-sm text-slate-500 dark:text-gray-400 mt-2 bg-gray-50 dark:bg-slate-800 inline-block px-2 py-1 rounded font-medium">
                        {edu.period}
                    </p>
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
