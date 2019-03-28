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

These instructions are for deploying a Strapi app to [Heroku](https://www.heroku.com/). Our app will use Strapi as the headless CMS and Heroku to act as a hosting server for our Strapi project. There are multiple databases that work well with Strapi and Heroku. Below we have instructions for connecting and using them.  

### Heroku account and app project set-up 

We will first create an Heroku account and create a Heroku app. 

1. Sign up and create a [free Heroku Account](https://www.heroku.com/). 
2. Login to your Heroku account and if this your first app, you will see a button that says `Create new app`, otherwise click on the `New` button in the top right (and click `Create New App`), complete the following steps:
  - App name : eg. `demo-strapi-cms` or `demo-strapi-mongo`[Choose a new unique name for your app.  This will be part of the URL. If you don't Heroku will create a unique name for you. Eg. `fjord-crossings-34990`] 
  - Choose a region : `Europe` [Choose the region closest to you.]
  - The next screen presents options for a `Deployment method`. We will use `Heroku Git`. 

  You are now ready to continue the installation and set-up your local development environment.

### Set-up local development environment

1. Follow the instructions to download and [install the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). 
2. After you have installed the Heroku CLI on your development environment, verify the installation with `heroku --version`:

```bash 
heroku --version
heroku/7.22.7 darwin-x64 node-v11.10.1 
```

3. Next, you need to login to Heroku:

```bash
heroku login
heroku: Press any key to open up the browser to login or q to exit:
```

4. After you press _any key_, your browser will display a **_Log in to the Heroku CLI_** page with a `Log in` button. Click it, close the browser tab, and return to your command line. You should see something like this:

```bash
Opening browser to https://cli-auth.heroku.com/auth/browser/c1aed8-ce66-41ae-9fbc-5c742359
Logging in... done
Logged in as david@strapi.io
```

You should have Git installed locally on your development environment, please [download and install Git](https://git-scm.com/downloads) for your operating system. You can learn more about Git [here](https://guides.github.com/introduction/git-handbook/). You need Git installed prior to continuing on to the deployment section. 

Your local development environment is now set-up and configured to work with Heroku.

### Commit and push Strapi to Heroku

1. Navigate to your `Projects/` directory and into your `cms` project folder. Follow these commands to make your initial commit of your project.

```bash title:Desktop/Projects/cms
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
We will not push our Strapi project to Heroku.

1. Navigate to the `cms/` project root. Now we will add this local Git repository (our project files) to the existing Heroku app. I named my project `demo-strapi-cms` in Heroku. You will need your Heroku app name for the next steps:

```bash
heroku git:remote -a demo-strapi-cms     // ADD YOUR OWN APP NAME
```

2. Now we need to upload the Strapi files to Heroku and we do this by git pushing the files to the server. Enter `git push heroku master` in the command line and you should see something like this:

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

In this section we will be configuring Heroku with a [free MongoDB Atlas account](https://www.mongodb.com/cloud/atlas). Prior to this section, you should have [created a local Strapi project using MongoDB](http://localhost:8080/documentation/3.x.x/guides/database.html#install-strapi-with-mongodb) and then [uploaded it to Heroku](/3.x.x/guides/deployment.html#commit-and-push-strapi-to-heroku). You have already [created and configured a MongoDB Atlas Cluster](/3.x.x/guides/database.html#install-on-atlas-mongodb-atlas).


Now let`s [log into Heroku](https://id.heroku.com/login). You should see your app listed in the dashboard. Go ahead and click on it. We will now configure Heroku to access the MongoDB Atlas database you already created.

Go ahead:
- Click on `Settings`, and next to `Config Vars`, click on the button that says, `Reveal Config Vars`.
- You will need to add five values that correspond to you `package.json` file and you **MongoDB Atlas** settings.  These five values are: `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DATABASE PORT`, and `DATABASE_HOST`.

The five example values from [installing on Atlas: MongoDB Atlas](/3.x.x/guides/database.html#install-on-atlas-mongodb-atlas), are:

|  KEY | VALUE  |  
|---|---|
| DATABASE_NAME | **strapi-heroku**  |   
| DATABASE_USERNAME  | **paulbocuse**  |   
| DATABASE_PASSWORD   | **mySecretPassword**  |   
| DATABASE_PORT  |   |
| DATABASE_HOST  | **strapi-heroku-shard-00-00-o777o.mongodb.net:27017,strapi-heroku-shard-00-01-o606o.mongodb.net:27017,strapi-heroku-shard-00-02-o606o.mongodb.net:27017/test?ssl=true&replicaSet=Strapi-Heroku-shard-0&authSource=admin&retryWrites=true**  |   

**Note:** Please replace these above values with the actual values of your accounts.


3. Open app

You should now be able to see your app in the browser. 
- Click back to `Overview`
- Click the `Open app`

If you see the Strapi **Welcome.** page for your app, you have correctly set-up, configured and deployed your Strapi project using MongoDB Atlas on Heroku. You will now need to set-up your `admin user` as the `MondoDB Atlas` database is brand-new.

You can now continue [Tutorial - Creating an Admin User](/3.x.x/getting-started/quick-start-tutorial.html#_3-create-an-admin-user), if you have any questions on how to proceed.


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
