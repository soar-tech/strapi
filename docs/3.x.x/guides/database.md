# Database

Strapi gives you options in which database you can use. Strapi currently supports the `PostgreSQL`, `MongoDB`, `SQLite`, `MySQL` and 
`MariaDB` databases. The following documentation covers how to install these databases locally (for development purposes) and on various hosted or cloud server solutions (for staging or production purposes).

(Deploying **Strapi** is covered in the [Deployment Guide](/3.x.x/guides/deployment.html).)

**Table of contents:**

1. [SQLite Installation](#sqlite-installation)
    - [Install SQLite locally](#install-sqlite-locally)

2. [MongoDB Installation](#mongodb-installation)
    - [Install MongoDB locally](#install-mongodb-locally)
    - [Install on Atlas: MongoDB Atlas](#install-on-atlas-mongodb-atlas)
    
3. [PostgreSQL Installation](#postgresql-installation)
    - [Install PostgreSQL locally](#install-postgresql-locally)
    - [Install with Heroku Postgres](#install-with-heroku-postgres)
---

## SQLite Installation

SQLite is the default [Quick Start](/3.x.x/getting-started/quick-start.html) database and recommended to quickly deploy an app locally.

### Install SQLite locally

Simply use the `strapi new my-project --quickstart` command.

```bash
strapi new my-project --quickstart
```

This will create a new project and launch your project in the browser. (The [Quick Start Guide](/3.x.x/getting-started/quick-start.html) is a complete step-by-step tutorial.)

## MongoDB Installation

### Install MongoDB locally

In order to use Strapi with [MongoDB](https://www.mongodb.com/) in production, you must have and use MongoDB on your local development environment. These instructions show how to install a Strapi project locally with a MongoDB database.

  - You must have [Strapi installed globally](/3.x.x/getting-started/quick-start-tutorial.html#_1-install-strapi-globally).

### Install MongoDB on your development environment

  ::: warning Note

  If you already have MongoDB locally installed and running on your local development environment, you may simply skip to the [Install Strapi locally with MongoDB](#install-strapi-locally-with-mongodb) section.

  :::

  (You may always check the official [MongoDB documentation](https://docs.mongodb.com/manual/installation/#tutorial-installation), should you have any additional installation questions.)

  Please complete the installation steps appropriate to your operating system.

::: windows
**WINDOWS 10**

### Install MongoDB on Windows 10

Follow these steps to [install MongoDB onto your Windows 10](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) environment (The Windows Sub-System for Linux (WSL) is unsupported by MongoDB):

1. Download the `MongoDB Community Edition` for Windows [here](https://www.mongodb.com/download-center/community?jmp=docs). You need to ensure the following is showing on the download page:
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

3. You may choose _NOT_ to install _MongoDB Compass_, by unchecking `Install MongoDB Compass`, otherwise click `Next`.

4. Click `Install`, and let MongoDB finish installing. When it is complete, click `Finish`.

5. Start the `mongod` background service.  Open a new command line window and navigate to the following directory and then execute the `mongod` command:

```bash
C:\>
C:\> cd Program Files\MongoDB\Server\4.0\bin
C:\Program Files\MongoDB\Server\4.0\bin>mongod
```

6. Open up another new command line window in order to access the `mongo shell`. In the new command line window, navigate to the following directory and then execute the `mongo` command:  

```bash
C:\>
C:\> cd Program Files\MongoDB\Server\4.0\bin
C:\Program Files\MongoDB\Server\4.0\bin>mongo
```

You are now in the mongo shell.  You can exit the shell by typing `CTRL + C` from the shell command line.

You have now installed MongoDB onto your _Windows 10_ development environment. You are now ready to [install Strapi with MongoDB locally](#install-strapi-with-mongodb).

:::

::: mac
**MAC O/S 10.14 MOJAVE**

### Install MongoDB on Mac

Follow these steps to [install MongoDB onto your Mac](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) developer environment:

1. Use `brew` to tap the official MongoDB formula repository and add it to the formula list:

```bash
brew tap mongodb/brew
```

2. Now install MongoDB

```bash
brew install mongodb-community@4.0
```

3. In order to connect and use MongoDB, you first need to get the `mongod` process running and then we can open the `mongo` shell:

```bash
mongod --config /usr/local/etc/mongod.conf
mongo
```
You are now in the mongo shell.  You can exit the shell by typing `CTRL + C` from the shell command line.

You have now installed MongoDB onto your _Mac_ development environment. You are now ready to [install Strapi with MongoDB locally](#install-strapi-with-mongodb).


:::

::: ubuntu
**UBUNTU 18.04**

### Install MongoDB on Ubuntu

Follow these steps to [install MongoDB onto your Ubuntu](https://docs.mongodb.com/manual/administration/install-on-linux/) environment:

1. You need to import a public key to ensure your MongoDB is authentic (You can verify the GPG key [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/).):

```bash

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
```

2. Ubuntu requires the creation of a list file for MongoDB. It is found here `/etc/apt/sources.list.d/mongodb-org-4.0.list`. Each Ubuntu major version (14.04, 16.04, 18.04) has a different list.  The following command is for 18.04.  Other versions of Ubuntu require a different package found [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/).

```bash

echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
```

3. Reload the local package database:

```bash
sudo apt-get update
```

4. Install the stable release MongoDB package

```bash
sudo apt-get install -y mongodb-org
```

5. In order to connect and use MongoDB, you first need to get the `mongod` process running and then open the `mongo` shell:

```bash
sudo service mongod start
mongo

```
You are now in the mongo shell.  You can exit the shell by typing `CTRL + C` from the shell command line.

You have now installed MongoDB onto your _Linux_ development environment. You are now ready to [install Strapi with MongoDB locally](#install-strapi-with-mongodb).

:::

### Install Strapi locally with MongoDB

Follow these steps to create a Strapi project locally using the MongoDB database. 

**Note:** MongoDB must already be running in the background.

1. Create a new Strapi project

  `Path: ./`

```bash
strapi new my-project
```

- Use your `down arrow` key and select `Custom (manual settings)` and press `enter`:

```bash
? Choose your installation type 
  Quickstart (recommended) 
❯ Custom (manual settings) 
```

- Select `MongoDB` and press `enter`:

```bash
? Choose your installation type Custom (manual settings)
? Choose your main database: 
  SQLite 
❯ MongoDB 
  MySQL 
  Postgres 
``` 

- Press `enter` to select the remaining default options. It will look something like this:

```bash

? Choose your installation type Custom (manual settings)
? Choose your main database: MongoDB
? Database name: my-project
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

👌 Your new application my-project is ready at /Users/david/Desktop/Projects/my-project.

⚡️ Change directory:
$ cd my-project

⚡️ Start application:
$ strapi start

```

You have successfully installed Strapi with Mongo on your local development environment. You are now ready to [create your first user](/3.x.x/getting-started/quick-start.html#_3-create-an-admin-user). 

---

### Install on Atlas: MongoDB Atlas

Follow these steps to create a Strapi project locally using the MongoDB database.

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


## PostgreSQL Installation

Strapi can be deployed using [PostgreSQL](https://www.postgresql.org/). Below you will find step-by-step guides for deploying your Strapi project with PostgreSQL. 

(**Note:** Included are instructions to deploy PostgreSQL locally for development purposes, but most development can be done even easier by developing with [SQLite](#-install-sqlite-locally) and setting-up your local development environment using our single [Quick Start](#-install-sqlite-locally) command. The database related changes you can make within Strapi and SQLite will be compatible with your PostgreSQL production deployment.)

### Install PostgreSQL locally

::: warning Note

If you already have PostgreSQL locally installed and running on your local development environment, you may simply skip to the [Install Strapi locally with PostgreSQL](#install-strapi-with-postgresql) section.

:::

For the purposes of these docs, we will review the installation steps for PostgreSQL on a Windows 10, Mac O/S (Mojave) and Linux Ubuntu 18.04. (You may always check the official [PostgreSQL documentation](https://www.postgresql.org/docs/), should you have a different O/S or if you have any additional questions.)

::: windows
**WINDOWS 10**

### Install PostgreSQL on Windows 10

PostgreSQL for Windows is installed with a downloadable executable. When you download and install this package, you also install a GUI called [pgAdmin 4](https://www.pgadmin.org/).  It provides a GUI for administering your PostgreSQL database. Below you will find instructions for accomplishing your tasks from the command line in Windows. If you prefer using the GUI, you may find additional instructions [here](https://www.pgadmin.org/docs/pgadmin4/4.x/).

Follow these steps to install PostgreSQL onto your Windows 10 developer environment:

1. 

::: 


::: mac
**MAC O/S 10.14 MOJAVE**

### Install PostgreSQL on Mac

Follow these steps to [install PostgreSQL onto your Mac](https://wiki.postgresql.org/wiki/Homebrew) developer environment: 

1. Update brew and install PostgreSQL using the `brew` command:

```bash
brew update
brew install postgres
```

2. Start `postgres` in the foreground (Skip this step and go to the next step to configure Postgres to start in the background each time you start your computer.):

```bash
pg_ctl -D /usr/local/var/postgres start
```

**Optional - Configure Postgres to start up automatically**

These steps below will configure your Mac to start Postgres automatically whenever you start-up your computer:

```bash
mkdir -p ~/Library/LaunchAgents

ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents

launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist

```



:::

::: ubuntu
**UBUNTU 18.04**

### Install PostgreSQL on Ubuntu

You can use the `apt` packaging system to install `PostgreSQL` onto your Ubuntu 18.04 development environment.  The steps are below:


1. Update your local package index and install postgres with a recommended package called `-contrib` which adds a set of additional tools and capabalities.

```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

2. PostgreSQL has a concept of `roles`, which is similar to the concept of `groups and users`.  The `roles` replaces `groups and users` in the Linux/Ubuntu environments when using `postgres`. Use the following command to switch to the `postgres` linux user and start using `postgres`:

```bash
sudo -i -u postgres
```

You should now be logged into postgress similar to this `postgres@david:~$`

3. Configure `postgres` to recognize the same user name as used in the general Linux environment:

```bash
createuser --interactive
- Enter name of role to add: david
- Shall the new role be a superuser? (y/n) y
```

Your command prompt should be something like this `postgres@david:~$`.

4. Now switch to the role you just created above, in this case `david`:

```bash
psql david
```

Next, exit from the postgres CLI, using the `\q` command:

```bash
david=# \q
```


You can now [test and troubleshoot postgres](#test-and-troubleshoot-your-postgresql-installation) on your local installation [here](/3.x.x/guides/database.html#test-and-troubleshoot-your-postgresql-installation).  

 **Note:** On Ubuntu installations you can exit out of `psql` by using the `:` + `q` keys. 
 Additionally, `su your-username` returns you from the `postgres` environment to the normal Ubuntu command line environment.


:::


### Test and troubleshoot your PostgreSQL installation

Test your installation:

After completing the steps for your operating system above, you should test your installation with the following steps using your command line:

1. Test with the `psql`, you should get a version number, and login the postgres CLI:

```bash
psql (11.2)
Type "help" for help.

david=#
```

Next, exit from the postgres CLI, using the `\q` command:

```bash
david=# \q
```

2. Create, list and delete a database (these commands are **NOT** run from the postgres CLI - but from command line prompt `$`):

- `createdb` creates a database, eg. `createdb strapi-cms`
- `psql -U postgres -l` lists all databases
- `dropdb` deletes a database , eg. `dropdb strapi-cms `
 
```bash
createdb strapi-cms     
psql -U postgres -l 

List of databases
    Name    | Owner | Encoding |   Collate   |    Ctype    | Access privileges
------------+-------+----------+-------------+-------------+-------------------
 david      | david | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 postgres   | david | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 strapi-cms | david | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
(3 rows)

dropdb strapi-cms 
psql -U postgres -l 

                              List of databases
   Name    | Owner | Encoding |   Collate   |    Ctype    | Access privileges
-----------+-------+----------+-------------+-------------+-------------------
 david     | david | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 postgres  | david | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 (2 rows)
```




**Troubleshooting**

There are a few common installation issues that can arise when you install postgreSQL for the first time. If you have an issue see if it is below:

**a.** At anypoint when trying to create, list or delete a database, you get - `psql: FATAL:  role "postgres" does not exist`, do the following:

```bash
-- psql: FATAL:  role "postgres" does not exist
createuser -s postgres
```
**b.** If you unknowingly installed a newer version of `postgres` on top an older version, you may get errors and bugs. If you are sure you do not need any of the `postgres` related databases, it is often easiest to delete all versions of `postgres` and reinstall cleanly. Remove an existing version of `postgres` and delete all files:

::: windows

You will use the `Windows uninstaller` to remove `PostgreSQL`.

1. Go to `Start` then `Control Panel` and then `Add or Remove Progams`
2. Locate and selecte `PostgreSQL` from yoiur program list.
3. Click `Remove`.

Uninstall the data files manually. 

The default directory for PostgreSQL data files is `C:\Program Files\PostgreSQL\Version#\Data`. Manually delete this directory to remove the files.


:::

::: mac
**MAC O/S 10.14 MOJAVE**

```bash
brew uninstall --force postgresql      
rm -rf /usr/local/var/postgres
```
:::

::: ubuntu
**UBUNTU 18.04**

```bash
rm -rf /usr/local/pgsql
````

:::

You may now [install PostgreSQL normally](#install-postgresql-locally).




### Install Strapi with PostgreSQL


### Install with Heroku Postgres