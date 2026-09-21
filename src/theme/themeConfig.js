export const THEMES = {
  NORMAL: 'normal',
  CHRISTMAS: 'christmas',
  HALLOWEEN: 'halloween',
  THANKSGIVING: 'thanksgiving',
};

export const themeTokens = {
  [THEMES.NORMAL]: {
    colors: {
      primary: '#FFC800', // Gaming gold
      secondary: '#475569',
      accent: '#8b5cf6',
      background: '#020617',
      surface: '#0f172a',
      card: '#1e293b',
      text: '#f8fafc',
      muted: '#94a3b8',
      border: '#334155',
      success: '#22c55e',
      warning: '#f59e0b',
      danger: '#ef4444',
    },
    images: {
      logo: '/assets/images/logo-normal.svg',
      hero: '/assets/images/hero-normal.jpg',
      pageBackground: '/assets/images/bg-normal.jpg',
    }
  },
  [THEMES.CHRISTMAS]: {
    colors: {
      primary: '#dc2626', // Christmas red
      secondary: '#166534', // Christmas green
      accent: '#fcd34d',
      background: '#0f172a',
      surface: '#1e293b',
      card: '#334155',
      text: '#ffffff',
      muted: '#cbd5e1',
      border: '#475569',
      success: '#22c55e',
      warning: '#f59e0b',
      danger: '#ef4444',
    },
    images: {
      logo: '/assets/images/logo-christmas.svg',
      hero: '/assets/images/hero-christmas.jpg',
      pageBackground: '/assets/images/bg-christmas.jpg',
    }
  },
  [THEMES.HALLOWEEN]: {
    colors: {
      primary: '#ea580c', // Halloween orange
      secondary: '#6b21a8', // Halloween purple
      accent: '#a3e635',
      background: '#09090b',
      surface: '#18181b',
      card: '#27272a',
      text: '#fafafa',
      muted: '#a1a1aa',
      border: '#3f3f46',
      success: '#22c55e',
      warning: '#f59e0b',
      danger: '#ef4444',
    },
    images: {
      logo: '/assets/images/logo-halloween.svg',
      hero: '/assets/images/hero-halloween.jpg',
      pageBackground: '/assets/images/bg-halloween.jpg',
    }
  },
  [THEMES.THANKSGIVING]: {
    colors: {
      primary: '#d97706', // Thanksgiving orange/brown
      secondary: '#78350f', 
      accent: '#f59e0b',
      background: '#1c1917',
      surface: '#292524',
      card: '#44403c',
      text: '#f5f5f4',
      muted: '#a8a29e',
      border: '#57534e',
      success: '#22c55e',
      warning: '#f59e0b',
      danger: '#ef4444',
    },
    images: {
      logo: '/assets/images/logo-thanksgiving.svg',
      hero: '/assets/images/hero-thanksgiving.jpg',
      pageBackground: '/assets/images/bg-thanksgiving.jpg',
    }
  }
};
