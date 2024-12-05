
## Intall dependencies

```bash
npm install
```

## Set up environment variables
1. Create a .env file in the root of the project
2. Add the following variables:
```
PUBLIC_API_URL="YOUR_CLIENT_API_URL"
SERVER_API_URL="YOUR_SERVER_API_URL"
SOCKET_URL="YOUR_SOCKET_URL"
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
