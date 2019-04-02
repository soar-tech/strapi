# Deployment

## Setup

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

This is a step-by-step guide for deploying a Strapi app on [Heroku](https://www.heroku.com/). The app will use Strapi as the headless CMS and Heroku will host and deliver the app. There are many databases that work well with Strapi and Heroku, and so, below you will also find instructions for connecting to them.  

### Heroku account and app project set-up 

You will need a Heroku account. You can get started with a [free Heroku Account](https://www.heroku.com/) if you don't have one. 

1. Login to your Heroku account. 
2. If this your first app, click on the button that says `Create new app`. (If it is not your first app, click on the `New` button in the top right and then click `Create New App`.) <br>
    From here, complete the following steps:
    - App name: e.g. `demo-strapi-cms` or `demo-strapi-mongo`. <br>
      The name you choose will be part of the URL. If you don't choose a name, Heroku will create a unique name for you. (e.g., `fjord-crossings-34990`). 
    - Choose a region: `Europe`. <br>
      Choose the region closest to you.
    - The next screen presents options for a `Deployment method`. We will use `Heroku Git`. 

 You are now ready to continue the installation. Next, you will set-up your local development environment.

### Set-up your local development environment

You need Git installed and set-up locally before you can [install and use the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

(If you do not have Git installed locally, please [download Git](https://git-scm.com/downloads) and install it for your operating system. Then,configure the global Git settings for your `user.name` and `user.email` found [here](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup). 

You can check to see if you have `git` installed from your command line:

```bash
git --version
```


1. Download and install the `Heroku CLI` for your operating system:

::: windows
**WINDOWS**

Download the appropriate installer for your Windows installation:

[64-bit installer](https://cli-assets.heroku.com/heroku-x64.exe)
[32-bit installer](https://cli-assets.heroku.com/heroku-x86.exe)

:::

::: mac
**MAC O/S**

[Download the installer](https://cli-assets.heroku.com/heroku.pkg)

Also available via Homebrew:

```bash
brew tap heroku/brew && brew install heroku
```
:::

::: ubuntu
**UBUNTU 16+**
Run the following from your terminal:

```bash
sudo snap install --classic heroku
```
:::

Additional options to install the Heroku CLI are available [here](https://devcenter.heroku.com/articles/heroku-cli).

2. After you have installed the Heroku CLI on your development environment, verify the installation with `heroku --version`:

```bash 
heroku --version
heroku/7.22.7 darwin-x64 node-v11.10.1 
```

3. Next, you need to login to Heroku from your computer using your command line terminal (see below):

```bash
heroku login
heroku: Press any key to open up the browser to login or q to exit:
```

4. After you press _any key_, your browser will display a **_"Log in to the Heroku CLI"_** page with a `Log in` button. Click it, close the browser tab, and return to your command line. You should see something like this:

```bash
Opening browser to https://cli-auth.heroku.com/auth/browser/c1aed8-ce66-41ae-9fbc-5c742359
Logging in... done
Logged in as david@strapi.io
```
The Heroku CLI saves your email address and an API token to `~/.netrc` for future use. 

Your local development environment is now set-up and configured to work with Heroku.

### Commit and push Strapi to Heroku

1. Navigate to your `Projects/` directory and into your `cms` project folder. Follow these commands to make an initial commit of your project.

```bash 
cd cms
git init
Initialized empty Git repository in /Desktop/Projects/cms/.git/
git add .
git commit -am "Initial commit"
    ... 
 create mode 100644 plugins/users-permissions/models/User.js
 create mode 100644 plugins/users-permissions/models/User.settings.json
 create mode 100644 plugins/users-permissions/package.json
 create mode 100644 plugins/users-permissions/services/Jwt.js
 create mode 100644 plugins/users-permissions/services/Providers.js
 create mode 100644 plugins/users-permissions/services/User.js
 create mode 100644 plugins/users-permissions/services/UsersPermissions.js
 create mode 100644 public/index.html
 create mode 100644 public/robots.txt
 create mode 100644 public/uploads/.gitkeep
 create mode 100755 server.js
strapi:cms david$ 

```
You will next push your Strapi project to Heroku.

1. Navigate to the `cms/` project root. Now add this local Git repository (the project files) to the existing Heroku app. For example, in this tutorial the project is named `demo-strapi-cms` in Heroku. You will need your Heroku app name for the next steps:

```bash
heroku git:remote -a demo-strapi-cms     // ADD YOUR OWN APP NAME
```

2. Now you need to upload the Strapi files to Heroku and you do this by git pushing the files to the server. Enter `git push heroku master` in the command line and you should see something like this:

```bash
git push heroku master

Counting objects: 1926, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (1854/1854), done.
Writing objects: 100% (1926/1926), 15.23 MiB | 4.93 MiB/s, done.
Total 1926 (delta 199), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
...
remote: -----> Compressing...
remote:        Done: 86.4M
remote: -----> Launching...
remote:        Released v3
remote:        https://demo-strapi-cms.herokuapp.com/ deployed to Heroku
remote: 
remote: Verifying deploy... done.
To https://git.heroku.com/demo-strapi-cms.git
 * [new branch]      master -> master
```

You Strapi project is now uploaded to Heroku. You are now ready to configure Heroku to work with an external database hosting service. Please follow the instruction below to [configure heroku to work with database](#configuring-heroku-to-work-with-databases).


### Configuring Heroku to work with Databases.

Please navigate to the section that corresponds to the database and/or external database solution you will be using with your application:

---

### MongoDB Atlas 

In this section you will be configuring Heroku with a [free MongoDB Atlas account](https://www.mongodb.com/cloud/atlas). Prior to this section, you should have [created a local Strapi project using MongoDB](http://localhost:8080/documentation/3.x.x/guides/database.html#install-strapi-with-mongodb) and then [uploaded it to Heroku](/3.x.x/guides/deployment.html#commit-and-push-strapi-to-heroku). 

You should have already [created and configured a MongoDB Atlas Cluster](/3.x.x/guides/database.html#install-on-atlas-mongodb-atlas).


Now,[log into Heroku](https://id.heroku.com/login). You should see your app listed in the dashboard. Go ahead and click on it. Next, you will configure Heroku to access the MongoDB Atlas database you have already created.

From within the Heroku app page, go ahead and complete these steps:
- Click on `Settings`, and next to `Config Vars`, click on the button that says, `Reveal Config Vars`.
- You will need to add five values that correspond to your Strapi `package.json` file and your **MongoDB Atlas** account settings.  These five values are: `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DATABASE PORT`, and `DATABASE_HOST`.

The five example values from [installing on Atlas: MongoDB Atlas](/3.x.x/guides/database.html#install-on-atlas-mongodb-atlas), are:

|  KEY | VALUE  |  
|---|---|
| DATABASE_NAME | **strapi-heroku**  |   
| DATABASE_USERNAME  | **paulbocuse**  |   
| DATABASE_PASSWORD   | **mySecretPassword**  |   
| DATABASE_PORT  |   |
| DATABASE_HOST  | **strapi-heroku-shard-00-00-o777o.mongodb.net:27017,strapi-heroku-shard-00-01-o606o.mongodb.net:27017,strapi-heroku-shard-00-02-o606o.mongodb.net:27017/test?ssl=true&replicaSet=Strapi-Heroku-shard-0&authSource=admin&retryWrites=true**  |   

**Note:** Please replace these above values with the actual values of your accounts.


3. You should now be able to see your app in the browser. 
- Click back to `Overview`
- Click the `Open app`

If you see the Strapi **Welcome.** page for your app, you have correctly set-up, configured and deployed your Strapi project using MongoDB Atlas on Heroku. You will now need to set-up your `admin user` as the `MondoDB Atlas` database is brand-new (and empty).

You can now continue [Tutorial - Creating an Admin User](/3.x.x/getting-started/quick-start-tutorial.html#_3-create-an-admin-user), if you have any questions on how to proceed.


### PostgreSQL

In this section two different installations methods are available for developing and deploying with PostgreSQL on Heroku. The first is developing with SQLite but having a PostgreSQL deployment. The second method is developing with PostgreSQL installed and being used on your development environment.

It is recommended to develop with SQLite and deploy to a PostreSQL deployment. 

#### Heroku Postgres

Prior to beginning this section, you should have completed the steps and actions for [creating a Heroku account and a Heroku app](#heroku-account-and-app-project-set-up), you should have [created a Quick Start local installation of Strapi](/documentation/3.x.x/getting-started/quick-start.html) and then [Git Init and Pushed it to Heroku](#commit-and-push-strapi-to-heroku). The next step is to install and configure [Heroku Postgres](https://elements.heroku.com/addons/heroku-postgresql).

Here are the basic steps to deploy an Strapi app to Heroku using PostgreSQL:

1. Log in to Heroku and create a new app.  (This should be already done following [these instructions](#heroku-account-and-app-project-set-up)). 
2. Create a local development Strapi Project.  The [Quick Start guide](/documentation/3.x.x/getting-started/quick-start.html) shows exactly how to accomplish this. From your `Projects` folder:

```bash
strapi new cms-strapi-postgres --quickstart
```
3. Commit and push Strapi to Heroku ([You must be logged in to Heroku](/documentation/3.x.x/guides/deployment.html#set-up-your-local-development-environment)):

```bash
heroku login
cd cms-strapi-postgres
git init
git add .
git commit -am "Initial Commit" 
```

Next, you will need to [initialize the Heroku Git repository](#commit-and-push-strapi-to-heroku).  You will need your app name. You app `Deploy page` has the exact commands you need to deploy. The you will be able to `push` your project to Heroku:

```bash
heroku git:remote -a cms-strapi-postgres     // ADD YOUR OWN APP NAME
git push heroku master
```

4. Next we need to install a Heroku plug for using Postgres. From your Heroku Dashboard, add the `Heroku Postgres Add-On` to your project through the following steps:
  - From your Heroku App `Overview` dashboard, click the `Configure Add-ons ->` link.
  - Under `Add-ons`, search for and click on `Heroku Postgres`.  There will be a pop-up, from the ensure that it says, **"Heroku Postgres --> cms-strap-postgress"**  (This should be YOUR app name in Heroku.) At the same time, choose a `Plan name`, in this case; `Hobby Dev - Free` and then click the `Provision` button.

5. The next steps are to test the database connection using the appropriate tool for your operating system. Before you can test the database connection, you will need to note down the `config vars`. From within your `Heroku Dashboard`:
 - Click to the `Settings Page`
 - In the `Config Vars` section, click on `Reveal Config Vars`.
 - Note down the `Config Vars`. Next to `DATABASE URL`, you should see a link that starts with, `postgres://`, copy this. 
   
Below you will find instructions on using the appropriate tool for your operating system to test your database connection using the link you noted above.

#### Manually Parsing the Heroku Postgres DATABASE_URL

In order to  config Strapi and to test your database connection, you will need to parse the `DATABASE_URL` value given to you in the `Config Vars`. The URL contains five different variables.  They are:
  - **User**
  - **Password**
  - **Host**
  - **Port**
  - **Database**

  Take this URL as an example:

```
  postgres://ebitxebvixeeqd:dc59b16dedb3a1eef84d4999a0be041bd419c474cd4a0973efc7c9339afb4baf@ec2-50-37-231-192.compute-2.amazonaws.com:5432/d516fp1u21ph7b
```
  - **User**: ebitxebvixeeqd
  - **Password**: dc59b16dedb3a1eef84d4999a0be041bd419c474cd4a0973efc7c9339afb4baf
  - **Host**: ec2-50-37-231-192.compute-2.amazonaws.com
  - **Port**: 5432
  - **Database**: d516fp1u21ph7b

Below you can use this example to help you to parse your URL if your tool fails to parse your URL for you automatically. 

::: windows
**WINDOWS 10**
::: 

::: mac
**MAC O/S 10.14 MOJAVE**

The PostgreSQL database connection can be tested using a tool called [Postico](https://eggerapps.at/postico/). Installation and basic usage documentation can be found [here](https://eggerapps.at/postico/docs/v1.5.6/). After installation it do the following steps:

- From your Heroku `Config Vars`, copy to your clipboard the `postgres://` link next to `DATABASE_URL`.
- Open **Postico**
- Click on `New Favorite`
- If you have the database URL in your copy clipboard, **Postico** should automatically parse the different parts for you.
- However, if it didn't you can follow the [instructions here to parse the URL manually](#manually-parsing-the-heroku-postgres-database-url).
- Click connect. You may get a warning. You can safely ignore this and click `continue`.
- If you got a `Database Schema`, then you have successfully tested and connected to your database. 

You are now ready to configure your local Strapi project to connect to this PostgreSQL database.

:::

::: ubuntu
**UBUNTU 18.04**

:::

6.  You next step is to configure your local Strapi project to connect to this PostgreSQL database. You will need to use your code editor to edit a file called `database.json` and then we will test the database connection through Strapi by running Strapi in Production mode locally.

- 




## AWS

Coming soon.

## Digital Ocean

Coming soon.

## Azure

Coming soon.

## Docker

::: tip
You can also deploy using [Docker](https://hub.docker.com/r/strapi/strapi)
:::

The method below describes regular deployment using the built-in mechanisms.
