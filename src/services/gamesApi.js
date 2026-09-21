// Service for fetching Games and Providers from LionsPride API

const API_BASE_URL = 'https://www.lionsprideengineering.com/api/v1/evoplays';

let cachedProviders = null;
let cachedGames = null;

export const fetchActiveProviders = async (forceRefresh = false) => {
  if (cachedProviders && !forceRefresh) {
    return cachedProviders;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/active-providers`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch providers: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.success && Array.isArray(data.providers)) {
      cachedProviders = data.providers;
      return data.providers;
    }
    return [];
  } catch (error) {
    console.error('Error fetching active providers:', error);
    // Fallback default providers if API fails
    return [
      { displayName: 'ArrowsEdge', filter: 'arrowedge' },
      { displayName: 'BetSoft', filter: 'betsoft' },
      { displayName: 'Evoplay', filter: 'evoplay' },
      { displayName: 'KA Games', filter: 'kagames' },
      { displayName: 'LuckyStreak', filter: 'luckystreak' },
    ];
  }
};

export const fetchGamesList = async (isMobile = 0, forceRefresh = false) => {
  if (cachedGames && !forceRefresh) {
    return cachedGames;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/getlist?isMobile=${isMobile}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.success && Array.isArray(data.data)) {
      cachedGames = data.data;
      return data.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching games list:', error);
    return [];
  }
};
