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

Follow these steps to create a local development Strapi project using a local MongoDB database but configured to use a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free 512 MB account in production. (Please review the official [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/getting-started/) should you have any installation questions.)

  - You must have already [installed Strapi localled with MongoDB](http://localhost:8080/documentation/3.x.x/guides/database.html#install-strapi-locally-with-mongodb).

1. Sign-up for a [free MongoDB Atlas account](https://www.mongodb.com/cloud/atlas) (or simply _log in to an existing account_).
2. Log in to your account.
    - At your dashboard, click `Build a Cluster`, then from the pop-up, `Build my first cluster`.  (**Note:** If you have already created a Project and cluster on this account, you need to `Create a new Project`, and then do these steps.)
    - Choose **AWS** as your **Cloud Provider & Region**. Now scroll down and select a **Region** nearest to your external hosting providers' server location. (Notice that some **Regions** do not have a _free tier_.)
    - Then continue to scroll down and select the **Cluster Tier**. Then select **Shared Sandbax**, _Tier_ `MO`.
    - Scroll down to **Cluster Name** and name your cluster.
    - Click the green `Create Cluster` button. You will get a message that says, "Your cluster is being created..."

  **NOTE:** This `cluster name` is needed later when you connect from your external hosting server to MongoDB Atlas.

3. After your **Cluster** has been created, click on the `Security` tab (next to `Overview`):
    - Click the green `+ ADD NEW USER` button: 
        - Enter a `username`.
        - Enter a `password`.
        - Under `User Privileges` ensure **`Read and write to any database`** is selected. Then click `Add User` to save.

  **NOTE:** This `username` and `password` is needed later when you connect from your external hosting server to MongoDB Atlas.
  
4. You need to whitelist your IP address. Under `Security`, click to `IP Whitelist`.

    - Click the green `+ ADD IP ADDRESS`
        - Next click `ALLOW ACCESS FROM ANYWHERE`. **Note:** For a real or permanent project you would create a `Whitelist Entry` for your external hosting server and perhaps also create a 'Whitelist Entry' for your office IP address.  
        - Click `Confirm`. Then wait until the status turns from `Pending` to `Active`.

5. You need to record five parameters located in your Atlas dashboard. You will need these five parameters to configure your external hosting environment to work with MongoDB Atlas.

    These are the five parameters needed in an external hosting configuration setting: **Database Username**, **Database Password**, **Database Port**, **Database Host** and **Database Name**.

    Let's locate each one and copy them to a notepad or text editor for use later. 

    1. **Database Name**, this is the _lowercase_ name of the `cluster name` you chose in MongDB Atlas

    2. **Database Username**, this is the `username` you created earlier

    3. **Database Password**, this is the `password` you created earlier

    4. **Database Port**, we have nothing to locate for the port.  In fact, it will just be left _empty_. 

    5. **Database Host** - This requires the following steps:

        - From your Dashboard, under `Overview`, Click `CONNECT` and then `Connect Your Application`.
        - Under **Choose your driver version**, select **DRIVER** as `Node.js` and **VERSION** as `2.2.12 or later`
        - You will see something like this (under **Connection String Only**):
      
        _`mongodb://paulbocuse:<password>@strapi-heroku-shard-00-00-o777o.mongodb.net:27017,strapi-heroku-shard-00-01-o606o.mongodb.net:27017,strapi-heroku-shard-00-02-o606o.mongodb.net:27017/test?ssl=true&replicaSet=Strapi-Heroku-shard-0&authSource=admin&retryWrites=true`_

        You are interested in everything **AFTER** the **@** symbol.  So in this case,

        _`strapi-heroku-shard-00-00-o777o.mongodb.net:27017,strapi-heroku-shard-00-01-o606o.mongodb.net:27017,strapi-heroku-shard-00-02-o606o.mongodb.net:27017/test?ssl=true&replicaSet=Strapi-Heroku-shard-0&authSource=admin&retryWrites=true`_

        This is your **Database Host** variable.  

    Please keep these five MongoDB Atlas database variables for your account ready and available.  

6. Configure your local Strapi database.json file
  
  Open `database.json`.

  `Path: ./config/environments/production/database.json`.

Update `options`, to include the following. 

```json
      "options": {
        "authenticationDatabase": "admin",
        "ssl": true
      }
    }
```
Like this:

```json
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
      "options": {
        "authenticationDatabase": "admin",
        "ssl": true
      }
    }
  }
}

```

Commit your changes. 

  `Path: ./my-project/`

  ```bash
  git add .
  git commit -am "Added environment options to production/database.json"
  ```

  You are now ready to deploy your Strapi project to an external hosting provider and use MongoDB Atlas as your database server.  
