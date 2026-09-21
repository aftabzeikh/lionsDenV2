---
trigger: always_on
---

# LionsDenGaming Project Context & Rules

## Core Project Information
- **App Type**: Gaming / Casino Web Application (LionsDen Gaming)
- **Framework**: React 19 + Vite + Tailwind CSS v4
- **Primary Color**: `#F8C45E` (Amber / Gold)
- **Font**: `"Aneba Neue"`

## Active Components & APIs
- **Games Section**: [`src/components/gaming/GamesSection.jsx`](file:///d:/LionsDen%20Codeplace/LionsDenGamingv2/src/components/gaming/GamesSection.jsx)
- **API Service**: [`src/services/gamesApi.js`](file:///d:/LionsDen%20Codeplace/LionsDenGamingv2/src/services/gamesApi.js)
  - `active-providers`: `https://www.lionsprideengineering.com/api/v1/evoplays/active-providers`
  - `getlist`: `https://www.lionsprideengineering.com/api/v1/evoplays/getlist?isMobile=0`
- **Homepage**: [`src/pages/home/HomePage.jsx`](file:///d:/LionsDen%20Codeplace/LionsDenGamingv2/src/pages/home/HomePage.jsx)

## Filtering Behavior Rules
1. **Providers**: Top `Providers ▾` tab expands horizontal row. Multi-select enabled. Defaults to `All`. Automatically highlights `All` when all providers are selected.
2. **Categories**: Single-select pills (`Popular`, `Fishing`, `Live Table`, `Slots`, `Table`).
3. **Search**: Live title filter within selected providers & category.
4. **Slider Mode (Default)**: 2-row full-width horizontal slider with 5-second auto-slide and pause on hover/touch.
5. **Show All / Show Less**: Toggles between 2-row slider and 6-column contained grid view.
