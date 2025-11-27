
import React, { useState, useContext } from 'react';
import { Mail, Linkedin, MapPin, Send, Download, MessageSquare } from 'lucide-react';
import { ResumeContext } from '../App';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { openResumeModal } = useContext(ResumeContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <SEO 
        title="Contact Sayan Ghosh" 
        description="Get in touch with Sayan Ghosh for Microsoft 365 Administration opportunities."
      />

      {/* Hero Section - Glass Card + Grid Pattern */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 pt-16 pb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute right-0 top-0 -translate-x-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-ms-blue mb-6">
                 <MessageSquare className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                Let's Connect
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                Whether you have a question about my experience, a project to discuss, or just want to say hi, my inbox is open.
            </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Info & Context */}
          <div className="lg:col-span-5 space-y-8">
             
             {/* Contact Details Card */}
             <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h3>
               <div className="space-y-6">
                 <div className="flex items-start group">
                   <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-ms-blue group-hover:bg-ms-blue group-hover:text-white transition-colors duration-300">
                     <MapPin className="w-5 h-5" />
                   </div>
                   <div className="ml-4">
                     <p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Location</p>
                     <p className="text-gray-600 dark:text-gray-400 mt-1">Available for remote work or relocate anywhere in india.</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start group">
                   <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-ms-blue group-hover:bg-ms-blue group-hover:text-white transition-colors duration-300">
                     <Mail className="w-5 h-5" />
                   </div>
                   <div className="ml-4">
                     <p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Email</p>
                     <a href="mailto:sayan@microsoftadmin.in" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue transition-colors mt-1 block">
                       sayan@microsoftadmin.in
                     </a>
                   </div>
                 </div>

                 <div className="flex items-start group">
                   <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-ms-blue group-hover:bg-ms-blue group-hover:text-white transition-colors duration-300">
                     <Linkedin className="w-5 h-5" />
                   </div>
                   <div className="ml-4">
                     <p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">LinkedIn</p>
                     <a href="https://www.linkedin.com/in/sayankghosh/" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-ms-blue transition-colors mt-1 block">
                       linkedin.com/in/sayankghosh
                     </a>
                   </div>
                 </div>
               </div>
             </div>

             {/* Recruiter Callout */}
             <div className="relative overflow-hidden bg-gradient-to-br from-ms-blue to-blue-700 rounded-2xl p-8 text-white shadow-lg">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl" />
                <h4 className="text-xl font-bold mb-3 flex items-center">
                  For Recruiters
                </h4>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  I am currently serving my notice period and available for immediate interviews. Download my resume for a detailed overview of my skills.
                </p>
                <button 
                  onClick={openResumeModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-white/20 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white hover:text-ms-blue transition-all duration-200 backdrop-blur-sm shadow-md"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </button>
             </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 rounded-2xl shadow-xl border border-white/50 dark:border-slate-700/50 p-8 sm:p-10">
              {submitted ? (
                <div className="min-h-[400px] flex flex-col items-center justify-center text-center animate-fade-in">
                   <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
                     <Send className="w-10 h-10 ml-1" />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                   <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                     Thank you for reaching out. I'll check my inbox and get back to you shortly.
                   </p>
                   <button 
                    onClick={() => setSubmitted(false)} 
                    className="mt-8 px-6 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-ms-blue font-bold hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
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
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:border-ms-blue focus:ring-2 focus:ring-ms-blue/20 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        required 
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:border-ms-blue focus:ring-2 focus:ring-ms-blue/20 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
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
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:border-ms-blue focus:ring-2 focus:ring-ms-blue/20 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
                      placeholder="Project discussion..."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      required 
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:border-ms-blue focus:ring-2 focus:ring-ms-blue/20 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400 resize-none"
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
