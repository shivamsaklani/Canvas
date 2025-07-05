# Demo
1 Landing Page
![Screenshot from 2025-07-05 17-24-35](https://github.com/user-attachments/assets/6b23450c-e3c8-4e0b-8c09-4eeb6716aaab)
2 Signup 
![Screenshot from 2025-07-05 17-25-44](https://github.com/user-attachments/assets/591ae5c9-9f94-4aa4-88aa-3e3fc295a5a5)
3 OTP verification- Used Reddis for generating OTP

![Screenshot from 2025-07-05 17-38-03](https://github.com/user-attachments/assets/8ae12583-5b4c-4cb4-a80b-169956dcad6b)

4 SignIn

![Screenshot from 2025-07-05 17-38-29](https://github.com/user-attachments/assets/f7b6720e-cd0e-479c-9dd1-4aae8e3b7a5d)
5 Main Dashboard

![Screenshot from 2025-07-05 17-38-39](https://github.com/user-attachments/assets/7710182c-f722-4231-9e93-db97ecf16e8d)

6 Canvas Area to Draw 2d figures 

![Screenshot from 2025-07-05 17-39-38](https://github.com/user-attachments/assets/d90fbecd-d23d-4167-ad01-e36993dc915d)

7 Join Other Rooms 

![Screenshot from 2025-07-05 17-40-05](https://github.com/user-attachments/assets/fa3ac305-f60a-4dd2-9de7-f27f2d367235)



# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
