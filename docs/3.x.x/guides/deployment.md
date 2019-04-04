# Deployment

Strapi gives you many possible deployment options for your project or application. Strapi can be deployed on traditional hosting servers or services such as Heroku, AWS, Azure and others. The following documentation covers how to develop locally with Strapi and deploy Strapi with various hosting options. 

(Deploying **databases** along with Strapi is covered in the [Database Guide](/3.x.x/guides/database.html).)

**Table of contents:**

1. [Configuration](#configuration)

2. [Heroku](#heroku)
    - [Heroku Install Requirements](#heroku-install-requirements)
    - [Heroku CLI Installation and Login](#heroku-cli-installation-and-login)
      - [Install Heroku on Windows](#heroku-windows-installation)
      - [Install Heroku on Mac O/S](#heroku-mac-o-s-installation)
      - [Install Heroku on Ubuntu 16+](#heroku-ubuntu-16-installation)
      - [Login to Heroku](#login-to-heroku-from-your-cli)
    - [Create and Commit a new Strapi project](#create-and-commit-a-new-strapi-project)
    - [Create a Heroku project](#create-a-heroku-project)
    - [Complete Strapi project and Database set-up](#complete-strapi-project-and-database-set-up)
      - [Heroku Postgres](#heroku-postgresql)
      - [Heroku MongoDB](#heroku-mongo)
    - [Heroku Development](#heroku-development)
---

## Configuration

#### #1 - Configure

Update the `production` settings with the IP and domain name where the project will be running.

**Path —** `./config/environments/production/server.json`.
```js
{
  "host": "domain.io", // IP or domain
  "port": 1337,
  "autoReload": {
    "enabled": false
  },
  "admin": {
    "path": "/dashboard" // We highly recommend to change the default `/admin` path for security reasons.
  }
}
```

In case your database is not running on the same server, make sure that the environment of your production 
database (`./config/environments/production/database.json`) is set properly.

If you are passing a number of configuration item values via environment variables which is always encouraged for production environment to keep application stateless, checkout the section for [Dynamic Configuration](../configurations/configurations.md#dynamic-configurations). Here is a hint on how to do it for production, for the configuration mentioned above:
 
 **Path —** `./config/environments/production/server.json`.
```js
{
  "host": "${process.env.APP_HOST || '127.0.0.1'}"
  "port": "${process.env.NODE_PORT || 1337}",
  "autoReload": {
    "enabled": false
  },
  "admin": {
    "path": "/dashboard" // We highly recommend to change the default `/admin` path for security reasons.
  }
}
```

**⚠️  If you changed the path to access to the administration, the step #2 is required.**

#### #2 - Setup (optional)

Run this following command to install the dependencies and build the project with your custom configurations.

```bash
cd /path/to/the/project
npm run setup
```

::: note
To display the build logs use the --debug option `npm run setup --debug`.
:::

#### #3 - Launch the server

Run the server with the `production` settings.

```bash
NODE_ENV=production npm start
```

::: warning
We highly recommend to use [pm2](https://github.com/Unitech/pm2/) to manage your process.
:::

### Advanced configurations

If you want to host the administration on another server than the API, [please take a look at this dedicated section](../advanced/customize-admin.md#deployment).

## Heroku 

This is a step-by-step guide for deploying a Strapi app on [Heroku](https://www.heroku.com/). Databases that work well with Strapi and Heroku are provided instructions below for connecting to them.  

### Heroku Install Requirements
- You must have [Git installed and set-up locally](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup).
- You must have a [free Heroku account](https://signup.heroku.com/) before doing these steps.

If you already have the Heroku CLI installed locally on your computer. Skip to [Login to Heroku](#login-to-heroku-from-your-cli).

### Heroku CLI Installation and Login

Download and install the `Heroku CLI` for your operating system:

::: windows
#### **HEROKU WINDOWS INSTALLATION**

Download the appropriate installer for your Windows installation:

[64-bit installer](https://cli-assets.heroku.com/heroku-x64.exe)
[32-bit installer](https://cli-assets.heroku.com/heroku-x86.exe)

:::

::: mac
#### **HEROKU MAC O/S INSTALLATION**

[Download the installer](https://cli-assets.heroku.com/heroku.pkg)

Also available via Homebrew:

```bash
brew tap heroku/brew && brew install heroku
```
:::

::: ubuntu
#### **HEROKU UBUNTU 16+ INSTALLATION**
Run the following from your terminal:

```bash
sudo snap install --classic heroku
```
:::

Next, you need to login to Heroku from your computer.

#### Login to Heroku from your CLI

```bash
heroku login
heroku: Press any key to open up the browser to login or q to exit:
```

Follow the instructions and return to your command line. 

### Create and Commit a new Strapi project

::: warning NOTE

If you will use a **MongoDB database** with your project, please skip directly [here](#heroku-mongodb). Otherwise, continue with these steps for **SQLite**, **PostgreSQL**, **MySQL**, and **MariaDB**.

:::

1. Create a [new Strapi project](/3.x.x/getting-started/quick-start.html) (or _skip this step but ensure all latest changes are committed for an **existing project** and then go [create a Heroku project](#create-a-heroku-project)_.  

  `Path: ./`

  ```bash
  strapi new my-project --quickstart
  ```

2. Init a Git repository and commit your project.

  `Path: ./my-project/`

  ```bash
  cd my-project
  git init
  git add .
  git commit -am "Initial Commit" 
  ```


### Create a Heroku project.

Create a new Heroku project.

  `Path: ./my-project/`

  ```bash
  heroku create
  ```
  (You can use `heroku create custom-project-name`, to have Heroku create a `custom-project-name.heroku.com` URL.  Otherwise, Heroku will automatically generating a random project name (and URL) for you.)

::: warning NOTE
If you have a Heroku project app already created. You would use the following step to initialize your local project folder:

`Path: ./my-project/`

```bash
heroku git:remote -a your-heroku-app-name
```
:::

Your local development environment is now set-up and configured to work with Heroku. You have a new Strapi and a new Heroku app ready to be configured to work with a database and with each other.

### Complete Strapi project and Database set-up

Below you will find database options when working with Heroku.  Please choose the correct database (e.g. MongoDB, PostgreSQL, etc.) and follow those instructions after completing the above set-up and configuration steps.

:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"

::: tab "PostgreSQL" id="heroku-postgresql"

#### Heroku Postgres

Follow these steps to deploy your Strapi app to Heroku using **PostgreSQL**:

4. Install the [Heroku addon](https://elements.heroku.com/addons/heroku-postgresql) for using Postgres.

  `Path: ./my-project/`

  ```bash
  heroku addons:create heroku-postgresql:hobby-dev
  ```
5. Log into your Heroku account and copy the `DATABASE_URL`, found in your `Settings Page` -> `Config Vars`.

  The `DATABASE_URL` looks similar to this:

  ```
    postgres://ebitxebvixeeqd:dc59b16dedb3a1eef84d4999a0be041bd419c474cd4a0973efc7c9339afb4baf@ec2-50-37-231-192.compute-2.amazonaws.com:5432/d516fp1u21ph7b      
  ```

  The `DATABASE_URL` is parsed like this:

- **DATABASE_USERNAME**: ebitxebvixeeqd
- **DATABASE_PASSWORD**: dc59b16dedb3a1eef84d4999a0be041bd419c4cd4a0973efc7c9339afb4baf
- **DATABASE_HOST**: ec2-50-37-231-192.compute-2.amazonaws.com
- **DATABASE_PORT**: 5432
- **DATABASE_NAME**: d516fp1u21ph7b

6. Configure your local Strapi `database.json` file

  Open `database.json`.
  
  `Path: ./config/environments/production/database.json`.

  Copy your actual production config vars to this file. 
  
  - Edit `"client":` from `"sqlite"` to `"postgres"`
  - Copy the remaining values
  - under `"settings":` add the following value: `"ssl": true`.

  ```json
  {
    "defaultConnection": "default",
    "connections": {
      "default": {
        "connector": "strapi-hook-bookshelf",
        "settings": {
          "client": "postgres",
          "host": "${process.env.DATABASE_HOST || 'ec2-50-37-231-192.compute-2.amazonaws.com'}",
          "port": "${process.env.DATABASE_PORT || 5432}",
          "database": "${process.env.DATABASE_NAME || 'd516fp1u21ph7b'}",
          "username": "${process.env.DATABASE_USERNAME || 'ebitxebvixeeqd'}",
          "password": "${process.env.DATABASE_PASSWORD || 'dc59b16dedb3a1eef84d4999a0be041bd419c474cd4a0973efc7c9339afb4baf'}",
          "ssl": true
        },
        "options": {}
      }
    }
  }
  ```

7. Configure your local Strapi `hook.json` file

  Open `database.json`. 
  
  `Path: ./config/hook.json`.

  Change the `"timeout":` setting from `3000` to `40000`.  This allows Strapi to bootup in the event Heroku puts the app in sleep mode. 

  ```json
  {
    "timeout": 40000,
    "load": {
      "before": [],
      "order": [
        "Define the hooks' load order by putting their names in this array in the right order"
      ],
      "after": []
    }
  }

  ```

7. Install a package called [pg](https://www.npmjs.com/package/pg). Heroku needs this dependency for Heroku Postgress to work with Strapi.  
  `Path: ./my-project/`
  ```bash
  npm install pg --save
  ```

8. Commit and push changes to Heroku.

  `Path: ./my-project/`

  ```bash
  git add .
  git commit -am "Updated database.json file to add database config vars. Changed timeout settings in hook.json. Added NPM package pg."
  git push heroku master
  ```

:::

::: tab "MongoDB" id="heroku-mongo"

#### Heroku MongoDB

Using Strapi and MongoDB requires different set-up and different configuration steps. You cannot use `--quickstart` to develop a `MongoDB` Strapi project. Please follow these steps the **deploy a Strapi app with MongoDB on Heroku**.

1. You must have a [Strapi installation with MongoDB set-up locally](/3.x.x/guides/database.html#install-mongodb-locally).
2. You must have completed the [steps to use Strapi with MongoDB Atlas in production](/3.x.x/guides/database.html#install-on-atlas-mongodb-atlas).

### Create a Heroku project.

Create a new Heroku project.

  `Path: ./my-project/`

  ```bash
  heroku create
  ```
  (You can use `heroku create custom-project-name`, to have Heroku create a `custom-project-name.heroku.com` URL.  Otherwise, Heroku will automatically generating a random project name (and URL) for you.)

  ::: warning NOTE
If you have a Heroku project app already created. You would use the following step to initialize your local project folder:

`Path: ./my-project/`

```bash
heroku git:remote -a your-heroku-app-name
```
:::

Now, [log into Heroku](https://id.heroku.com/login). You should see your app listed in the dashboard.

Click on your app in order to configure Heroku to access your created MongoDB Atlas database.

From within you Heroku app page, complete these steps:
- Click on `Settings`, and next to `Config Vars`, click on the button that says, `Reveal Config Vars`.
- You will need to add five values that correspond to your Strapi `package.json` file and your **MongoDB Atlas** account settings.  These five values are: `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DATABASE PORT`, and `DATABASE_HOST`. You need to add each of these values as a `key` and add their `value` which are the values from **MongoDB Atlas**.

For example, five example values are:

|  KEY | VALUE  |  
|---|---|
| DATABASE_NAME | **strapi-heroku**  |   
| DATABASE_USERNAME  | **paulbocuse**  |   
| DATABASE_PASSWORD   | **mySecretPassword**  |   
| DATABASE_PORT  |   |
| DATABASE_HOST  | **strapi-heroku-shard-00-00-o777o.mongodb.net:27017,strapi-heroku-shard-00-01-o606o.mongodb.net:27017,strapi-heroku-shard-00-02-o606o.mongodb.net:27017/test?ssl=true&replicaSet=Strapi-Heroku-shard-0&authSource=admin&retryWrites=true**  |   

**Note:** Please replace these above values with the actual values of your accounts.

::::

3. Having completed the steps to [complete the Strapi project and database set-up](#complete-strapi-project-and-database-set-up), you can now `git push heroku master` and open your app:

  `Path: ./my-project/``

  ```BASH

  git push heroku master
  heroku apps:open 

  ```
If you see the Strapi **Welcome.** page, you have correctly set-up, configured and deployed your Strapi project on Heroku. You will now need to set-up your `admin user` as the production database is brand-new (and empty).

You can now continue [Tutorial - Creating an Admin User](/3.x.x/getting-started/quick-start-tutorial.html#_3-create-an-admin-user), if you have any questions on how to proceed.


### Heroku Development 

You continue developing your application with Strapi and Heroku by making changes on your computer and then using Git to commit and push those changes. After Heroku applies your changes, you now once again open your app.

  `Path: ./my-project/``

  ```BASH

  git add .
  git commit -am "Changes to my-project noted."
  git push heroku master

  heroku apps:open 

  ```

## AWS

Coming soon. TODO

## Digital Ocean

Coming soon.

## Azure

Coming soon.

## Docker

::: tip
You can also deploy using [Docker](https://hub.docker.com/r/strapi/strapi)
:::

The method below describes regular deployment using the built-in mechanisms.
