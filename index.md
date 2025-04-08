![](https://github.com/ics-software-engineering/nextjs-application-template/raw/main/doc/landing-page.png)


<img src="./doc/Screenshot 2025-04-07 221121.png">

## Installation

First, [install PostgreSQL](https://www.postgresql.org/download/). Then create a database for your application.

```

$ createdb -U jaydenh0925 digits
Password:
$

```

Second, go to [https://github.com/ics-software-engineering/nextjs-application-template](https://github.com/ics-software-engineering/nextjs-application-template), and click the "Use this template" button. Complete the dialog box to create a new repository that you own that is initialized with this template's files.

Third, go to your newly created repository, and click the "Clone or download" button to download your new GitHub repo to your local file system. Using [GitHub Desktop](https://desktop.github.com/) is a great choice if you use MacOS or Windows.

Fourth, cd into the directory of your local copy of the repo, and install third party libraries with:

```

$ npm install

```

Fifth, create a `.env` file from the `sample.env`. Set the `DATABASE_URL` variable to match your PostgreSQL database that you created in the first step. See the Prisma docs [Connect your database](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgresql). Then run the Prisma migration `npx prisma migrate dev` to set up the PostgreSQL tables.

```

$ npx prisma migrate dev
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "<your database name>", schema "public" at "localhost:5432"

Applying migration `20240708195109_init`

The following migration(s) have been applied:

migrations/
└─ 20240708195109_init/
└─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (v5.16.1) to ./node_modules/@prisma/client in 51ms

$

```

Then seed the database with the `/config/settings.development.json` data using `npx prisma db seed`.

```

PS C:\Users\jayde\OneDrive\Desktop\digits> npx prisma migrate dev --name cleanup
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database "digits", schema "public" at "localhost:5432"

Applying migration `20240708195109_init`
Applying migration `20250401032022_contact`
Applying migration `20250405092618_note`
Applying migration `20250408080406_cleanup`

The following migration(s) have been applied:

migrations/
  └─ 20240708195109_init/
    └─ migration.sql
  └─ 20250401032022_contact/
    └─ migration.sql
  └─ 20250405092618_note/
    └─ migration.sql
  └─ 20250408080406_cleanup/
    └─ migration.sql

Your database is now in sync with your schema.
```

## Running the system

Once the libraries are installed and the database seeded, you can run the application by invoking the "dev" script in the [package.json file]

```

PS C:\Users\jayde\OneDrive\Desktop\digits> npm run dev

> nextjs-application-template-1@0.1.0 dev
> next dev

  ▲ Next.js 14.2.26
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 1489ms
 ○ Compiling / ...
 ✓ Compiled / in 2.6s (5010 modules)
 GET / 200 in 2832ms
 ✓ Compiled /api/auth/[...nextauth] in 355ms (2723 modules)
 GET /api/auth/session 200 in 1762ms
 GET /api/auth/session 200 in 12ms
 GET /api/auth/session 200 in 15ms
 GET / 200 in 87ms
 GET /api/auth/session 200 in 14ms
 GET /api/auth/session 200 in 8ms
 GET / 200 in 69ms
 GET /api/auth/session 200 in 14ms
 GET /api/auth/session 200 in 8ms
 GET /api/auth/session 200 in 14ms
 GET /api/auth/session 200 in 24ms
 GET / 200 in 69ms
 GET /api/auth/session 200 in 13ms
 GET /api/auth/session 200 in 7ms
 ○ Compiling /list ...
 ✓ Compiled /list in 827ms (5416 modules)

```

### Viewing the running app

If all goes well, the template application will appear at [http://localhost:3000](http://localhost:3000). You can login using the credentials in [settings.development.json] or else register a new account.

### ESLint

You can verify that the code obeys our coding standards by running ESLint over the code in the src/ directory with:

```
$ npm run lint

```

## Walkthrough

The following sections describe the major features of this template.

### Directory structure

The top-level directory structure is:

```

.github # holds the GitHub Continuous Integration action and Issue template.

config/ # holds configuration files, such as settings.development.json

doc/ # holds developer documentation, user guides, etc.

prisma/ # holds the Prisma ORM schema and seed.ts files.

public/ # holds the public images.

src/ # holds the application files.

tests/ # holds the Playwright acceptance tests.

.eslintrc.json # The ESLint configuration.

.gitignore # don't commit VSCode settings files, node_modules, and settings.production.json

```

This structure separates documentation files (such as screenshots) and configuration files (such as the settings files) from the actual Next.js application.

The src/ directory has this structure:

```

app/

  add/ # The add route
    page.tsx # The Add Stuff Page

  admin/
    page.tsx # The Admin Page

  api/auth/[...nextauth]/
    route.ts # The NextAuth configuration

  auth/
    change-password/
      page.tsx # The Change Password Page

    signin/
      page.tsx # The Sign In Page

    signout/
      page.tsx # The Sign Out Page

    signup/
      page.tsx # The Sign Up / Register Page

  edit/
    page.tsx # The Edit Stuff Page

  list/
    page.tsx # The List Stuff Page

  not-authorized/
    page.tsx # The Not Authorized Page

  layout.tsx # The layout of the application

  page.tsx # The Landing Page

  providers.tsx # Session providers.

  components/
    AddContactForm.tsx # The React Hook Form for adding contact.

    EditContactForm.tsx # The Edit Contact Form.

    Footer.tsx # The application footer.

    LoadingSpinner.tsx # Indicates working.

    Navbar.tsx # The application navbar.


  lib/

    dbActions.ts # Functions to manipulate the Postgres database.

    page-protections.ts # Functions to check for logged in users and their roles.

    prisma.ts # Singleton Prisma client.

    validationSchemas.ts # Yup schemas for validating forms.

  tests/ # playwright acceptance tests.

```

### Application functionality

The application implements a simple CRUD application for managing "Stuff", which is a PostgreSQL table consisting of a name (String), a quantity (Number), a condition (one of 'excellent', 'good', 'fair', or 'poor') and an owner.

By default, each user only sees the Stuff that they have created. However, the settings file enables you to define default accounts. If you define a user with the role "admin", then that user gets access to a special page which lists all the Stuff defined by all users.

#### Landing page

When you retrieve the app at http://localhost:3000, this is what should be displayed:

<img src="/doc/landing-page.png">

The next step is to use the Login menu to either Login to an existing account or register a new account.


#### Login page

After Login link, then on the contact displays by user:

<img src="/doc/list-contact.png">


#### Register page

Alternatively, clicking on the Login link, then on the Sign Up menu item displays this page:

<img src="/doc/add-contact.png">


<!--
## Screencasts

For more information about this system, please watch one or more of the following screencasts. Note that the current source code might differ slightly from the code in these screencasts, but the changes should be very minor.

- [Walkthrough of system user interface (6 min)](https://youtu.be/48xu1hrqUi8)
- [Data and accounts structure and initialization (18 min)](https://youtu.be/HZRjwrVBWp4)
- [Navigation, routing, pages, components (34 min)](https://youtu.be/XztTdHpv6Jw)
- [Forms (32 min)](https://youtu.be/8FyWR3gUGCM)
- [Authorization, authentication, and roles (12 min)](https://youtu.be/9HX5vuXTlvA)
-->
