# LionsDenGaming Project Reference & Changelog

This document serves as a permanent reference for developers and AI assistants to quickly recall the architecture, API integrations, component hierarchy, filtering rules, and recent changes in the project.

---

## 1. Project Overview & Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (@tailwindcss/postcss) with custom CSS tokens in `src/index.css`
- **Typography**: Custom Font `"Aneba Neue"` (UltraLight, Regular, Medium, SemiBold, Bold)
- **Icons**: `lucide-react`
- **State & Networking**: React State / Hooks + Native Fetch with in-memory caching in service layers

---

## 2. API Endpoints Integrated

### A. Active Providers Endpoint
- **URL**: `https://www.lionsprideengineering.com/api/v1/evoplays/active-providers`
- **Method**: `GET`
- **Response Structure**:
  ```json
  {
    "success": true,
    "message": "Active Providers Fetched successfully",
    "providers": [
      { "displayName": "ArrowsEdge", "filter": "arrowedge" },
      { "displayName": "BetSoft", "filter": "betsoft" },
      { "displayName": "Evoplay", "filter": "evoplay" },
      { "displayName": "KA Games", "filter": "kagames" },
      { "displayName": "LuckyStreak", "filter": "luckystreak" }
    ]
  }
  ```

### B. Games Catalog Endpoint
- **URL**: `https://www.lionsprideengineering.com/api/v1/evoplays/getlist?isMobile=0`
- **Method**: `GET`
- **Key Game Schema Properties**:
  - `_id`, `gameId`, `name`, `image`, `provider`, `isActive`
  - Category flags: `slots` (boolean), `fishing` (boolean), `table` (boolean), `popular` (boolean), `hotToday` (boolean), `jackpots` (boolean), `crash` (boolean)
  - `LuckyStreak` provider games represent **Live Table / Live Casino** games.

---

## 3. Files Created & Modified

| File | Status | Description |
| :--- | :--- | :--- |
| [`src/services/gamesApi.js`](file:///d:/LionsDen%20Codeplace/LionsDenGamingv2/src/services/gamesApi.js) | **NEW** | API service fetching active providers and games catalog with built-in memory caching. |
| [`src/components/gaming/GamesSection.jsx`](file:///d:/LionsDen%20Codeplace/LionsDenGamingv2/src/components/gaming/GamesSection.jsx) | **NEW** | Complete Games section featuring top tabs, expandable horizontal providers row, live search, 2-row full-width auto-slider, and grid view. |
| [`src/pages/home/HomePage.jsx`](file:///d:/LionsDen%20Codeplace/LionsDenGamingv2/src/pages/home/HomePage.jsx) | **MODIFIED** | Integrated `<GamesSection />` in place of the static `<CategoryNav />`. |
| [`PROJECT_REFERENCE.md`](file:///d:/LionsDen%20Codeplace/LionsDenGamingv2/PROJECT_REFERENCE.md) | **NEW** | This persistent reference document for project context and history. |

---

## 4. Component Structure & Business Logic

### A. Top Tabs Bar & Provider Filtering
1. **Row 1 (Top Tabs Bar)**:
   - **`Providers ▾` Tab**: Located as the first button in the top tab row. Clicking it toggles the horizontal providers sub-row directly underneath.
   - **Category Pills**: `Popular`, `Fishing`, `Live Table`, `Slots`, `Table` (Single-select, active state with glowing amber outline `#F8C45E`).
   - **Search Input**: Real-time game search with clear button.
2. **Row 2 (Expandable Horizontal Providers Row)**:
   - Revealed when `Providers ▾` is active/clicked.
   - Contains **"All"** tab + dynamic provider pills (`ArrowsEdge`, `BetSoft`, `Evoplay`, `KA Games`, `LuckyStreak`).
   - **Selection Rules**:
     - By default, **"All"** is selected.
     - Multi-select is supported for individual providers.
     - If all individual providers are selected, **"All"** automatically becomes highlighted.
     - If "All" is active and user clicks one provider, only that provider becomes active.
     - If all providers are unselected, resets back to "All".

### B. Game Catalog Display Modes
1. **2-Row Horizontal Slider Mode (Default)**:
   - Games are arranged in a **2-row horizontal layout** (`grid grid-rows-2 grid-flow-col auto-cols-[145px...205px]`).
   - Spans **full screen width (`w-full`)** with smooth horizontal scrolling.
   - **5-Second Auto-Slide**: Automatically scrolls to the right every 5 seconds and loops seamlessly at the end.
   - **Hover / Touch Pause**: Pauses when hovered or touched and resumes on leave.
   - **Navigation Buttons**: Sleek left (`◀`) and right (`▶`) buttons appear on hover.
2. **Contained Grid View ("Show All" Mode)**:
   - Activated by clicking **"Show All ▶"** in the section title row.
   - Displays all matching games in a responsive 6-column grid inside the centered container (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`) with margins/empty space on the left and right.
   - The button switches to **"Show Less ▲"**.
   - Clicking **"Show Less ▲"** reverts back to the 2-row horizontal slider.

### C. Game Card Design
- Aspect Ratio: `aspect-[4/5]` with `rounded-2xl` container.
- Thumbnail Image with hover scale and fallback image on error.
- Play Button Overlay on hover (`PLAY NOW`).
- Bottom Banner: Semi-transparent dark background (`bg-black/80 backdrop-blur-md`) with bold white game title and gold/amber category badge (`Slots`, `Fishing`, `Live Table`, `Table`, etc.).

---

## 5. Summary of Key Variables & Theme Tokens
- Primary Accent: `#F8C45E` (Golden / Amber)
- Background: `#111111` / `#000000`
- Cards / Surfaces: `#18181b` / `#202022` / `#161618`
- Text: White `#ffffff` with neutral-400 subtitles

---

*Last Updated: 2026-09-16 (Games Section & Providers Filter Integration)*
