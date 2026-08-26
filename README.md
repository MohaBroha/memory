# Memory Game

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CF649A?style=for-the-badge&logo=sass&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Educational](https://img.shields.io/badge/License-Educational-8A8A8A?style=for-the-badge)

A responsive and theme-based two-player memory card game developed with HTML5, SCSS and TypeScript.

The project features multiple board sizes, selectable visual themes, responsive layouts, score tracking, animated game transitions and dedicated Game Over, Winner and Draw screens.

## Author

**Moha Broha**

## Features

- Two-player memory game
- Multiple board sizes
  - 4 × 4
  - 4 × 6
  - 6 × 6
- Player color selection
- Turn management
- Score tracking
- Card matching
- Pair detection
- Game completion detection
- Four visual themes
- Theme-specific fonts, colors and assets
- Responsive card layouts
- Responsive Game Over and Winner screens
- Animated screen transitions
- Winner confetti animation
- Winner screen
- Draw screen
- Theme-specific score displays
- Accessible button labels
- Alternative text for meaningful images
- Keyboard-accessible controls

## Technologies

- HTML5
- SCSS
- TypeScript
- Vite
- Git
- GitHub

## Requirements

To run the project locally, the following tools are required:

- Node.js
- npm
- Git

Check the installed versions:

```bash
node --version
npm --version
git --version
```

## Installation

Clone the repository:

```bash
git clone <REPOSITORY_URL>
```

Navigate into the project directory:

```bash
cd memory
```

Install the project dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The Vite development server starts the application and displays the local URL in the terminal.

Open the displayed URL in your browser to start the game.

## Production Build

Create a production build:

```bash
npm run build
```

The generated production files are placed in the `dist` directory.

## Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## TypeScript Check

Check the TypeScript project without generating output:

```bash
npx tsc --noEmit
```

## Code Formatting

The project uses Prettier for consistent code formatting.

Format the complete project:

```bash
npx prettier --write .
```

Format an individual file:

```bash
npx prettier --write src/ui/game-over.ts
```

## Game Flow

The game starts with the settings screen.

Players can configure the game before starting, including the board size, player color and visual theme.

After the game starts, players take turns revealing cards.

When two cards match, the corresponding player receives the pair and their score is updated.

When two cards do not match, the cards are hidden again and the turn changes to the other player.

When all card pairs have been found, the game is finished.

The Game Over screen is displayed with the final score.

After the Game Over screen, the application smoothly transitions to the corresponding result screen.

Depending on the final score, the result is either:

- Winner
- Draw

## Board Sizes

The game supports three different board configurations.

### 4 × 4

16 cards with 8 matching pairs.

### 4 × 6

24 cards with 12 matching pairs.

### 6 × 6

36 cards with 18 matching pairs.

The board layout automatically adapts to the selected board size.

## Themes

The project contains four different visual themes.

### Coding Vibes

Coding Vibes uses the **Red Rose** font and a dark interface with turquoise highlights.

The theme includes additional glow and text-shadow effects for the Game Over and result screens.

The Coding Vibes score display also shows the player names together with their scores.

### Games

Games uses the **Orbitron** font and a blue background with strong pink accents.

The theme follows a modern gaming-inspired visual style.

The score, Game Over and result screens use theme-specific colors and assets.

### DA Project

DA Project uses the **Figtree** font and a dark gradient background.

The design follows a clean and modern visual style with strong contrast and clear typography.

### Food

Food uses the **Klee One** font and a warm orange and beige color palette.

The Game Over screen uses the orange Food background.

The Winner and Draw result screens use the lighter Food background.

## Game Over and Result Screens

The Game Over screen displays the final score of both players.

After the configured delay, the result screen smoothly slides in from the top and covers the Game Over screen.

Depending on the final result, the application displays either a Winner screen or a Draw screen.

### Winner Screen

The Winner screen contains:

- Result title
- Winner name
- Winner-specific image
- Confetti animation
- New Game button

### Draw Screen

The Draw screen contains:

- Draw result title
- Draw label
- Draw-specific image
- New Game button

The transitions are animated to provide a smooth visual change between the Game Over and result screens.

## Responsive Design

The application is responsive and adapts to different screen sizes.

Responsive styling is implemented using SCSS with flexible units and `clamp()` values.

The responsive layout adapts:

- Typography
- Card sizes
- Card grids
- Score displays
- Buttons
- Game header
- Game Over screens
- Winner screens
- Draw screens
- Theme-specific elements

The game is designed to remain usable on:

- Desktop
- Tablet
- Mobile devices

## Project Structure

```text
memory/
├── public/
│   └── assets/
│       ├── components/
│       └── images/
│
├── src/
│   ├── data/
│   │   └── theme-assets.data.ts
│   │
│   ├── game/
│   │   ├── game-state.ts
│   │   └── score.ts
│   │
│   ├── styles/
│   │   ├── layouts/
│   │   ├── themes/
│   │   ├── fonts.scss
│   │   └── style.scss
│   │
│   ├── types/
│   │   ├── game.types.ts
│   │   └── settings.types.ts
│   │
│   ├── ui/
│   │   ├── board.ts
│   │   ├── exit-confirmation.ts
│   │   ├── game-over.ts
│   │   ├── home.ts
│   │   ├── settings.ts
│   │   └── view.ts
│   │
│   └── main.ts
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Architecture

The project separates the main responsibilities into different areas.

### Game Logic

Game-related functionality and state management are located in the `game` directory.

This includes:

- Game state handling
- Score calculation
- Winner detection
- Game-related rules

### UI

The `ui` directory contains the functions responsible for creating and controlling the application's user interface.

Examples include:

- Home screen
- Settings screen
- Game board
- Exit confirmation
- Game Over screen
- View handling

### Types

TypeScript types are centralized in the `types` directory.

This provides type safety and makes shared application structures easier to maintain.

### Theme Data

Theme-specific assets are managed through:

```text
src/data/theme-assets.data.ts
```

This keeps asset references separated from the UI implementation.

### Styling

SCSS is separated into:

```text
src/styles/
├── layouts/
├── themes/
├── fonts.scss
└── style.scss
```

Layout styles, theme styles, fonts and global styles are therefore kept separately.

## TypeScript and DOM

The application uses TypeScript together with the native DOM API to create dynamic UI elements.

UI elements are created using methods such as:

```ts
document.createElement()
```

and configured through:

```ts
classList.add()
textContent
append()
```

This approach allows dynamic game data, scores, themes and assets to be connected directly to the UI while keeping styling in separate SCSS files.

## Accessibility

The project includes several accessibility considerations:

- Semantic HTML elements
- Accessible button labels
- `alt` attributes for meaningful images
- Empty `alt` attributes for decorative images
- Keyboard-accessible buttons
- Visible focus states
- Clear visual distinction between players and game states

## Code Quality

The project follows common development practices including:

- TypeScript type safety
- Separation of game logic and UI responsibilities
- Modular file structure
- Reusable UI functions
- SCSS organization
- Responsive design
- Consistent naming conventions
- Git version control
- Code formatting with Prettier

## Git Workflow

Check the current repository status:

```bash
git status
```

Stage changes:

```bash
git add -A
```

Create a commit:

```bash
git commit -m "feat: describe the change"
```

Push changes to the remote repository:

```bash
git push origin main
```

## Development Workflow

A typical development workflow is:

```bash
git pull
npm install
npm run dev
```

After making changes:

```bash
npx prettier --write .
npx tsc --noEmit
npm run build
```

Afterwards, review the application in the browser before committing the changes.

## Browser Testing

Important areas to verify include:

- Starting a new game
- Selecting different board sizes
- Selecting different themes
- Selecting player colors
- Matching cards
- Switching turns
- Score calculation
- Completing the game
- Winner result
- Draw result
- New Game button
- Responsive layouts
- Mobile layout
- Game Over animation
- Result screen animation
- Confetti animation

## Project Status

The Memory project is completed as a final Developer Academy training project.

The following main areas are implemented:

- Complete game logic
- Multiple board sizes
- Two-player gameplay
- Score tracking
- Four visual themes
- Responsive layouts
- Theme-specific assets
- Game Over screen
- Winner screen
- Draw screen
- Animated transitions
- Responsive result screens

The project is ready for final testing and presentation.

## License

This project was created as part of the Developer Academy training program and is intended for educational purposes.

## Author

**Moha Broha**