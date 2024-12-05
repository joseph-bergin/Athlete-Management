
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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Flask Documentation](https://flask.palletsprojects.com/en/1.1.x/) - learn about Flask features and API.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
