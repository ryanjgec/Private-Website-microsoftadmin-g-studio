
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';

const Legal: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const SectionHeading = ({ children, id }: { children: React.ReactNode, id: string }) => (
    <h2 id={id} className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-gray-200 dark:border-slate-800">
      {children}
    </h2>
  );

  const SubHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3">
      {children}
    </h3>
  );

  const Text = ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
      {children}
    </p>
  );

  const List = ({ items }: { items: string[] }) => (
    <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-300 space-y-2 text-sm sm:text-base">
      {items.map((item, idx) => <li key={idx}>{item}</li>)}
    </ul>
  );

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen py-16">
      <SEO 
        title="Legal | Terms, Privacy & Disclaimers" 
        description="Legal documentation for microsoftadmin.in including Terms of Use, Privacy Policy, Copyright Notice, and Technical Disclaimers."
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Legal Documentation
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-slate-900/50 p-6 rounded-lg border border-blue-100 dark:border-slate-800 mb-12">
            <h3 className="font-bold text-ms-blue mb-2">Quick Navigation</h3>
            <div className="flex flex-wrap gap-4 text-sm font-medium">
                <a href="#disclaimer" className="hover:underline text-slate-700 dark:text-slate-300">General Disclaimer</a>
                <a href="#terms" className="hover:underline text-slate-700 dark:text-slate-300">Terms & Conditions</a>
                <a href="#privacy" className="hover:underline text-slate-700 dark:text-slate-300">Privacy Policy</a>
                <a href="#copyright" className="hover:underline text-slate-700 dark:text-slate-300">Copyright Notice</a>
            </div>
        </div>

        {/* 1. General Disclaimer */}
        <SectionHeading id="disclaimer">1. General & Technical Disclaimer</SectionHeading>
        
        <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-lg border border-red-100 dark:border-red-900/30 mb-8">
            <p className="font-bold text-red-700 dark:text-red-400 mb-2">CRITICAL NOTICE REGARDING TECHNICAL GUIDANCE</p>
            <Text>
                The content provided on <strong>microsoftadmin.in</strong>, including but not limited to technical articles, scripts (PowerShell, CLI, etc.), architectural diagrams, and configuration guides, is for <strong>educational and informational purposes only</strong>.
            </Text>
        </div>

        <SubHeading>No Warranty or Professional Liability</SubHeading>
        <Text>
            All information is provided "AS-IS" without warranty of any kind. Sayan Ghosh ("The Author") makes no representations or warranties regarding the accuracy, completeness, or suitability of the information for your specific environment.
        </Text>
        <Text>
            IT environments vary drastically. A script or configuration that works in a lab or one specific tenant may cause catastrophic data loss, service downtime, or security vulnerabilities in another. You acknowledge that:
        </Text>
        <List items={[
            "You assume full responsibility for testing all scripts and configurations in a non-production environment before deployment.",
            "The Author is NOT responsible for any data loss, system corruption, downtime, financial loss, or legal liability resulting from the use of information found on this website.",
            "This website does not constitute a professional service level agreement (SLA) or formal consultancy engagement."
        ]} />

        <SubHeading>Non-Affiliation with Microsoft</SubHeading>
        <Text>
            This website is an independent personal portfolio and knowledge base. <strong>It is NOT affiliated with, endorsed by, sponsored by, or officially connected to Microsoft Corporation</strong> or any of its subsidiaries or affiliates.
        </Text>
        <Text>
            The names Microsoft, Azure, Microsoft 365, Office 365, Exchange Online, Intune, Entra ID, Windows, and related logos are trademarks of Microsoft Corporation. Their usage here is for descriptive and identification purposes only (Fair Use).
        </Text>

        <SubHeading>Case Study Anonymization</SubHeading>
        <Text>
            All case studies presented on this site are high-level summaries based on real-world experience. To protect client confidentiality and comply with Non-Disclosure Agreements (NDAs):
        </Text>
        <List items={[
            "Client names, logos, and specific identifiers have been anonymized or generalized (e.g., 'Global Cargo Airline').",
            "Technical details have been sanitized to prevent exposing sensitive infrastructure data.",
            "No proprietary, confidential, or trade-secret information is disclosed."
        ]} />

        {/* 2. Terms & Conditions */}
        <SectionHeading id="terms">2. Terms & Conditions</SectionHeading>
        <Text>
            By accessing and using <strong>microsoftadmin.in</strong>, you accept and agree to be bound by the terms and provision of this agreement.
        </Text>

        <SubHeading>Acceptable Use</SubHeading>
        <Text>
            You agree to use this website only for lawful purposes. You are prohibited from:
        </Text>
        <List items={[
            "Using this website to distribute malicious software or scripts.",
            "Attempting to compromise the security or integrity of the website.",
            "Using any automated scraping, data mining, or extraction tools on the content.",
            "Using the content for training Artificial Intelligence (AI) or Machine Learning (ML) models without express written permission."
        ]} />

        <SubHeading>Governing Law</SubHeading>
        <Text>
            These terms shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Kolkata, West Bengal, India.
        </Text>
        <Text>
            This agreement complies with the <strong>Indian Contract Act, 1872</strong> and the <strong>Information Technology Act, 2000</strong>.
        </Text>

        {/* 3. Privacy Policy */}
        <SectionHeading id="privacy">3. Privacy Policy</SectionHeading>
        <Text>
            This Privacy Policy outlines how your data is collected and used, in compliance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> of India and general global best practices.
        </Text>

        <SubHeading>Data Collection</SubHeading>
        <Text>
            We collect minimal personal data, strictly for the functionality of the website:
        </Text>
        <List items={[
            "Voluntary Information: Name and Email Address provided via the 'Contact' form or Resume Download modal.",
            "Technical Data: IP addresses and browser user agents for security logging and basic analytics (stored in local browser storage, not sold to third parties)."
        ]} />

        <SubHeading>Usage of Data</SubHeading>
        <Text>
            We do NOT sell, trade, or rent your personal identification information to others. Data is used solely to:
        </Text>
        <List items={[
            "Respond to your professional inquiries.",
            "Improve website performance and user experience."
        ]} />

        <SubHeading>Cookies & Local Storage</SubHeading>
        <Text>
            This website uses basic functional cookies/local storage to:
        </Text>
        <List items={[
            "Remember your theme preference (Dark/Light mode).",
            "Store authentication state (if you are an admin).",
            "Track page views locally for the dashboard demo."
        ]} />

        <SubHeading>Your Rights (DPDP Act 2023)</SubHeading>
        <Text>
            You have the right to request the correction or erasure of your personal data. For data deletion requests or privacy grievances, please contact the Data Fiduciary:
        </Text>
        <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded border border-gray-200 dark:border-slate-800 text-sm">
            <strong>Contact:</strong> Sayan Ghosh<br/>
            <strong>Email:</strong> sayan@microsoftadmin.in<br/>
            <strong>Subject:</strong> Privacy / Data Deletion Request
        </div>

        {/* 4. Copyright Notice */}
        <SectionHeading id="copyright">4. Copyright Notice</SectionHeading>
        <Text>
            <strong>&copy; {new Date().getFullYear()} Sayan Ghosh. All Rights Reserved.</strong>
        </Text>
        <Text>
            Unless otherwise noted, all content on this website—including text, technical guides, original images, case study descriptions, and code snippets written by the author—is the intellectual property of Sayan Ghosh.
        </Text>
        <SubHeading>Permitted Use</SubHeading>
        <List items={[
            "You may read, reference, and share links to this content for educational and non-commercial purposes.",
            "You may use code snippets in your internal IT environment, provided you assume all liability as stated in the Disclaimer."
        ]} />
        <SubHeading>Prohibited Use</SubHeading>
        <List items={[
            "Republishing full articles or guides on other websites without attribution and canonical linking.",
            "Selling or monetizing the content found on this site.",
            "Claiming ownership of the technical guides or case studies."
        ]} />
        <Text>
            Third-party trademarks and logos (e.g., Microsoft, Atlassian) remain the property of their respective owners.
        </Text>

      </div>
    </div>
  );
};

export default Legal;
