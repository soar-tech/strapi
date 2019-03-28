# Deploying Strapi to Heroku

This tutorial is a detailed step-by-step instruction for deploying a Strapi headless CMS app to [Heroku](https://www.heroku.com/). Our app will use Strapi as the headless CMS and Heroku to act as a hosting server for our Strapi project. There are multiple databases that work well with Strapi and Heroku. Below we have instructions for using each.  By the end of this tutorial, you will have a live Strapi App on Heroku with the API Endpoints exposed for a Content Type. 

## Minimum Requirements

You should have first successfully completed the following steps:

1. Installed [Node.js and NPM](https://nodejs.org/en/), these are the basic [installation requirements for Strapi](/3.x.x/getting-started/install-requirements.html#basic-installation-requirements). 
2. In the event you do not have Git installed, please [download and install Git](https://git-scm.com/downloads) for your operating system. You can learn more about Git [here](https://guides.github.com/introduction/git-handbook/).
3. Have [Strapi installed globally](/3.x.x/step-by-step-tutorials/install-strapi-globally.html#install-strapi-globally).

---

**Table of contents:**

1. [Heroku account and app project set-up](#heroku-account-and-app-project-set-up)
2. [Set Up local development environment](#set-up-local-development-environment)
3. 
4. 
5. [Initialize Git and commit project](#initialize-git-and-commit-project)
6. 
7. 
8. [Setting Up Heroku with MongoDB](#setting-up-heroku-and-mongodb-atlas)

---

## Heroku account and app project set-up 

We will first create an Heroku account and create a Heroku app. 

1. Sign up and create a [free Heroku Account](https://www.heroku.com/). 
2. Login to your Heroku account and if this your first app, you will see a button that says `Create new app`, otherwise click on the `New`button in the top right (and click `Create New App`), complete the following steps:
  - App name : eg. `demo-strapi-cms` or `demo-strapi-mongo`[Choose a new unique name for your app.  This will be part of the URL. If you don't Heroku will create a unique name for you. Eg. `fjord-crossings-34990`] 
  - Choose a region : `Europe` [Choose the region closest to you.]
  - The next screen presents options for a `Deployment method`. We will use `Heroku Git`. 
3. You will need download and [install the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). Just follow instructions.
4. After you have installed the Heroku CLI on your development environment, verify the installation with `heroku --version`:

```bash 
heroku --version
heroku/7.22.7 darwin-x64 node-v11.10.1 
```

5. Next, you need to login to Heroku:

```bash
heroku login
heroku: Press any key to open up the browser to login or q to exit:
```

6. After you press _any key_, your browser will display a **_Log in to the Heroku CLI_** page with a `Log in` button. Click it, close the browser tab, and return to your command line. You should see something like this:

```bash
Opening browser to https://cli-auth.heroku.com/auth/browser/c1aed8-ce66-41ae-9fbc-5c742359
Logging in... done
Logged in as david@strapi.io
```

You are now ready to continue the installation and set-up your local development environment.

## Set-up local development environment




















A convenient set-up when developing applications with Strapi and Heroku, is to develop Strapi on your local dev environment using a SQLite database. In this way, you avoid unnecessary set-up and configuration steps to develop your application. 

::: warning NOTE
These steps for creating a new project will not work if you are choosing a [MongoDB database](#strapi-and-mongodb). If you would like to use a MongoDB database please go to the section, [Strapi and Mongo on local developement](#strapi-and-mongodb). 
:::



After completing the following steps, your set-up will look like this Local Development Environment:

<img src="../assets/heroku-strapi-tutorial/strapi-database-api-local.png" width="70%" style="display: block; margin: auto;">

You will have Strapi installed on your computer and the relationship looks like this.  Strapi "talks" to a database (SQLite) and, with permissions properly set, your API routes are exposed to your browser at [localhost:1337](http://localhost:1337/).



### 1. Create a new project

Navigate to your `Projects/` directory. Enter the following command to create a Strapi Quick Start project. We will call this project `cms`, and Strapi will automatically create a project folder with the `/cms/` name. 

```bash
strapi new cms --quickstart
```

::: warning NOTE
Using the `--quickstart` flag will install Strapi using a [SQLite](https://www.sqlite.org/index.html) database. You leave off the flag to locally install a different database in your development environment.
:::

This will open your default browser to the Welcome page that creates an admin user.

### 2. Create an admin user

The first user you create is the root user for your project. This user has all privileges and access rights. You will need to fill in the form of the following fields:

   - **Username**, create a username, eg. `paulbocuse`
   - **Password**, create a unique password
   - **Email address**, used for account recovery
   - Check **Receive news**, this is optional, but recommended
   - Click the **Ready to Start** button

You are now ready to proceed to initializing Git and committing your project to Git.  

## Initialize Git and commit project

1. Navigate to your `Project/` directory for this Strapi project and make your commit.

```bash title:Desktop/Projects/cms
cd cms
git init
Initialized empty Git repository in /Projects/cms/.git/
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




## Strapi and PostgreSQL 

At this time, you should have completed the [minimum requirement steps](#minimum-requirements). You should have also completed the [Strapi installation](#_1-create-a-new-project) with a SQLite database for your local development environment.  You should have a working Strapi project you can log into at [Strapi login](http://localhost:1337/admin/plugins/users-permissions/auth/login).



## Strapi and MongoDB

At this time, you should have completed the [minimum requirement steps](#minimum-requirements). After that you should have completed the steps in the [Connect Strapi to MongoDB locally](/3.x.x/step-by-step-tutorials/connect-to-mongoDB-locally.html) tutorial. You should have a working Strapi project you can log into at [Strapi login](http://localhost:1337/admin/plugins/users-permissions/auth/login).

You are now ready to create your free [MongoDB Atlas free 512 MB](https://www.mongodb.com/download-center) account and database. After that, we will return to Heroku and your Strapi CMS project.

### 1. Create a MongoDB Atlas account and set-up a MongoDB cluster

We will create a database that we can use in production and access from Heroku. Which means you will have a development database on your local computer and a production-similar database on MongoDB Atlas. (You do not want to be developing on your project and be connected to your actual live database). 

We will set-up a database on a MongoDB Atlas free 512 MB account, which will be similar to an actual production environment. 

(If you get lost or have questions, please review the official [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/getting-started/).)

1. Sign-up for a [free MongoDB Atlas account](https://www.mongodb.com/cloud/atlas). 
    - Log in to your account.
    - At your dashboard, click `Build a Cluster`, then from the pop-up, `Build my first cluster`.  Note: If you have already created a cluster on this account, you click on `Build a New Cluster`, in the top right.
    - Choose a **Cloud Provider & Region**. We will choose **AWS**, now scroll down and  set the **Region**, notice that some Regions do not have a _free tier_. Choose a region nearest the region you _set-up earlier for Heroku_.       <-----  **TODO: FIX THIS REFERENCE** 
    - Then continue to scroll down and select the **Cluster Tier**. We will select **Shared Sandbax**.
    - Lastly, and at the botto, name your **Cluster Name**, we will use `Strapi-Heroku`
    - Click the green `Create Cluster` button. You will get a message that says, "Your cluster is being created..."

2. After your **Cluster** has been created, go ahead and click on the `Security` tab (next to `Overview`):
    - Click the green `+ ADD NEW USER` button: 
        - Enter a `username` : eg. `paulbocuse` 
        - Enter a `password` : eg. `mySecretPassword` create a unique password for your project
        - Under `User Privileges` ensure **`Read and write to any database`**, is selected. Then click `Add User` to save.

  **NOTE:** This `username` and `password` is needed later when we connect Heroku to MongoDB Atlas.

3. Now that you have added a `user`, we need to whitelist your IP address. Under `Security`, click to `IP Whitelist`. 
    - Click the green `+ ADD IP ADDRESS`
        - Next click `ALLOW ACCESS FROM ANYWHERE`. **Note:** For a real or permanent project you would create a 'Whitelist Entry', for your office IP address and another entry for Heroku.  
        - Click `Confirm`. Then wait until the status turns from `Pending` to `Active`.

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
If you got the above message, you are ready to continue. If not, please consult the [MongoDB Atlas troubleshooting documentation](https://dochub.mongodb.org/core/atlas-connection-troubleshooting).






Now that your MongoDB Atlas database is set-up and working, we need to record five parameters located in your Atlas dashboard and then we will be ready to configure Strapi to work with your new database.

We need these five parameters for the Heroku configuration settings: **Database Username**, **Database Password**, **Database Port**, **Database Host** and **Database Name**.

Let's locate each one and copy them to a notepad or text editor for later. 

1 **Database Name**, this is the _lowercase_ name of the Cluster Name we chose in MongDB Atlas, in this case,

  _strapi-heroku_

2. **Database Username**, this is the username we created earlier, in this case,

  _paulbocuse_

3. **Database Password**, this is the password we created earlier, in this case,

  _mySecretPassword_

Click into your Clusters. Here you will see a Dashboard with different options and usage charts. 

4. **Database Port**, we have nothing to locate for the port.  In fact, in Heroku it will just be _empty_. 

5. **Database Host** - This requires the following steps:

    - From your Dashboard, under `Overview`, Click `CONNECT` and then `Connect Your Application`.
    - Under **Choose your driver version**, select **DRIVER** as `Node.js` and **VERSION** as `2.2.12 or later`
    - You will see something like this (under **Connection String Only**):
      
      _`mongodb://paulbocuse:<password>@strapi-heroku-shard-00-00-o777o.mongodb.net:27017,strapi-heroku-shard-00-01-o606o.mongodb.net:27017,strapi-heroku-shard-00-02-o606o.mongodb.net:27017/test?ssl=true&replicaSet=Strapi-Heroku-shard-0&authSource=admin&retryWrites=true`_

      We are interested in everything **AFTER** the **@** symbol.  So in this case,

      _`strapi-heroku-shard-00-00-o777o.mongodb.net:27017,strapi-heroku-shard-00-01-o606o.mongodb.net:27017,strapi-heroku-shard-00-02-o606o.mongodb.net:27017/test?ssl=true&replicaSet=Strapi-Heroku-shard-0&authSource=admin&retryWrites=true`_

      This is our **Database Host** variable.  

Please keep these five MongoDB Atlas database variables for your account ready and available.  We will need them shortly to











### 2. Configure Strapi to work with a MongoDB Atlas database

We have to configure Strapi to connect all the database requirements that MongoDB Atlas needs.  We will add some option parameters to our `database.json` file found in `/Projects/cms/config/environments/database.json`.

In your code editor, open `/config/environments/production/database.json`.  These are your database connection settings.  We need to add a two `options` settings. 

The `package.json` file, initially looks like this:

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
        "authenticationDatabase": "admin",
        "ssl": true
      }
    }
```

We are now ready to commit our changes. From the root `Projects/cms` folder, use the following commands:  <---- **FIX THIS ALSO GIT INIT**

```bash
git add .
git commit -am "Added environment options to production/database.json"
```

We are now ready to deploy our local Strapi project to our existing Heroku project.


### 3. Deploy Strapi to Heroku

We will now  deploy our existing **Strapi CMS project** to our existing **Heroku project**.   **FIX THIS NEEDS TO FOLLOW HEROKU APP INSTALL**

1. Navigate to the `cms/` project root. Now we will add this local Git repository (our project files) to the existing Heroku app. I named my project `demo-strapi-cms`. You will need your Heroku app name for the next steps:

```bash
heroku git:remote -a demo-strapi-cms     // CHANGE demo-strapi-cms to YOUR APP NAME
```

2. Now we need to push the Strapi files to Heroku and we do this with `git push heroku master` from the command line and you should see something like this:

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

2. Now let`s [log back into Heroku](https://id.heroku.com/login). You should see your app listed in the dashboard. Go ahead and click on it. We will now configure Heroku to access the MongoDB Atlas database you already created.

Go ahead:
- Click on `Settings`, and next to `Config Vars`, click on the button that says, `Reveal Config Vars`.
- You will need to add five values that correspond to you `package.json` file and you **MongoDB Atlas** settings.  The five values are:

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

If you see the Strapi **Welcome.** page for your app, you have correctly set-up, configured and deployed your Strapi project using MongoDB Atlas on Heroku!

You can now create an admin user by click on the `/admin` from the **Welcome page.**







===================================
===================================










##  COPY Strapi and Mongo on Local Development

At this time, if you have completed 1-4 above, you have Strapi and MongoDB installed on your computer and the relationship looks like this.  Strapi "talks" to MongoDB and your API routes are exposed to your browser at [localhost:1337](http://localhost:1337/). 


You will keep this basic installation, here on your local development environment for _development purposes_. Eventually, you will add a front-end framework. These front-end frameworks will interact with Strapi and the browsers. 

![Strapi and MongoDB with a front-end library](../assets/heroku-strapi-tutorial/strapi-mongo-local-frontend.png 'Strapi and Mongo with a Frontend Locally')

## Setting up Heroku and MongoDB Atlas

After this tutorial our Strapi, Heroku and MongoDB Atlas project will look like this:

![Strapi, Heroku and MongoDB Atlas project](../assets/heroku-strapi-tutorial/strapi-atlas-heroku.png 'Strapi, Heroku and MongoDB Atlas project')



### Deploy Strapi to Heroku







---
---






mongodb+srv://paulbocuse:Password123%21@clustercmsstrapiheroku-o606o.mongodb.net/test?retryWrites=true

**Note:** we recommend you to suffix the database's name with your current environment (eg. cms-_development_ or cms-_production_).
        
NODE_ENV=production npm start in command to set the env variable as Heroku 
