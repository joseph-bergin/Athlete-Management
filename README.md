
<br/>

## Introduction

This project is a web application designed for managing athlete data, tracking performance, and providing analytics through intuitive visualizations. It integrates with **Auth0** for user authentication and **Flask** for the backend, offering secure access control and real-time performance tracking. The frontend is built using **Next.js**, **Tailwind CSS**, and **React** to provide a seamless user experience.

## How It Works

The Python/Flask server is mapped into to Next.js app under `/api/`.

This is implemented using [`next.config.js` rewrites](https://github.com/vercel/examples/blob/main/python/nextjs-flask/next.config.js) to map any request to `/api/:path*` to the Flask API, which is hosted in the `/api` folder.

On localhost, the rewrite will be made to the `127.0.0.1:5000` port, which is where the Flask server is running.

In production, the Flask server is hosted as [Python serverless functions](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python) on Vercel.

## Developing Locally

You can clone & create this repo with the following command

```bash
git clone https://github.com/joseph-bergin/Athlete-Management.git
cd Athlete-Management
```

## Getting Started

First, install the dependencies:

```bash
npm install
# or
pnpm install
```

Then, run the development server (this will install more requirements):

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The Flask server will be running on [http://127.0.0.1:5000](http://127.0.0.1:5000) – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).

In order for the DB to run, you must create the tables using the run_script.sql file in Athlete-Management/db. 

------------------------*IMPORTANT*------------------------

You must set up your own .env file that includes your own Auth0 and Supabase credentials. Your .env file should look something like this:

AUTH0_SECRET='SECRET KEY GOES HERE'<br/>
AUTH0_BASE_URL='BASE URL GOES HERE'<br/>
AUTH0_ISSUER_BASE_URL='ISSUER BASE URL GOES HERE'<br/>
AUTH0_CLIENT_ID='CLIENT ID GOES HERE'<br/>
AUTH0_CLIENT_SECRET='CLIENT SECRET KEY GOES HERE'<br/>
<br/>
SUPABASE_URL='URL GOES HERE'<br/>
SUPABASE_KEY='KEY GOES HERE'<br/>
<br/>


## Branch Descriptions
There are multiple branches in our GitHub repository, each containing features that were worked on but not yet finished:
<br/><br/>
main: This is the most up-to-date working code that implements all the features previously mentioned in the application. It serves as the stable version of the app.
<br/><br/>
performance-table: This branch contains code for implementing a data table to display athlete data. This feature was meant to give users another way to interact with and view the data, but it is not yet fully completed.
<br/><br/>
new-team: This branch has code for implementing a "Create Team" button, accessible via a drop-down menu at the top of the screen. When pressed, a dialog box pops up, allowing users to enter a team name. Once the "Create Team" button is clicked, the team is added to the database, and the user's ID is linked to the team, allowing them to view players and import data. Currently, there is a bug preventing users from interacting with the screen after a team is created, which needs to be fixed in the future.
<br/><br/>
new-charts: This branch contains code for adding a drop-down menu on the performance analytics page that allows users to select an athlete's position. Once a position is selected, only athletes in that position will appear in the second drop-down menu, streamlining the process of selecting and comparing athletes.
<br/><br/>

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Flask Documentation](https://flask.palletsprojects.com/en/1.1.x/) - learn about Flask features and API.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
