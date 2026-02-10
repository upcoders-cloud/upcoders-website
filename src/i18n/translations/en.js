const en = {
  common: {
    close: 'Close',
  },
  navbar: {
    items: {
      offer: 'Offer',
      about: 'About us',
      projects: 'Projects',
      contact: 'Contact',
    },
    languageSwitcher: {
      ariaLabel: 'Select language',
    },
  },
  hero: {
    title: {
      line1: 'BRIGHT',
      line2Prefix: 'THE',
      line2PrefixDone: 'THE',
      words: ['FUTURE', 'CODE', 'INNOVATION', 'IDEAS', 'FUTURE'],
    },
    description:
      'We design and develop modern applications tailored to the processes of industrial and technical companies.',
    cta: 'ASK ABOUT YOUR PROJECT',
  },
  offer: {
    eyebrow: 'OFFER',
    title:
      'We design and build digital products tailored to real business needs, everyday workflows, and long-term growth.',
    paragraph1:
      'We are a modern startup-driven team focused on creating high-quality web and mobile applications for companies that want to move faster, work smarter, and build better digital experiences.',
    paragraph2:
      'We also explore emerging technologies - including artificial intelligence and automation - to help our clients unlock new opportunities, optimize processes, and stay ahead in a rapidly changing world.',
    specializeIn: 'WHAT DO WE SPECIALIZE IN?',
    items: {
      tailored: {
        title: 'Tailored Software Solutions',
        content: 'We create software fully customized to your business processes.',
      },
      webMobile: {
        title: 'Web & Mobile Development',
        content:
          'We build modern web platforms, business apps, and mobile solutions - from landing pages to complex systems.',
      },
      userCentered: {
        title: 'User-Centered Design',
        content: 'We craft intuitive, accessible, and engaging user experiences.',
      },
      hosting: {
        title: 'Hosting & Website Administration',
        content:
          'We provide reliable hosting, ongoing maintenance, updates, and full technical support for your digital products.',
        cta: {
          label: 'See details',
          modalTitle: 'Hosting & Website Administration',
        },
        packages: {
          basic: {
            name: 'Basic',
            price: '199 PLN/mo',
            features: ['Custom domain', 'SSL certificate', 'Monthly backups', 'Email support'],
          },
          pro: {
            name: 'Pro',
            price: '499 PLN/mo',
            features: [
              'Everything in Basic',
              'Weekly backups',
              'Monitoring 24/7',
              'Priority support',
              'Performance optimization',
            ],
          },
          enterprise: {
            name: 'Enterprise',
            price: 'Custom pricing',
            features: [
              'Everything in Pro',
              'Dedicated server',
              'SLA guarantee',
              'Custom integrations',
            ],
          },
        },
      },
      cloudDevops: {
        title: 'Cloud & DevOps',
        content:
          'Scalable infrastructure and modern CI/CD practices to ensure reliability, security, and speed.',
      },
      aiAutomation: {
        title: 'AI & Intelligent Automation',
        content:
          'We leverage artificial intelligence and automation to build smarter products, streamline workflows, and unlock new business opportunities.',
      },
      longTerm: {
        title: 'Long-Term Tech Partnership',
        content: 'We stay with you long-term, supporting and evolving your software as your business grows.',
      },
    },
    packageCard: {
      recommended: 'Recommended',
      contactButton: 'Contact us',
    },
  },
  team: {
    eyebrow: 'MEET OUR TEAM',
    description:
      'We are more than a tech company - we are a team united by curiosity, creativity, and a drive to make an impact. Together, we turn challenges into opportunities.',
    members: {
      pawel: {
        role: 'Co-Founder',
        about: 'Turning vision into scalable solutions.',
      },
      fabian: {
        role: 'Co-Founder & Project Manager',
        about: 'Clear goals, seamless delivery.',
      },
      michal: {
        role: 'Co-Founder & Integration Architect',
        about: 'Clean code, strong foundations.',
      },
      wojciech: {
        role: 'Co-Founder & Full-Stack Architect',
        about: 'Bridging frontend and backend with clarity.',
      },
    },
  },
  contact: {
    header: {
      line1: 'Let us talk about',
      line2: 'your project!',
      descriptionLine1: 'Leave us your e-mail address and phone number.',
      descriptionLine2: 'We will contact you within 48 hours.',
    },
    form: {
      labels: {
        email: 'Email',
        phone: 'Phone number',
        privacy: 'I agree to the privacy policy terms *',
      },
      placeholders: {
        input: 'Type here...',
      },
      errors: {
        emailRequired: 'Email is required.',
        emailInvalid: 'Please enter a valid email address.',
        phoneInvalid: 'Please enter a valid phone number.',
        privacyRequired: 'Check the agreement to continue.',
      },
      buttons: {
        send: 'SEND MESSAGE',
        sent: 'SENT',
      },
      toasts: {
        success: 'Message sent successfully.',
        failed: 'Submission failed.',
        clientError: 'Client error. Please check the console for more info.',
        missingConfig: 'Form configuration error. Please contact the website administrator.',
      },
      web3: {
        subject: 'Someone sent a message from our Website',
        fromName: 'Upcoders page',
      },
    },
  },
  footer: {
    followUs: 'Follow us',
    company: 'Company',
    contact: 'Contact',
    partners: 'Partners',
  },
  projects: {
    title: 'Projects',
    description:
      'This page is ready for your case studies. In the next step, we can connect project cards and detail pages.',
  },
  projectDetails: {
    titlePrefix: 'Project:',
    description: 'Case study details will be added here.',
  },
  notFound: {
    title: 'Page not found',
    backHome: 'Back to home',
  },
}

export default en
