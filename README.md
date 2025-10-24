# Protocols

A modern Next.js web application for creating, editing, and managing collaborative text documents with a rich-text editor.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with Turbopack
- **UI:** [React 19](https://react.dev/) + [Tailwind CSS 4](https://tailwindcss.com/)
- **Editor:** [Lexical](https://lexical.dev/) with [shadcn-editor](https://github.com/htmujahid/shadcn-editor)
- **Database:** [Supabase](https://supabase.com/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Auth:** [Better Auth](https://www.better-auth.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **PDF Export:** [React-pdf](https://react-pdf.org/) (not implemented yet)
- **Icons:** [Lucide React](https://lucide.dev/)

## Prerequisites

- [Docker](https://www.docker.com/) - Required for running Supabase locally
- [Node.js](https://nodejs.org/) with npm, or any other JS runtime and package manager

## Getting Started

1. **Install dependencies:**

   ```
   npm install
   ```

2. **Set up environment variables:**

   ```
   cp .env.example .env.local
   ```

   Uncomment all variables.

3. **Start the database:**

   ```
   npm run db:start
   ```

4. **Initialize users**

   ```
   npm run init:users
   ```

5. **Run the development server:**

   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

7. You can log in as guest or as admin. See your .env.local file for the admin credentials. Guest credentials are prepopulated in the login form.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Run prettier
- `npm run typecheck` - Run TypeScript type checking
- `npm run db:reset` - Reset database
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push database schema changes
- `npm run init:users` - Add initial users to the database

## Disclaimer

This project is in active development. Many features are not yet implemented, such as:

- Complete WYSIWYG-functionality
- Account based auth and role restrictions
- User and account management dashboard
- Search and filter functionality for keywords in /protocols page
- PDF generation
