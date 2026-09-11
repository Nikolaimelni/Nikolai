/**
 * Everything about Nikolai that changes over time lives here, so updating the
 * CV never means touching a component.
 */

export const profile = {
  name: 'Nikolai Melnichenko',
  role: 'Front-End Developer',
  base: 'Montenegro',
  timezone: 'CET',
  // Flip to false when you stop taking work and the hero badge goes quiet.
  available: true,
  availability: 'Open to full-time and contract work, remote across Europe',

  // The one line that has to do the selling. Keep a number in it.
  headline: 'I build front-ends for fintech and marketplaces',
  subhead:
    'Six years as a petroleum engineer, four building for the web. Most of that on products where the data is the product: 60,000 companies, 70 exchanges, payments that have to clear.',

  proof: [
    { figure: '60,000', label: 'companies on the platform I shipped' },
    { figure: '+20%', label: 'user retention after stability work' },
    { figure: '70', label: 'exchanges feeding one analytics view' },
    { figure: '4 yrs', label: 'in production React and Next.js' },
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
      from: '2023',
      to: 'Present',
      title: 'Front-End Developer',
      company: 'REnumber Lab',
      place: 'Paris, France',
      // Both this and Numfin say Present. Say which is which or the reader guesses.
      kind: 'Contract',
      points: [
        'Rebuilt a marketplace platform end to end on Next.js and TypeScript, cutting page load times and lifting engagement.',
        'Built the admin panel and front-end for a business SMS product.',
        'Extended existing applications over Express.js and .NET, which brought server response times and bug reports down.',
      ],
    },
    {
      from: '2022',
      to: 'Present',
      title: 'Front-End Developer',
      company: 'Numfin Global',
      place: 'London, UK',
      kind: 'Full-time',
      points: [
        'Ran the front-end of a financial analytics platform covering 60,000 companies across 70 exchanges, on React, TypeScript and Next.js.',
        'Stability and performance work that took user retention up 20%.',
        'Shipped the payment system and the ad slots, which is where the project started making money.',
        'Doubled the content on the site by integrating APIs and adding endpoints.',
        'Fixed a long tail of bugs that were holding back SEO, and the traffic followed.',
      ],
    },
    {
      from: '2022',
      to: '2022',
      title: 'Front-End Developer',
      company: 'Freelance and traineeship',
      place: 'Remote',
      kind: '',
      points: [
        'Ten projects from Figma layout to deployed site, on HTML, SCSS and JavaScript.',
        'Ten React applications with TypeScript, hooks, routing and API integration.',
        'Finished a nine-month course in five.',
      ],
    },
    {
      from: '2021',
      to: '2022',
      title: 'Python Developer',
      company: 'Freelance and traineeship',
      place: 'Remote',
      kind: '',
      points: [
        'Built the working parts of an online store on Django.',
        'Wrote services for handling API requests, and the database structures behind them.',
        'Containerised a Django REST API with Docker.',
      ],
    },
    {
      from: '2016',
      to: '2022',
      title: 'Petroleum Engineer',
      company: 'Various oil companies',
      place: '',
      kind: 'Before the switch',
      points: [
        'Design, construction and operation of more than 30 temporary fuel depots, plus maintenance of a reservoir park with a diesel delivery and acceptance point.',
        'Six years of work where a mistake costs real money is the reason I read requirements twice before writing anything.',
      ],
    },
  ],

  education: [
    {
      from: '2016',
      to: '2019',
      school: 'Tyumen Industrial University',
      place: 'Tyumen, Russia',
      degree: "Master's",
      field: 'Petroleum engineering',
      logo: 'tiu',
    },
    {
      from: '2012',
      to: '2016',
      school: 'National Mining University',
      place: 'Saint Petersburg, Russia',
      degree: "Bachelor's",
      field: 'Petroleum engineering',
      logo: 'mining',
    },
  ],

  skills: {
    daily: ['TypeScript', 'React', 'Next.js', 'JavaScript', 'HTML', 'SCSS', 'Git'],
    used: ['MobX', 'Redux', 'Go', 'Python', 'Django', 'SQL', 'Figma'],
  },
} as const;
