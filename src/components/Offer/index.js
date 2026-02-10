export const OFFER_ITEMS = [
  {
    id: '1',
    title: 'Tailored Software Solutions',
    content: 'We create software fully customized to your business processes.',
  },
  {
    id: '2',
    title: 'Web & Mobile Development',
    content:
      'We build modern web platforms, business apps, and mobile solutions - from landing pages to complex systems.',
  },
  {
    id: '3',
    title: 'User-Centered Design',
    content: 'We craft intuitive, accessible, and engaging user experiences.',
  },
  {
    id: '4',
    title: 'Hosting & Website Administration',
    content:
      'We provide reliable hosting, ongoing maintenance, updates, and full technical support for your digital products.',
    cta: {
      label: 'See details',
      modalTitle: 'Hosting & Website Administration',
      packages: [
        {
          name: 'Basic',
          price: '199 PLN/mo',
          features: [
            'Custom domain',
            'SSL certificate',
            'Monthly backups',
            'Email support',
          ],
        },
        {
          name: 'Pro',
          price: '499 PLN/mo',
          recommended: true,
          features: [
            'Everything in Basic',
            'Weekly backups',
            'Monitoring 24/7',
            'Priority support',
            'Performance optimization',
          ],
        },
        {
          name: 'Enterprise',
          price: 'Custom pricing',
          features: [
            'Everything in Pro',
            'Dedicated server',
            'SLA guarantee',
            'Custom integrations',
          ],
        },
      ],
    },
  },
  {
    id: '5',
    title: 'Cloud & DevOps',
    content:
      'Scalable infrastructure and modern CI/CD practices to ensure reliability, security, and speed.',
  },
  {
    id: '6',
    title: 'AI & Intelligent Automation',
    content:
      'We leverage artificial intelligence and automation to build smarter products, streamline workflows, and unlock new business opportunities.',
  },
  {
    id: '7',
    title: 'Long-Term Tech Partnership',
    content:
      'We stay with you long-term, supporting and evolving your software as your business grows.',
  },
]
