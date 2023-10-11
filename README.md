# Error Find
This game teaches you to find mistakes in written text.

## Tech stack
- [Next.js](https://nextjs.org/) - a production-ready framework that works well for creating static sites.
- Hosted on [AWS](https://main.d2pi1shfsx45in.amplifyapp.com/) and [Vercel](https://error-find.vercel.app/). Code is automatically deployed whenever a change is pushed up to the main branch of this repo.
- ESLint embedded in the project for linting.
- Prettier embedded in the project for consistent formatting.

## Project structure
- src/components - contains all of the components used across all of the pages.
  - src/components/componentName - if a component is styled then it lives in its own folder where the logic and styling are kept together.
- src/constants - contains any constants that are needed site-wide. In this app, that means the text used on the screen that doesn't come directly from the API.
- src/pages - contains each of the screens shown in the app.
- src/styles - contains the global styles as well as the 2 screen styles shown in the app.
- src/types - contains the types used in the app.
- src/helpers.ts - utility functions that are used site-wide.

## How to run this project locally
First, install the dependencies for this project:
```bash
npm install
# or
yarn install
```

Then, run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. This page will auto-update as you edit the file.

## Assumptions I made about the logic of the app
- Activities only become enabled when the previous activity has been completed.
- Activities should start at the first question, even if the activity was partially completed before.
- If a user answers the same question a 2nd time, then it overrides their previous answer.
- Answering the last question of a round, automatically starts the next round.
- The round introduction screen automatically transitions into the 1st question of the round.
- There is a results page that only becomes enabled when all activities have been completed.
  - That results page should contain the results for every activity.
- Assumed a 404 page should exist and should match the styling of other pages.
- Disabled links should also be disabled for screen readers, so I removed the href from the links to ensure users wouldn't be able to navigate to disabled links when using a keyboard.

## Assumptions I made about the design
- The wireframes show screens in both portrait and landscape so I assumed that the app should be full-screen on all screen sizes.
- Font - I couldn't find which font was being used in the design so I used a similar one from Google called Inter.
- Spacing and sizes - I couldn't inspect the wireframes to see how much padding/margin was being used, I also couldn't see exactly what the font sizes were, so I made an educated guess based on the visuals alone.
