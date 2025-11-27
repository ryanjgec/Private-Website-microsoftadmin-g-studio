import React, { useState } from 'react';
import { Mail, Linkedin, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Get In Touch</h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Open to new opportunities in M365 Administration & Engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
             <div>
               <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Contact Information</h3>
               <div className="space-y-4">
                 <div className="flex items-start">
                   <MapPin className="w-6 h-6 text-ms-blue mt-1" />
                   <div className="ml-4">
                     <p className="text-base font-medium text-slate-900 dark:text-white">Location</p>
                     <p className="text-gray-500 dark:text-gray-400">Available for remote work or relocation.</p>
                   </div>
                 </div>
                 <div className="flex items-start">
                   <Mail className="w-6 h-6 text-ms-blue mt-1" />
                   <div className="ml-4">
                     <p className="text-base font-medium text-slate-900 dark:text-white">Email</p>
                     <a href="mailto:contact@microsoftadmin.in" className="text-gray-500 dark:text-gray-400 hover:text-ms-blue">contact@microsoftadmin.in</a>
                   </div>
                 </div>
                 <div className="flex items-start">
                   <Linkedin className="w-6 h-6 text-ms-blue mt-1" />
                   <div className="ml-4">
                     <p className="text-base font-medium text-slate-900 dark:text-white">LinkedIn</p>
                     <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-ms-blue">linkedin.com/in/sayanghosh</a>
                   </div>
                 </div>
               </div>
             </div>

             <div className="p-6 bg-blue-50 dark:bg-slate-800 rounded-lg">
                <h4 className="font-bold text-ms-blue mb-2">Recruiters</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  I am currently serving notice and available for immediate interviews.
                </p>
                <a href="#" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ms-blue hover:bg-blue-700 shadow-sm">
                  Download Resume
                </a>
             </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 dark:bg-slate-950 p-8 rounded-lg border border-gray-200 dark:border-slate-800">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                   <Mail className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
                 <p className="text-gray-500 mt-2">I will get back to you as soon as possible.</p>
                 <button onClick={() => setSubmitted(false)} className="mt-6 text-ms-blue font-medium hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input type="text" id="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ms-blue focus:ring-ms-blue dark:bg-slate-800 dark:border-slate-700 dark:text-white py-2 px-3" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input type="email" id="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ms-blue focus:ring-ms-blue dark:bg-slate-800 dark:border-slate-700 dark:text-white py-2 px-3" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                  <input type="text" id="subject" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ms-blue focus:ring-ms-blue dark:bg-slate-800 dark:border-slate-700 dark:text-white py-2 px-3" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                  <textarea id="message" rows={4} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ms-blue focus:ring-ms-blue dark:bg-slate-800 dark:border-slate-700 dark:text-white py-2 px-3"></textarea>
                </div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ms-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ms-blue">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;