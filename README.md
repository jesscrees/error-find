# Error Find
This game teaches you to find mistakes in written text.

## Project Details

### Tech Stack
This project uses [Next.js](https://nextjs.org/), as it is a production-ready framework that works well for creating static sites. This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Designs
The wireframe designs represent the flow of the app, [here are the wireframes in Adobe XD](https://xd.adobe.com/view/36feaa87-e6e3-4cc4-4acc-91842640b5b1-40cf/screen/16c083b5-d6a7-4a5d-9ace-b8e20aa84a27).

### Data
The data for the quiz is provided via an API. [Here is the mock API that is used in this project](https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json). There are 2 types of questions that can come from the API and their data structure differs slightly.

### Hosting
This code is automatically deployed to [Vercel](https://error-find.vercel.app/) when ever a change is pushed to the main branch of this repo on GitHub. Vercel created Next.js so their deployment process works very smoothly with Next.js projects.

## How to run this project
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


## TODO
- Spellcheck ReadMe file
- Add diagrams to README to illustrate how app is structured (Use Mermaid for this?)
- Add coding standards to README
- Deploy project to AWS and Vercel