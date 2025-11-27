import React from 'react';
import { Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  const jobs = [
    {
      role: 'Senior M365 Administrator',
      company: 'Tech Solutions Global',
      period: '2022 - Present',
      desc: 'Leading a team of 5 engineers managing a 10,000+ user tenant.',
      achievements: [
        'Architected Conditional Access policies reducing account compromises by 95%.',
        'Migrated 2,000 mailboxes from Exchange On-Prem to Online using Hybrid configuration.',
        'Deployed Intune Autopilot for 1,500 laptops, reducing provisioning time by 80%.'
      ]
    },
    {
      role: 'System Administrator (M365)',
      company: 'Connect IT Services',
      period: '2020 - 2022',
      desc: 'Provided L3 support for Exchange, Teams, and SharePoint.',
      achievements: [
        'Automated user onboarding/offboarding via PowerShell, saving 10 hours/week.',
        'Hardened tenant security score from 35% to 82% within 6 months.',
        'Managed rigorous DLP and compliance policies for financial sector clients.'
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">Professional Experience</h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            A timeline of secure environments delivered and problems solved.
          </p>
        </div>

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
                        <Briefcase className="h-4 w-4 text-ms-blue" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 justify-between space-y-1">
                      <div>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">{job.role}</p>
                        <p className="text-sm font-medium text-ms-blue">{job.company}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{job.period}</p>
                      </div>
                      <div className="mt-4 text-gray-600 dark:text-gray-300">
                        <p className="mb-2">{job.desc}</p>
                        <ul className="list-disc pl-5 space-y-1">
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
    </div>
  );
};

export default Experience;