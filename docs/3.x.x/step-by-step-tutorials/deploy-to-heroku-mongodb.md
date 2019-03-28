# Deploying Strapi with MongoDB to Heroku



======================

This tutorial is a detailed step-by-step instruction on deploying a Strapi headless CMS app to [Heroku](https://www.heroku.com/). Our app will use Strapi as the headless CMS and MongoDB for the database. We will host Strapi on Heroku and the [MongoDB database](https://www.mongodb.com/cloud/atlas) database at [MongoDB Atlas free 512 MB account](https://www.mongodb.com/download-center). At the end, you will be expose the API endpoints for your app.

## Set-up Local Development environment

You should have first successfully completed the following steps:

1. Installed Node.js and NPM, these are the basic [installation requirements for Strapi](/3.x.x/getting-started/install-requirements.html#basic-installation-requirements). 
2. Successfully [installed MongoDB onto your development environment](/3.x.x/step-by-step-tutorials/connect-to-mongoDB.html).
3. In the event you do not have Git installed, please [download and install Git](https://git-scm.com/downloads) versioning for your operating system. You can learn more about Git [here](https://guides.github.com/introduction/git-handbook/).
4. Have [Strapi installed globally](/3.x.x/step-by-step-tutorials/install-strapi-globally.html#install-strapi-globally), finished [installing Strapi with MongoDB](/3.x.x/step-by-step-tutorials/connect-to-mongoDB.html) and have a working Strapi project you can log into at [Strapi login](http://localhost:1337/admin/plugins/users-permissions/auth/login).


## Strapi and Mongo on Local Development

At this time, if you have completed 1-4 above, you have Strapi and MongoDB installed on your computer and the relationship looks like this.  Strapi "talks" to MongoDB and your API routes are exposed to your browser at [localhost:1337](http://localhost:1337/). 

![Strapi and MongoDB locally](../assets/heroku-strapi-tutorial/getting-started-with-heroku.png 'Strapi and MongoDB locally')

<img src="../assets/heroku-strapi-tutorial/getting-started-with-heroku.png" width="70%" style="display: block; margin: auto;">

<img src="../assets/heroku-strapi-tutorial/getting-started-with-heroku.png" width="50%" style="display: block; margin: auto;">

You will keep this basic installation, here on your local development environment for _development purposes_. Eventually, you will add a front-end framework. These front-end frameworks will interact with Strapi and the browsers. 

![Strapi and MongoDB with a front-end library](../assets/heroku-strapi-tutorial/strapi-mongo-local-frontend.png 'Strapi and Mongo with a Frontend Locally')

## Setting up Heroku and MongoDB Atlas

After this tutorial our Strapi, Heroku and MongoDB Atlas project will look like this:

![Strapi, Heroku and MongoDB Atlas project](../assets/heroku-strapi-tutorial/strapi-atlas-heroku.png 'Strapi, Heroku and MongoDB Atlas project')

### Create a Heroku Account and Set-up Heroku app

1. Sign up and create a [free Heroku Account](https://www.heroku.com/). Then complete the following steps to install, configure and prepare Heroku on your development environment. (Note: Before continuing; please have [Git and Node.js installed](/3.x.x/step-by-step-tutorials/deploy-to-heroku.html#set-up-local-development-environment) on your development environment.)
    - Login to your Heroku Dashboard and if this your first app, then you will see a button that says `Create new app`, otherwise click on the `New`button in the top right (and click `Create New App`), complete the following:
        - App name : demo strapi cms[Choose a new unique name for your app.  This will be part of the URL.] 
        - Choose a region : Europe [Choose the region closest to you.]
        - The next screen presents options for a `Deployment method`. In this tutorial, we will use `Heroku Git` but [GitHub & Heroku](https://devcenter.heroku.com/articles/github-integration) is also an option. You will need download to [install the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).
        
After you have installed the Heroku CLI on your development environment, verify the installation from your command line tool:

```bash 
heroku --version
heroku/7.22.7 darwin-x64 node-v11.10.1 
```

Next you need to login to Heroku:

```bash
heroku login
heroku: Press any key to open up the browser to login or q to exit:
```

After you press any key, your browser will display a _Log in to the Heroku CLI_ with a `Log in` button. Click it, close the browser tab, and return to your command line. You should see something like this:

```bash
Opening browser to https://cli-auth.heroku.com/auth/browser/c1aed8-ce66-41ae-9fbc-5c742359
Logging in... done
Logged in as david@strapi.io
```

You are now ready to create your MongoDB Atlas account and database. After that, we will return to Heroku and your Strapi CMS project.

### Create a MongoDB Atlas Account and Set-up database

You will need to create a database that we will use in _Production_. Which means, on your development environment you will have a MongoDB database and a _Production_ or _Live_.  You do not want to be developing on your project and be connected to your actual working database. Therefore we will set-up a database on MongoDB Atlas, which will be similar to an actual production environment. 

(If you get lost or have questions, please review the official [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/getting-started/).)

1. Sign-up for a [free MongoDB Atlas account](https://www.mongodb.com/cloud/atlas). 
    - Log in to your account.
    - At your dashboard, click `Build a Cluster`, then from the pop-up, `Build my first cluster`.  Note: If you have already created a cluster on this account, you click on `Build a New Cluster`, in the top right.
    - Choose a **Cloud Provider & Region**. We will choose **AWS**, and use the Dropdown to set the **Region**, notice that some Regions do not have a _free tier_. Choose a region nearest the region you _set-up earlier for Heroku_. 
    - Then Select the **Cluster Tier**. We will select **Shared Sandbax**.
    - Name your **Cluster Name**, we will use `ClusterCMSStrapiHeroku`
    - Click `Create Cluster`. You will get a message that says, "Your cluster is being created..."

2. After your **Cluster** has been created, go ahead and click on the `Security` tab (next to `Overview`):
    - Click the green `+ ADD NEW USER` button: 
        - Enter a `username` : eg. `paulbocuse` 
        - Enter a `password` : create a unique password for your project
        - Under `User Privileges` ensure **`Read and write to any database`**, is selected. Then click `Add User` to save.

3. Now that you have added a `user`, we need to whitelist your IP address. Under `Security`, click to `IP Whitelist`. 
    - Click the green `+ ADD IP ADDRESS`
        - Next click `ALLOW ACCESS FROM ANYWHERE`. **Note:** For a real or permanent project you would create a 'Whitelist Entry', for your office IP address and another entry for Heroku.  
        - Click `Confirm`. Then Wait until the status turns from `Pending` to `Active`.

4. We should test the **MongoDB** connection from your command line. In this way we will know that your database is ready and available to be accessed by Strapi and Heroku. Click back to the `Overview` tab in your dashboard. 
    - Click `CONNECT` and then `Connect with the Mongo Shell`. **Note:** You should have Mongo Shell installed as above.
    - Click `I have the Mongo Shell installed`, and the dropdown should say `3.6 or later`
    - Click to `Copy` button to copy the command to your clipboard.
    - Paste the command into your command line, and enter your password. (Did you use [special characters](https://docs.atlas.mongodb.com/troubleshoot-connection/#special-characters-in-connection-string-password) in your password?) 
    - You should get messages like this: 

```bash
2019-03-26T17:10:51.389+0100 I NETWORK  [ReplicaSetMonitor-TaskExecutor] Successfully connected to clustercmsstrapiheroku-shard-00-00-o606o.mongodb.net:27017 (1 connections now open to clustercmsstrapiheroku-shard-00-00-o606o.mongodb.net:27017 with a 5 second timeout)
Implicit session: session { "id" : UUID("S0567173-T8cD-R9-Ad4b-P9ba2f8c4-If8") }
MongoDB server version: 4.0.6
Error while trying to show server startup warnings: user is not allowed to do action [getLog] on [admin.]
MongoDB Enterprise ClusterCMSStrapiHeroku-shard-0:PRIMARY>

```
If you got the above message, you are ready to continue. If not, please consult the [MongoDB Atlas troubleshooting documentation](https://dochub.mongodb.org/core/atlas-connection-troubleshooting) or the Strapi Slack group for more help.

Please continue to do the steps necessary to upload Strapi onto Heroku.

### Prepare Strapi for upload to Heroku 

1. Navigate to your Project directory for Strapi and submit your first project commit.

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

2. Open `/config/environments/production/database.json`.  These are your database connection settings.  We need to add a couple `options` settings.  

This is what the file looks like now:

```js
{
  "defaultConnection": "default",
  "connections": {
    "default": {
      "connector": "strapi-hook-mongoose",
      "settings": {
        "client": "mongo",
        "host": "${process.env.DATABASE_HOST || '127.0.0.1'}",
        "port": "${process.env.DATABASE_PORT || 27017}",
        "database": "${process.env.DATABASE_NAME || 'strapi'}",
        "username": "${process.env.DATABASE_USERNAME || ''}",
        "password": "${process.env.DATABASE_PASSWORD || ''}"
      },
      "options": {}
    }
  }
}

```

Change `options`, to include the following.  Then save the file.

```js
      "options": {
        "ssl": "${process.env.DATABASE_SSL || false}",
        "authenticationDatabase": "${process.env.DATABASE_AUTHENTICATION_DATABASE || ''}"
    }
```

3. Commit these latest changes, using the following commands:

```bash
git add .
git commit -am "Added environment options to production/database.json"
```

### Deploy Strapi to Heroku

We will now create a new **Heroku project** from our existing **Strapi CMS project**.

1. Navigate to the `cms/` project root. Now we will add this local Git repository (our project files) to the existing Heroku app. I named my project `demo-strapi-cms`. You will need your Heroku app name for the next steps:

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

### Configure Heroku with MongoDB Atlas

2. Now let`s [log into Heroku](https://id.heroku.com/login). You should see your app listed in the dashboard. Go ahead and click on it. We will now configure Heroku to access the MongoDB Atlas database you already created.





---
---






mongodb+srv://paulbocuse:Password123%21@clustercmsstrapiheroku-o606o.mongodb.net/test?retryWrites=true

**Note:** we recommend you to suffix the database's name with your current environment (eg. cms-_development_ or cms-_production_).
        
NODE_ENV=production npm start in command to set the env variable as Heroku 
