# Database

Strapi gives you options in which database you can use. Strapi currently supports the `PostgreSQL`, `MongoDB`, `SQLite`, `MySQL` and 
`MariaDB` databases. The following documentation covers how to install these databases locally (for development purposes) and on various hosted or cloud server solutions (for staging or production purposes).


**Table of contents:**

1. [SQLite Installation](#sqlite-installation)
    - [Install SQLite locally](#-install-sqlite-locally)

2. [MongoDB Installation](#mongodb-installation)
    - [Install MongoDB locally](#install-mongodb-locally)
    - [Install on Atlas: MongoDB Atlas](#install-on-atlas-mongodb-atlas)

---

## SQLite Installation

SQLite is the default [Quick Start](/3.x.x/getting-started/quick-start.html) database and recommended for developing your Strapi application locally. 

### Install SQLite locally

Installing `SQLite` is done simply with the `strapi new cms --quickstart` command. 

```bash
strapi new cms --quickstart
```

This will create a new project and launch your project in the browser. Please complete the [Quick Start Guide](/3.x.x/getting-started/quick-start.html), for a complete step-by-step tutorial. 

## MongoDB Installation

### Install MongoDB locally

These detailed step-by-step instructions are for connecting and using a [community version MongoDB database](https://www.mongodb.com/) with Strapi. 

Unlike other databases, if you would like to use MongoDB in production with Strapi, you must also use a MongoDB installation in your development environment. 

(If you do not already have Strapi installed globally on your development environment, please follow the instructions under step **#1** of the [Strapi tutorial](/3.x.x/getting-started/quick-start-tutorial.html#_1-install-strapi-globally). You only need to complete this step and then you return to complete these instructions for installing and using Strapi with MongoDB.)

Let's go ahead now and install MongoDB and then create a new local **Strapi project**. 

### Install MongoDB on your development environment

::: warning Note

If you already have MongoDB locally installed and running on your local development environment, you may simply skip to the [Install Strapi with MongoDB](#install-strapi-with-mongodb) section.

:::

For the purposes of these docs, we will review the installation steps for MongoDB on a Windows 10, Mac O/S (Mojave) and Linux Ubuntu 18.04. (You may always check the official [MongoDB documentation](https://docs.mongodb.com/manual/installation/#tutorial-installation), should you have a different O/S or if you have any additional questions.)

::: windows
**WINDOWS 10**

### Install MongoDB on Windows 10

Follow these steps to [install MongoDB onto your Windows 10](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) environment (The Windows Sub-System for Linux (WSL) is unsupported by MongoDB):

1. Download the `MongoDB Community Edition` for Windows [here](https://www.mongodb.com/download-center/community?jmp=docs). You will need to ensure the following is showing on the download page:
    - Select the server you would like to run : `MongoDB Community Server`
    - Version : `4.x.x` 
    - OS : `Windows 64-bit x64`
    - Package : `MSI`

    Now you can click the `Download` button.


2. Run the MongoDB installer by _double-clicking_ the (.msi) file you downloaded, then complete each step of the MongoDB Community Edition installation wizard:
    - Click `Next` from the _Welcome Screen_
    - Accept the _Terms and Conditions_, click `Next`
    - Choose Setup Type : `Complete`
    - Service Configuration : 
        - Check the box `Install MongoDB as a Service` 
        - Select `Run service as Network Service User`
        - The Service name should read : `MongoDB`
        - Continue with the default installation of the `Data` and `Log` directories.
        - Click `Next`

4. You may choose _NOT_ to install _MongoDB Compass_, by unchecking `Install MongoDB Compass`, otherwise click `Next`.

5. Click `Install`, and let MongoDB finish installing. When it is complete, click `Finish`.

6. Let's start the `mongod` background service.  Open a new command line window and navigate to the following directory and then execute the `mongod` command:

```bash
C:\>
C:\> cd Program Files\MongoDB\Server\4.0\bin
C:\Program Files\MongoDB\Server\4.0\bin>mongod
```

7. Open up another new command line window so that you can access the `mongo shell`. In the new command line window, navigate to the following directory and then execute the `mongo` command:  

```bash
C:\>
C:\> cd Program Files\MongoDB\Server\4.0\bin
C:\Program Files\MongoDB\Server\4.0\bin>mongo
```

You are now in the mongo shell.  You can exit the shell by typing `CTRL + C` from the shell command line.

You have now installed MongoDB onto your _Windows 10_ development environment. You are now ready to set-up and [configure Strapi to use MongoDB locally](#install-strapi-with-mongodb).

:::

::: mac
**MAC O/S 10.14 MOJAVE**

### Install MongoDB on Mac

Follow these steps to [install MongoDB onto your Mac](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) developer environment:

1. From your terminal, use `brew` to tap the official MongoDB formula repository and add it to the formula list:

```bash
brew tap mongodb/brew
```

2. From your terminal, now install MongoDB

```bash
brew install mongodb-community@4.0
```

3. In order to connect and use MongoDB, we first need to get the `mongod` process running and then we can open the `mongo` shell. In your terminal:

```bash
mongod --config /usr/local/etc/mongod.conf
mongo
```
You are now in the mongo shell.  You can exit the shell by typing `CTRL + C` from the shell command line.

You have now installed MongoDB onto your _Mac_ development environment. You are now ready to set-up and [configure Strapi to use MongoDB locally](#install-strapi-with-mongodb).


:::

::: ubuntu
**UBUNTU 18.04**

### Install MongoDB on Ubuntu

Follow these steps to [install MongoDB onto your Ubuntu](https://docs.mongodb.com/manual/administration/install-on-linux/) environment:

1. From your terminal, you will need to import a public key to ensure your MongoDB is authentic (You can verify the GPG key [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/).): 

```bash

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
```

2. Ubuntu requires the creation of a list file for MongoDB. It is found here `/etc/apt/sources.list.d/mongodb-org-4.0.list`. Each Ubuntu major version (14.04, 16.04, 18.04) has a different list.  The following command is for 18.04.  Other versions of Ubuntu require a different package found [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/).

```bash

echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
```

3. Reload the local package database from your terminal:

```bash
sudo apt-get update
```

4. Install the stable release MongoDB package

```bash
sudo apt-get install -y mongodb-org
```

5. In order to connect and use MongoDB, we first need to get the mongod process running and then we can open the `mongo` shell. In your terminal:

```bash
sudo service mongod start
mongo

```
You are now in the mongo shell.  You can exit the shell by typing `CTRL + C` from the shell command line.

You have now installed MongoDB onto your _Linux_ development environment. You are now ready to set-up and [configure Strapi to use MongoDB locally](#install-strapi-with-mongodb).


:::

### Install Strapi with MongoDB

### Create a new project

We will use `strapi new cms` in the command line to create a project. The command will automatically create a Strapi `cms` project folder within your parent `Projects/` directory. You can replace the `cms` project name with any name you want.

```bash
strapi new cms
```

You will see something like this:

```bash
🚀 Start creating your Strapi application. It might take a minute, please take a coffee ☕️

? Choose your installation type (Use arrow keys)
❯ Quickstart (recommended) 
  Custom (manual settings) 
```
Use your `down arrow` key and select `Custom (manual settings)` and press `enter`:

```bash
? Choose your installation type 
  Quickstart (recommended) 
❯ Custom (manual settings) 
```

Select `MongoDB` and press `enter`:

```bash
? Choose your installation type Custom (manual settings)
? Choose your main database: 
  SQLite 
❯ MongoDB 
  MySQL 
  Postgres 
``` 

Next, you will be asked to create a new `Database name`. **Note:** MongoDB must already be running in the background.

If you leave this field empty, Strapi will use the name of the folder, in this case `cms`. If you have an existing MongoDB database already created, enter it here or enter a different name as you choose.  We will accept the `cms` name by pressing `enter`. 

```bash
? Choose your installation type Custom (manual settings)
? Choose your main database: MongoDB
? Database name: (cms) 

```

Select the remaining default options for installing Strapi with MongoDB - just press `enter`.  It will look something like this including the installation:

```bash

? Choose your installation type Custom (manual settings)
? Choose your main database: MongoDB
? Database name: cms
? Host: 127.0.0.1
? +srv connection: false
? Port (It will be ignored if you enable +srv): 27017
? Username: 
? Password: 
? Authentication database (Maybe "admin" or blank): 
? Enable SSL connection: false

⏳ Testing database connection...
The app has been connected to the database successfully!

🏗  Application generation:
✔ Copy dashboard
✔ Install plugin settings-manager.
✔ Install plugin content-type-builder.
✔ Install plugin content-manager.
✔ Install plugin users-permissions.
✔ Install plugin email.
✔ Install plugin upload.
✔ Link strapi dependency to the project.

👌 Your new application cms is ready at /Users/david/Desktop/Projects/mongodb-tutorial/cms.

⚡️ Change directory:
$ cd cms

⚡️ Start application:
$ strapi start

```

You have successfully installed Strapi with Mongo on your local development environment. You are now ready to [create your first user](/3.x.x/getting-started/quick-start.html#_3-create-an-admin-user). 

---

### Install on Atlas: MongoDB Atlas

We will create a database that we can use in production and access from an external hosting solution. Which means you will have a development database on your local computer and your live database on MongoDB Atlas.

We will set-up a database on a MongoDB Atlas free 512 MB account, which will be similar to an actual production environment. (If you get lost or have questions, please review the official [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/getting-started/).)

1. Sign-up for a [free MongoDB Atlas account](https://www.mongodb.com/cloud/atlas). 
    - Log in to your account.
    - At your dashboard, click `Build a Cluster`, then from the pop-up, `Build my first cluster`.  Note: If you have already created a cluster on this account, you click on `Build a New Cluster`, in the top right.
    - Choose a **Cloud Provider & Region**. We will choose **AWS**, now scroll down and  set the **Region**, notice that some Regions do not have a _free tier_. Choose a region nearest to your external hosting providers' server location. 
    - Then continue to scroll down and select the **Cluster Tier**. We will select **Shared Sandbax**.
    - Lastly, and at the bottom, name your **Cluster Name**, we will use `strapi-heroku`
    - Click the green `Create Cluster` button. You will get a message that says, "Your cluster is being created..."

2. After your **Cluster** has been created, go ahead and click on the `Security` tab (next to `Overview`):
    - Click the green `+ ADD NEW USER` button: 
        - Enter a `username` : eg. `paulbocuse` 
        - Enter a `password` : eg. `mySecretPassword` 
        - Under `User Privileges` ensure **`Read and write to any database`** is selected. Then click `Add User` to save.

  **NOTE:** This `username` and `password` is needed later when we connect from your external hosting server to MongoDB Atlas.

3. Now that you have added a `user`, we need to whitelist your IP address. Under `Security`, click to `IP Whitelist`. 
    - Click the green `+ ADD IP ADDRESS`
        - Next click `ALLOW ACCESS FROM ANYWHERE`. **Note:** For a real or permanent project you would create a `Whitelist Entry` for your external hosting server and perhaps also create a 'Whitelist Entry' for your office IP address.  
        - Click `Confirm`. Then wait until the status turns from `Pending` to `Active`.

4. We should test the **MongoDB** connection from your command line. In this way we will know that your database is ready and available for access. 

    Click back to the `Overview` tab in your dashboard. 
    - Click `CONNECT` and then `Connect with the Mongo Shell`. 
    - Click `I have the Mongo Shell installed`, and the dropdown should say `3.6 or later`
    - Click to `Copy` button to copy the command to your clipboard.
    - Paste the command into your command line and press `enter`, then enter your password. (Did you use [special characters](https://docs.atlas.mongodb.com/troubleshoot-connection/#special-characters-in-connection-string-password) in your password?) 
    - After entering your password, you should get messages like this: 

```bash
2019-03-26T17:10:51.389+0100 I NETWORK  [ReplicaSetMonitor-TaskExecutor] Successfully connected to clustercmsstrapiheroku-shard-00-00-o606o.mongodb.net:27017 (1 connections now open to clustercmsstrapiheroku-shard-00-00-o606o.mongodb.net:27017 with a 5 second timeout)
Implicit session: session { "id" : UUID("S0567173-T8cD-R9-Ad4b-P9ba2f8c4-If8") }
MongoDB server version: 4.0.6
Error while trying to show server startup warnings: user is not allowed to do action [getLog] on [admin.]
MongoDB Enterprise ClusterCMSStrapiHeroku-shard-0:PRIMARY>

```
(If you did not get the above messages, please see the [MongoDB Atlas troubleshooting documentation](https://dochub.mongodb.org/core/atlas-connection-troubleshooting).)

5. Now that your MongoDB Atlas database is set-up and working, we need to record five parameters located in your Atlas dashboard. You will need these five parameters to configure your external hosting environment to work with MongoDB Atlas.

    These are the five parameters needed in an external hosting configuration setting: **Database Username**, **Database Password**, **Database Port**, **Database Host** and **Database Name**.

    Let's locate each one and copy them to a notepad or text editor for use later. 

    1. **Database Name**, this is the _lowercase_ name of the Cluster Name we chose in MongDB Atlas, in this case,

    _strapi-heroku_

    2. **Database Username**, this is the username we created earlier, in this case,

    _paulbocuse_

    3. **Database Password**, this is the password we created earlier, in this case,

    _mySecretPassword_

    4. **Database Port**, we have nothing to locate for the port.  In fact, it will just be left _empty_. 

    5. **Database Host** - This requires the following steps:

        - From your Dashboard, under `Overview`, Click `CONNECT` and then `Connect Your Application`.
        - Under **Choose your driver version**, select **DRIVER** as `Node.js` and **VERSION** as `2.2.12 or later`
        - You will see something like this (under **Connection String Only**):
      
        _`mongodb://paulbocuse:<password>@strapi-heroku-shard-00-00-o777o.mongodb.net:27017,strapi-heroku-shard-00-01-o606o.mongodb.net:27017,strapi-heroku-shard-00-02-o606o.mongodb.net:27017/test?ssl=true&replicaSet=Strapi-Heroku-shard-0&authSource=admin&retryWrites=true`_

        We are interested in everything **AFTER** the **@** symbol.  So in this case,

        _`strapi-heroku-shard-00-00-o777o.mongodb.net:27017,strapi-heroku-shard-00-01-o606o.mongodb.net:27017,strapi-heroku-shard-00-02-o606o.mongodb.net:27017/test?ssl=true&replicaSet=Strapi-Heroku-shard-0&authSource=admin&retryWrites=true`_

        This is our **Database Host** variable.  

    Please keep these five MongoDB Atlas database variables for your account ready and available.  You will need them to connect from your external hosting servers.

6. Configure Strapi to work with a MongoDB Atlas database

    We have to configure Strapi to connect with the connection requirements that MongoDB Atlas needs.  We will add some option parameters to our `database.json` file found in `/Projects/cms/config/environments/database.json`.

    In your code editor, open `/config/environments/production/database.json`.  These are your database connection settings under a `production` setting.  We need to add a two `options` settings. 

    The `package.json` file initially, looks like this:

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

You need to change `options`, to include the following.  Then save the file.

```js
      "options": {
        "authenticationDatabase": "admin",
        "ssl": true
      }
    }
```

You are now ready to commit your changes. From the root `Projects/cms` folder, use the following commands:

```bash
git add .
git commit -am "Added environment options to production/database.json"
```

You are now ready to deploy your Strapi project to an external hosting provider and use MongoDB Atlas as your database server.  
