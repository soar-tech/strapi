# Connect Strapi to MongoDB locally

This tutorial is a detailed step-by-step instruction on connecting and using a [community version MongoDB database](https://www.mongodb.com/) with your [Strapi headless CMS](https://strapi.io/). Please complete the [Strapi installation instructions](/3.x.x/step-by-step-tutorials/install-strapi-globally.html#install-strapi-globally) prior to continuing to install **MongoDB**.

Unlike other databases, if you would like to use MongoDB in production, you must also use a MongoDB installation in your development environment. 

Next, we will install MongoDB and then create a new local **Strapi Project**. 

## Install MongoDB on your development environment

For the purposes of this tutorial, we will review the installation steps for MongoDB on a Windows 10, Mac O/S (Mojave) and Linux Ubuntu 18.04. (You may always check the official [MongoDB documentation](https://docs.mongodb.com/manual/installation/#tutorial-installation), should you have a different environment or if you have any additional questions.)

::: windows
**WINDOWS 10**

### Install MongoDB on Windows 10

Follow these steps to [install MongoDB onto your Windows 10](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) environment (Note: Windows Sub-System for Linux (WSL) is unsupported by MongoDB):

1. Download the MongoDB Community Edition for Windows [here](https://www.mongodb.com/download-center/community?jmp=docs). You will need to ensure the following is showing on this page:
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

5. Click `Install`. And let MongoDB finish installing. When it is complete, click `Finish`.

6. Verify and start `mongod` background service.  Open a new command line window and navigate to the following directory and then execute the `mongod` command:

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

You have now installed MongoDB onto your development environment. You are now ready to set-up and configure Strapi to use MongoDB locally.

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

You have now installed MongoDB onto your development environment. You are now ready to set-up and configure Strapi to use MongoDB locally.

:::

::: ubuntu
**UBUNTU 18.04**

### Install MongoDB on Ubuntu

Follow these steps to [install MongoDB onto your Ubuntu](https://docs.mongodb.com/manual/administration/install-on-linux/) environment:

1. From your terminal, you will need to import a public key to ensure your MongoDB is authentic (You can verify the GPG key [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/).): 

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
```

2. Ubuntu requires the creation of a list file for MongoDB. It is found here `/etc/apt/sources.list.d/mongodb-org-4.0.list`. Each Ubuntu major version (14.04, 16.04, 18.04) has a different list.  The following command is for **18.04**.  Other versions of Ubuntu require a different package found [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/).

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

You have now installed MongoDB onto your development environment. You are now ready to set-up and configure Strapi to use MongoDB locally.

:::

## Install Strapi with MongoDB

### Create a new project

Path: `~/Desktop/Projects/ $`

```bash
strapi new cms
```

The command will automatically create a Strapi project `cms` folder within your parent `Projects/` directory. You can replace the `/cms` project name with any name you want.

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

Next, you will be asked to create a new `Database name`. Note: MongoDB must be running in the background (see above).

If you leave this field empty, Strapi will use the name of the folder, in this case `cms`. If you have an existing MongoDB database already created, enter it here or enter a different name as you choose.  We will accept the `default` name. 

```bash
? Choose your installation type Custom (manual settings)
? Choose your main database: MongoDB
? Database name: (cms) 

```

Press `enter`.



Select the remaining default options for installing Strapi with MongoDB - just press `enter`.  It will look something like this including install:

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

---

### Start Strapi and create an admin user

In this section we will start Strapi and create the root (admin) user. 

```bash
cd cms
strapi start

```

You should see something like this, and then it will open up your web browser.

```bash
[2019-03-25T17:29:17.461Z] info Time: Mon Mar 25 2019 18:29:17 GMT+0100 (Central European Standard Time)
[2019-03-25T17:29:17.461Z] info Launched in: 2323 ms
[2019-03-25T17:29:17.461Z] info Environment: development
[2019-03-25T17:29:17.462Z] info Process PID: 8680
[2019-03-25T17:29:17.462Z] info Version: 3.0.0-alpha.23.1 (node v10.15.1)
[2019-03-25T17:29:17.462Z] info To shut down your server, press <CTRL> + C at any time

[2019-03-25T17:29:17.462Z] info ☄️  Admin panel: http://localhost:1337/admin
[2019-03-25T17:29:17.462Z] info ⚡️ Server: http://localhost:1337

[2019-03-25T17:29:17.486Z] debug HEAD index.html (16 ms)
[2019-03-25T17:29:17.487Z] info ⏳ Opening the admin panel...
```

---

![Example completed Welcome Screen with Admin User information](../assets/quick-start-detailed/welcome-screen-entered-information.png 'Example completed Welcome Screen with Admin User information')

The first user you create is the root user for your project. This user has all privileges and access rights. You will need to complete the following fields:

1. **Username**, create a username for login access to your project, eg. `paulbocuse`
2. **Password**, create a unique password for your project
3. **Email address**, this will be used for recovery
4. Check **Receive news**, this is optional but recommended
5. Click the **Ready to Start** button



---

After your admin user is registered, you will see the Strapi admin panel:

![Strapi Admin Panel](../assets/quick-start-detailed/AfterRegistrationScreenAdminPanel.png 'Strapi Admin Panel')


If you see the above screen, you have successfully installed Strapi with MongoDB.

---

You may now proceed with a follow-up tutorial.