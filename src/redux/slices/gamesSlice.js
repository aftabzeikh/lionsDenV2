import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchActiveProviders, fetchGamesList } from '../../services/gamesApi';

// Helper to categorize games into slot, live table, hot today, popular, jackpot, etc.
export const categorizeGames = (gamesList = []) => {
  const result = {
    slots: [],
    liveTable: [],
    hotToday: [],
    popular: [],
    jackpot: [],
    fishing: [],
    table: [],
  };

  if (!Array.isArray(gamesList) || gamesList.length === 0) {
    return result;
  }

  gamesList.forEach((game, idx) => {
    // 1. Slots Category
    if (
      game.slots ||
      game.category?.toLowerCase() === 'slots' ||
      game.type?.toLowerCase() === 'slot' ||
      (!game.table && !game.fishing && !game.liveTable && game.provider !== 'luckystreak')
    ) {
      result.slots.push(game);
    }

    // 2. Live Table Category
    if (
      game.liveTable ||
      game.provider?.toLowerCase() === 'luckystreak' ||
      game.category?.toLowerCase() === 'live_table' ||
      game.category?.toLowerCase() === 'livetable' ||
      (game.table && game.provider?.toLowerCase() === 'luckystreak')
    ) {
      result.liveTable.push(game);
    }

    // 3. Hot Today Category (Trending / Hot / Top featured)
    if (
      game.hotToday ||
      game.hot ||
      game.trending ||
      game.featured ||
      (game.popular && idx % 2 === 0) ||
      idx < 15
    ) {
      result.hotToday.push(game);
    }

    // 4. Popular Category
    if (
      game.popular ||
      game.isPopular ||
      game.rating >= 4.5 ||
      idx % 3 === 0
    ) {
      result.popular.push(game);
    }

    // 5. Jackpot Category
    if (
      game.jackpot ||
      game.jackpots ||
      game.hasJackpot ||
      game.category?.toLowerCase() === 'jackpot' ||
      game.category?.toLowerCase() === 'jackpots' ||
      (game.slots && idx % 4 === 0)
    ) {
      result.jackpot.push(game);
    }

    // 6. Fishing Category
    if (
      game.fishing ||
      game.category?.toLowerCase() === 'fishing'
    ) {
      result.fishing.push(game);
    }

    // 7. Table Games Category
    if (
      game.table ||
      game.category?.toLowerCase() === 'table'
    ) {
      result.table.push(game);
    }
  });

  return result;
};

// Async Thunk to fetch both Providers and Games globally
export const fetchGamesData = createAsyncThunk(
  'games/fetchGamesData',
  async (_, { rejectWithValue }) => {
    try {
      const [providersData, gamesData] = await Promise.all([
        fetchActiveProviders(),
        fetchGamesList(0),
      ]);
      return { providers: providersData, games: gamesData };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch games data');
    }
  }
);

const initialState = {
  games: [],
  categories: {
    slots: [],
    liveTable: [],
    hotToday: [],
    popular: [],
    jackpot: [],
    fishing: [],
    table: [],
  },
  providers: [],
  topPicks: [],
  isLoading: false,
  error: null,
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
      state.categories = categorizeGames(action.payload);
      state.topPicks = (action.payload || []).slice(0, 10).map((g, idx) => ({ ...g, rank: idx + 1 }));
    },
    setProviders: (state, action) => {
      state.providers = action.payload;
    },
    setTopPicks: (state, action) => {
      state.topPicks = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGamesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.providers = action.payload.providers || [];
        state.games = action.payload.games || [];
        state.categories = categorizeGames(action.payload.games || []);
        state.topPicks = (action.payload.games || []).slice(0, 10).map((g, idx) => ({ ...g, rank: idx + 1 }));
      })
      .addCase(fetchGamesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch games';
      });
  },
});

export const { setGames, setProviders, setTopPicks, setLoading, setError } = gamesSlice.actions;

// Selectors
export const selectAllGames = (state) => state.games?.games || [];
export const selectGameCategories = (state) => state.games?.categories || {};
export const selectSlotGames = (state) => state.games?.categories?.slots || [];
export const selectLiveTableGames = (state) => state.games?.categories?.liveTable || [];
export const selectHotTodayGames = (state) => state.games?.categories?.hotToday || [];
export const selectPopularGames = (state) => state.games?.categories?.popular || [];
export const selectJackpotGames = (state) => state.games?.categories?.jackpot || [];
export const selectFishingGames = (state) => state.games?.categories?.fishing || [];
export const selectTableGames = (state) => state.games?.categories?.table || [];

export const selectProviders = (state) => state.games?.providers || [];
export const selectTopPicks = (state) => state.games?.topPicks || [];
export const selectGamesLoading = (state) => state.games?.isLoading || false;
export const selectGamesError = (state) => state.games?.error || null;

export default gamesSlice.reducer;
