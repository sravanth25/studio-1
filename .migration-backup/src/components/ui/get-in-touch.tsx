"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export const ProfessionalConnect = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const socialPlatforms = [
    {
      name: 'WhatsApp',
      icon: <Image src="https://res.cloudinary.com/dxsj2kcwu/image/upload/v1757415743/whatsapp_12635043_omsc1o.png" alt="WhatsApp" width={28} height={28} />,
      gradient: 'from-green-500 to-teal-400',
      shadowColor: 'rgba(16, 185, 129, 0.5)',
      link: 'https://web.whatsapp.com/send?phone=918885166880&text=Hi%20JaaGa%20Team%2C%20Please%20let%20me%20know%20more%20about%20your%20services.',
      description: 'Chat with us'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      gradient: 'from-blue-600 to-blue-400',
      shadowColor: 'rgba(59, 130, 246, 0.5)',
      link: 'https://www.linkedin.com/company/jaagaai/about/',
      description: 'Professional Network'
    },
    {
      name: 'Facebook',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
      gradient: 'from-blue-700 to-indigo-500',
      shadowColor: 'rgba(67, 56, 202, 0.5)',
      link: 'https://www.facebook.com/people/JaaGa-AI/61552907515347/?mibextid=LQQJ4d',
      description: 'Community Page'
    },
    {
      name: 'Twitter',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      gradient: 'from-slate-800 to-slate-600',
      shadowColor: 'rgba(51, 65, 85, 0.5)',
      link: 'https://x.com/Jaaga_ai',
      description: 'Social Updates'
    },
    {
      name: 'Instagram',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
        </svg>
      ),
      gradient: 'from-purple-600 via-pink-600 to-orange-500',
      shadowColor: 'rgba(219, 39, 119, 0.5)',
      link: 'https://www.instagram.com/jaaga.ai/',
      description: 'Visual Stories'
    },
    {
      name: 'YouTube',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      gradient: 'from-red-600 to-red-400',
      shadowColor: 'rgba(239, 68, 68, 0.5)',
      link: 'https://www.youtube.com/@jaagaapp',
      description: 'Video Content'
    }
  ];

  return (
    <div className="bg-background overflow-hidden relative w-full">
      <div className="relative z-10 flex flex-col items-center justify-center p-4 sm:p-12 ">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight text-foreground">
            Get In Touch
          </h1>
                     
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Join our vibrant community across multiple platforms and stay connected with the latest updates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
          {socialPlatforms.map((platform, index) => (
            <a
              key={platform.name}
              href={platform.link}
              target='_blank'
              rel='noopener noreferrer'
              className={`group relative transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative bg-card backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-border/50 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-primary/50 shadow-sm hover:shadow-lg h-full">
                <div 
                   className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
                                 
                <div 
                   className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${platform.shadowColor}, transparent 70%)`,
                    filter: 'blur(40px)'
                  }}
                ></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className={`mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br ${platform.gradient} text-white transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 self-start`}>
                    {platform.icon}
                  </div>
                                     
                  <div className="flex-grow">
                    <h3 className="text-foreground font-semibold text-lg mb-1 transition-colors duration-300">
                      {platform.name}
                    </h3>
                    <p className="text-muted-foreground text-sm transition-colors duration-300 group-hover:text-foreground/80">
                      {platform.description}
                    </p>
                  </div>
                                     
                  <div className="mt-4 flex items-center text-muted-foreground group-hover:text-primary transition-all duration-300">
                    <span className="text-sm font-medium group-hover:translate-x-0 transition-all duration-300">
                      Connect
                    </span>
                    <svg 
                       className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                       fill="none" 
                       stroke="currentColor" 
                       viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
