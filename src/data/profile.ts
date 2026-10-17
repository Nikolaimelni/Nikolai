// Everything that changes lives here, so updating the CV never means opening a
// component.

export const profile = {
  name: 'Nikolai Melnichenko',
  role: 'Front-End Developer',
  location: { city: 'Lisbon', country: 'Portugal', countryCode: 'PT' },

  // \u2011 is a non-breaking hyphen, so no line ends on "front-".
  headline: 'Front\u2011end developer based in Lisbon',
  subhead: 'I build React and TypeScript front\u2011ends that stay easy to change',
  // Meta description and link previews, where the subhead would get cut off.
  tagline: 'React, Next.js and TypeScript front-ends that stay easy to change.',

  focus: [
    {
      title: 'Shared UI',
      icon: 'layers',
      text: 'Product screens built on the shared component library and its SCSS/BEM structure, which every app on the platform uses.',
    },
    {
      title: 'Payments',
      icon: 'card',
      text: 'The payment system on a fintech product, and a third-party payment widget set up for each brand.',
    },
    {
      title: 'Performance',
      icon: 'bolt',
      text: 'Code splitting, lazy loading and bundle analysis, plus Core Web Vitals work on Next.js.',
    },
    {
      title: 'Releases',
      icon: 'branch',
      text: 'I run the release cycle for my team and wrote the branching and code-style rules it follows.',
    },
  ],

  links: {
    email: 'nikolai.melnichenko.fe@gmail.com',
    github: 'https://github.com/nikolaimelni',
    linkedin: 'https://www.linkedin.com/in/nikolai-melnichenko/',
    telegram: 'https://t.me/Nikolaimelni',
    whatsapp: 'https://wa.me/351912078598',
    cv: '/CV_Nikolai_Melnichenko.pdf',
    source: 'https://github.com/nikolaimelni/Nikolai',
    form: 'https://formspree.io/f/xyyrkzpq',
  },

  experience: [
    {
      from: 'Jun 2024',
      to: 'Present',
      title: 'Front-End Developer',
      company: 'BrainRocket',
      place: 'Lisbon, Portugal',
      kind: 'On-site',
      earlier: false,
      points: [
        'Built product features on the shared UI component library and the SCSS/BEM structure behind it, which every application on the platform uses.',
        'Built and maintained per-country versions of the product on top of that library. Layout and content differ from country to country, so each one is its own app in the monorepo.',
        'Set up a third-party payment widget for each brand: configuration, loading it on the page and handling its events.',
        'Spent over a year on the Angular 20 side of the platform with RxJS, NgRx and SSR over Express, inside an Nx monorepo.',
        'Expanded automated test coverage with Vitest, React Testing Library and MSW, and cut page load times with code splitting, lazy loading and bundle analysis.',
        'Release Captain for my team, with full ownership of the release cycle. Wrote the release, branching and code-style conventions the team works to.',
      ],
    },
    {
      from: 'Nov 2023',
      to: 'Jun 2024',
      title: 'Front-End Developer',
      company: 'REnumber Lab',
      place: 'Remote',
      kind: 'Consulting',
      earlier: false,
      points: [
        'Led a complete redesign of a marketplace platform on React, Next.js and TypeScript, from front-end architecture through delivery.',
        'Developed the admin panel and the client-facing front-end for a business SMS messaging product.',
        'Integrated front-end features with Node.js, Express and .NET back ends, and took requirements and demos directly with client stakeholders.',
      ],
    },
    {
      from: 'Oct 2022',
      to: 'Nov 2023',
      title: 'Front-End Developer',
      company: 'NumFin Global',
      place: 'Remote',
      kind: 'Full-time',
      earlier: false,
      points: [
        'Built and optimized React, Next.js and TypeScript applications for a financial analytics product, with Redux and MobX holding application state.',
        'Dashboards and interactive charts over 60,000+ stocks from 70 exchanges. Shipped the payment system and the advertising integrations on the same product.',
        'Worked on SEO and Core Web Vitals across the Next.js application, on rendering, metadata and page speed.',
      ],
    },
    {
      from: 'Jun 2022',
      to: 'Oct 2022',
      title: 'Front-End Developer',
      company: 'Self-employed',
      place: 'Remote',
      kind: 'Freelance',
      earlier: false,
      points: [
        'Delivered web projects end to end, from Figma layouts to deployed responsive sites, with React, TypeScript, SCSS and BEM. Completed an intensive front-end program in five months instead of the standard nine.',
      ],
    },
    {
      from: 'Jun 2021',
      to: 'Jun 2022',
      title: 'Python Developer',
      company: 'Self-employed',
      place: 'Remote',
      kind: 'Freelance',
      earlier: true,
      points: [
        'Built e-commerce functionality with Python and Django, and containerized a Django REST API with Docker.',
      ],
    },
    {
      from: '2016',
      to: '2022',
      title: 'Petroleum Engineer',
      company: 'Oil and gas companies',
      place: 'Russia',
      kind: 'Before the switch',
      earlier: true,
      points: [
        'Delivered the full design, construction and operation cycle for fuel depot sites, coordinating contractors, budgets and regulatory approvals.',
      ],
    },
  ],

  skills: [
    {
      label: 'Every day',
      items: [
        'React 19',
        'TypeScript',
        'JavaScript',
        'Next.js',
        'SCSS / BEM',
        'TanStack Query',
        'Vitest',
        'Git',
      ],
    },
    {
      label: 'Also used in production',
      items: [
        'Angular 20',
        'RxJS',
        'NgRx',
        'Redux Toolkit',
        'MobX',
        'Emotion',
        'react-aria',
        'Custom Elements',
        'Shadow DOM',
        'Nx',
        'Vite',
        'Webpack',
        'Storybook',
        'MSW',
        'Node.js',
        'Express',
        'socket.io',
        'Zod',
        'Docker',
      ],
    },
    {
      label: 'From personal projects',
      items: ['Playwright', 'Cypress', 'Astro'],
    },
    {
      label: 'Used daily, output always reviewed',
      items: ['Claude Code', 'GitHub Copilot', 'ChatGPT'],
    },
  ],

  education: [
    {
      from: '2016',
      to: '2019',
      school: 'Tyumen State Oil and Gas University',
      place: 'Tyumen, Russia',
      degree: "Master's in Engineering",
      field: 'Oil and gas industry',
      logo: 'tiu',
    },
    {
      from: '2012',
      to: '2016',
      school: 'National Mineral Resources University',
      place: 'Saint Petersburg, Russia',
      degree: "Bachelor's in Engineering",
      field: 'Oil and gas industry',
      logo: 'mining',
    },
  ],

  languages: [
    { name: 'English', level: 'Professional working' },
    { name: 'Russian', level: 'Native' },
    { name: 'Portuguese', level: 'A2, learning' },
  ],
} as const;
