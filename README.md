This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Development

Pasos para levantar la app en desarrollo

- Instalar dependencias

```bash
npm install
```

- Levantar la base de datos

```bash
docker compose up -d
```

- Levantar el servidor

```bash
npm run dev
```

- Abrir el navegador en la siguiente url

```bash
http://localhost:3000
```

## Deploy

Pasos para hacer deploy de la app

- Instalar dependencias

```bash
npm install
```

- Compilar la app

```bash
npm run build
```

- Levantar el servidor

```bash
npm run start
```

- Abrir el navegador en la siguiente url

```bash
http://localhost:3000
```

## Test

Pasos para ejecutar los test

- Instalar dependencias

```bash
npm install
```

- Ejecutar los test

```bash
npm run test
```

# Prisma commands

1. Levantar la base de datos

```bash
npx prisma init

npx prisma migrate dev

npx prisma generate
```

2. Renombrar el .en.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar al SEED para crear la base de datos local
