/**
 * Everything that changes over time lives here, so updating the CV never means
 * touching a component. Kept in step with the master CV, which is the source of truth.
 *
 * Two rules carried over from it:
 *  - No client or brand names from the current employer. Impersonal only.
 *  - No internal package, service or repository names.
 */

export const profile = {
  name: 'Nikolai Melnichenko',
  role: 'Front-End Developer',
  base: 'Lisbon, Portugal',
  authorization: 'EU work authorization (Portuguese residence permit)',
  available: true,
  availability: 'Open to on-site in Lisbon, hybrid or fully remote',

  // The line that has to do the selling. Second half renders in the accent gradient.
  headline: 'I build front‑ends',
  headlineAccent: 'that ship in seven regulated markets',
  subhead:
    'Five years in front-end, the last two on-site in Lisbon at a thousand-person product company. I build on the shared component library, set up the payment widget for each brand and work on the country-specific builds. Release Captain for my stream.',

  proof: [
    { figure: '7', label: 'regulated markets, from Sweden to New Jersey' },
    { figure: '5+', label: 'years in front-end, React since 2022' },
    { figure: '2', label: 'frameworks in production: React 19 and Angular 20' },
    { figure: '1,000+', label: 'person product company, on-site in Lisbon' },
  ],

  links: {
    email: 'nikolai.melnichenko.fe@gmail.com',
    github: 'https://github.com/nikolaimelni',
    linkedin: 'https://www.linkedin.com/in/nikolai-melnichenko/',
    telegram: 'https://t.me/Nikolaimelni',
    cv: '/CV_Nikolai_Melnichenko.pdf',
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
        'Shipped country-specific builds into seven regulated markets across Europe, North America, Latin America and Africa, including Sweden, Denmark and New Jersey. Layout, content and compliance elements differ by jurisdiction, so each country gets its own project rather than a shared site.',
        'Set up a third-party payment widget for each brand: configuration, loading it on the page and handling its events.',
        'Spent over a year on the Angular 20 side of the platform with RxJS, NgRx and SSR over Express, inside an Nx monorepo.',
        'Expanded automated test coverage with Vitest, React Testing Library and MSW, and cut page load times with code splitting, lazy loading and bundle analysis.',
        'Release Captain for my stream, with full ownership of the release cycle. Wrote the release, branching and code-style conventions the stream works to.',
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
        'Built data-heavy dashboards and interactive charts for financial metrics, and shipped the payment system and the advertising integrations.',
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
        'Delivered the full design, construction and operation cycle for fuel depot sites, coordinating contractors, budgets and regulatory approvals. Six years in a regulated industry is where the habit of reading requirements twice came from.',
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
      label: 'Also shipped with',
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
      label: 'Daily, with the output checked',
      items: ['Claude Code', 'GitHub Copilot'],
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

  languages: 'English: professional working. Russian: native. Portuguese: A2, learning.',
} as const;
