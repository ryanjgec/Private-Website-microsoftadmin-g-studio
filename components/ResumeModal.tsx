import React, { useState, useContext } from 'react';
import { Download, FileText } from 'lucide-react';
import { ResumeContext } from '../App';
import { RESUME_CONTENT } from '../constants';

const ResumeModal: React.FC = () => {
  const { isResumeModalOpen, closeResumeModal } = useContext(ResumeContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isResumeModalOpen) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create blob with resume content
    const element = document.createElement("a");
    const file = new Blob([RESUME_CONTENT], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Sayan_Ghosh_Resume.txt";
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
    
    // Close and reset
    closeResumeModal();
    setName('');
    setEmail('');
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeResumeModal}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white dark:bg-slate-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-200 dark:border-slate-700">
          <div className="bg-white dark:bg-slate-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <FileText className="h-6 w-6 text-ms-blue" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-slate-900 dark:text-white" id="modal-title">
                  Download Resume
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Please provide your details to download the full professional resume of Sayan Ghosh.
                  </p>
                </div>
                
                <form id="resume-form" onSubmit={handleDownload} className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="r-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input 
                      type="text" 
                      id="r-name" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-ms-blue focus:border-ms-blue dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="r-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input 
                      type="email" 
                      id="r-email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-ms-blue focus:border-ms-blue dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                       placeholder="recruiter@company.com"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-slate-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="submit" 
              form="resume-form"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-ms-blue text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </button>
            <button 
              type="button" 
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-slate-700 dark:text-gray-200 dark:border-slate-600 dark:hover:bg-slate-600"
              onClick={closeResumeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;