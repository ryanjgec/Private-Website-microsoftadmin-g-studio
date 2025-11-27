import React, { useState, useContext } from 'react';
import { Mail, Linkedin, MapPin, Send, Download } from 'lucide-react';
import { ResumeContext } from '../App';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { openResumeModal } = useContext(ResumeContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl -z-10 opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-5xl">
            Let's Connect
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Whether you have a question about my experience, a project to discuss, or just want to say hi, my inbox is open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Info & Context */}
          <div className="lg:col-span-5 space-y-10">
             
             {/* Contact Details Card */}
             <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h3>
               <div className="space-y-6">
                 <div className="flex items-start group">
                   <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-ms-blue group-hover:scale-110 transition-transform duration-200">
                     <MapPin className="w-5 h-5" />
                   </div>
                   <div className="ml-4">
                     <p className="text-sm font-medium text-gray-900 dark:text-white">Location</p>
                     <p className="text-gray-600 dark:text-gray-400">Available for remote work or relocation.</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start group">
                   <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-ms-blue group-hover:scale-110 transition-transform duration-200">
                     <Mail className="w-5 h-5" />
                   </div>
                   <div className="ml-4">
                     <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                     <a href="mailto:sayan@microsoftadmin.in" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue transition-colors">
                       sayan@microsoftadmin.in
                     </a>
                   </div>
                 </div>

                 <div className="flex items-start group">
                   <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-ms-blue group-hover:scale-110 transition-transform duration-200">
                     <Linkedin className="w-5 h-5" />
                   </div>
                   <div className="ml-4">
                     <p className="text-sm font-medium text-gray-900 dark:text-white">LinkedIn</p>
                     <a href="https://www.linkedin.com/in/sayankghosh/" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue transition-colors">
                       linkedin.com/in/sayankghosh
                     </a>
                   </div>
                 </div>
               </div>
             </div>

             {/* Recruiter Callout */}
             <div className="relative overflow-hidden bg-gradient-to-br from-ms-blue to-blue-700 rounded-2xl p-8 text-white shadow-lg">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl" />
                <h4 className="text-xl font-bold mb-3 flex items-center">
                  For Recruiters
                </h4>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  I am currently serving my notice period and available for immediate interviews. Download my resume for a detailed overview of my skills.
                </p>
                <button 
                  onClick={openResumeModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-white/20 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white hover:text-ms-blue transition-all duration-200 backdrop-blur-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </button>
             </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8 sm:p-10">
              {submitted ? (
                <div className="min-h-[400px] flex flex-col items-center justify-center text-center animate-fade-in">
                   <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6">
                     <Send className="w-10 h-10 ml-1" />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                   <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                     Thank you for reaching out. I'll check my inbox and get back to you shortly.
                   </p>
                   <button 
                    onClick={() => setSubmitted(false)} 
                    className="mt-8 text-ms-blue font-semibold hover:underline"
                   >
                     Send another message
                   </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        required 
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border-transparent focus:border-ms-blue focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-ms-blue/20 transition-all outline-none text-gray-900 dark:text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        required 
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border-transparent focus:border-ms-blue focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-ms-blue/20 transition-all outline-none text-gray-900 dark:text-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      required 
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border-transparent focus:border-ms-blue focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-ms-blue/20 transition-all outline-none text-gray-900 dark:text-white"
                      placeholder="Project discussion..."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      required 
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border-transparent focus:border-ms-blue focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-ms-blue/20 transition-all outline-none text-gray-900 dark:text-white resize-none"
                      placeholder="How can I help you?"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 text-base font-bold text-white bg-ms-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ms-blue transition-all duration-200 hover:-translate-y-1"
                  >
                    Send Message
                    <Send className="ml-2 w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;