import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const form = useRef();
  const { t } = useTranslation();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Add current time to the form data
    const currentTime = new Date().toLocaleString();
    const formData = new FormData(form.current);
    formData.append('time', currentTime);

    // Convert FormData to template parameters object
    const templateParams = {
      user_name: formData.get('user_name'),
      user_email: formData.get('user_email'),
      message: formData.get('message'),
      time: currentTime
    };

    emailjs.send('service_0bjudu6', 'template_bb2i1xi', templateParams, 'KbrCLExvsOT5O0cSm')
      .then((result) => {
        setStatus('success');
        form.current.reset();
      }, (error) => {
        setStatus('error');
        console.error('Error sending email:', error);
      });
  };

  return (
    <section id="contact" className="py-16 bg-black dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-white" style={{ color: 'var(--color-primary)' }}>
          {t('contact.title')}
        </h2>
        <p className="text-center mb-8 text-gray-400 max-w-2xl mx-auto">
          {t('contact.subtitle', 'Feel free to reach out with any questions or inquiries.')}
        </p>
        
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-shrink-0 w-8 h-8" style={{ color: 'var(--color-primary)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white ml-2">
              {t('contact.formTitle', 'Send a Message')}
            </h3>
          </div>
          
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                {t('contact.name')}
              </label>
              <input
                type="text"
                name="user_name"
                id="name"
                required
                className="block w-full bg-gray-800 border-0 text-white rounded-md p-3 focus:outline-none"
                style={{ 
                  borderBottom: '2px solid transparent',
                  borderBottomColor: 'var(--color-primary)',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                {t('contact.email')}
              </label>
              <input
                type="email"
                name="user_email"
                id="email"
                required
                className="block w-full bg-gray-800 border-0 text-white rounded-md p-3 focus:outline-none"
                style={{ 
                  borderBottom: '2px solid transparent',
                  borderBottomColor: 'var(--color-primary)',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                {t('contact.message')}
              </label>
              <textarea
                name="message"
                id="message"
                rows="4"
                required
                className="block w-full bg-gray-800 border-0 text-white rounded-md p-3 focus:outline-none"
                style={{ 
                  borderLeft: '2px solid transparent',
                  borderLeftColor: 'var(--color-primary)',
                  transition: 'all 0.3s ease'
                }}
              ></textarea>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 px-4 border-0 rounded-md text-sm font-medium text-white focus:outline-none disabled:opacity-50"
                style={{ 
                  background: 'var(--color-primary)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => e.currentTarget.style.background = 'var(--color-secondary)'}
                onMouseOut={e => e.currentTarget.style.background = 'var(--color-primary)'}
              >
                {status === 'sending' ? t('contact.sending') : t('contact.send')}
              </button>
            </div>
            
            {status === 'success' && (
              <div className="p-3 mt-4 rounded-md text-center text-sm" 
                style={{ 
                  backgroundColor: 'rgba(var(--color-primary-rgb), 0.2)',
                  color: 'var(--color-primary)'
                }}>
                {t('contact.success')}
              </div>
            )}
            
            {status === 'error' && (
              <div className="p-3 mt-4 bg-red-900 text-red-200 rounded-md text-center text-sm">
                {t('contact.error')}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 