# Quick Start Heroku PostgreSQL Guide

#### Heroku Postgres

Here are the basic steps to deploy an Strapi app to Heroku using PostgreSQL:

1. Log in to Heroku and create a new app.  (This should be already done following [these instructions](#heroku-account-and-app-project-set-up)). 
2. Create a local development Strapi Project.  The [Quick Start guide](/3.x.x/getting-started/quick-start.html) shows exactly how to accomplish this. From your `Projects` folder:

```bash
strapi new cms-strapi-postgres --quickstart
```
3. Commit and push Strapi to Heroku ([You must be logged in to Heroku](/3.x.x/guides/deployment.html#set-up-your-local-development-environment)):

```bash
heroku login
cd cms-strapi-postgres
git init
git add .
git commit -am "Initial Commit" 
```

Next, you will need to [initialize the Heroku Git repository](#commit-and-push-strapi-to-heroku).  
```bash
heroku git:remote -a cms-strapi-postgres     // ADD YOUR OWN APP NAME
git push heroku master
```

4. Next we need to install a Heroku plugin for using Postgres. 

```bash
heroku addons:create heroku-postgresql:hobby-dev
```

5. The next steps are to test the database connection using the appropriate tool for your operating system. Before you can test the database connection, you will need to note down the `config vars`. From within your `Heroku Dashboard`:
 - Click to the `Settings Page`
 - In the `Config Vars` section, click on `Reveal Config Vars`.
 - Note down the `Config Vars`. Next to `DATABASE URL`, you should see a link that starts with, `postgres://`, copy this. 
   
Below you will find instructions on using the appropriate tool for your operating system to test your database connection using the link you noted above.

#### Manually Parsing the Heroku Postgres DATABASE_URL

In order to  config Strapi and to test your database connection, you will need to parse the `DATABASE_URL` value given to you in the `Config Vars`. The URL contains five different variables.  

  Take this URL as an example:

```
  postgres://ebitxebvixeeqd:dc59b16dedb3a1eef84d4999a0be041bd419c474cd4a0973efc7c9339afb4baf@ec2-50-37-231-192.compute-2.amazonaws.com:5432/d516fp1u21ph7b
```
  - **User**: ebitxebvixeeqd
  - **Password**: dc59b16dedb3a1eef84d4999a0be041bd419c474cd4a0973efc7c9339afb4baf
  - **Host**: ec2-50-37-231-192.compute-2.amazonaws.com
  - **Port**: 5432
  - **Database**: d516fp1u21ph7b

Below you can use the above example to help you to parse your URL if your tool fails to parse your URL for you automatically. 

::: windows
**WINDOWS 10**
Please test your database connection using a tool like [HeidiSQL](https://www.heidisql.com/download.php). You can find detailed instructions[here](#).
::: 

::: mac
**MAC O/S 10.14 MOJAVE**

Please test your database connection using a tool like [Postico](https://eggerapps.at/postico/). You can find detailed instructions[here](/3.x.x/guides/deployment.html#postgresql).

:::

::: ubuntu
**UBUNTU 18.04**

Please test your database connection using a tool like [DBeaver](https://dbeaver.io/). You can find detailed instructions[here](#).

:::

6.  You next step is to configure your local Strapi project to connect to this PostgreSQL database. 

Go ahead and open `database.json` for your `production variables`.  From within your project folder root, in this case, `cms-strapi-postgres`, the path: `/config/environments/production/database.json`.

Next you will need to copy your actual production config vars to this file. Using the URL [above example](/3.x.x/guides/deployment.html#manually-parsing-the-heroku-postgres-database-url) and changing the `"client":` to `"postgres"`:

```bash
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
        "password": "${process.env.DATABASE_PASSWORD || 'dc59b16dedb3a1eef84d4999a0be041bd419c474cd4a0973efc7c9339afb4baf'}"
      },
      "options": {}
    }
  }
}
``` 

You will need to edit the `"timeout":` setting in a file called `hook.json`. From within your project folder root, in this case, `cms-strapi-postgres`, the path: `/config/hook.json`.


You are going to change the `"timeout":` setting from `3000` to `40000`.  The reason you are increasing the timeout on this function is because Heroku will put your server in a `sleep-mode`, if you are on the **Free Plan**, whenever there has not been traffic for 30 minutes.  

```bash
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
Lastly, we need to install a package called [pg](https://www.npmjs.com/package/pg). Heroku needs this dependency for Heroku Postgress to work with Strapi.  From your Project root:

```bash
npm install pg --save
```

7. Commit and push changes to Heroku. 

```bash
cd cms-strapi-postgres 
git add .
git commit -am "Updated database.json file to add database config vars. Updated hooks.json to increase timeout. Added NPM package pg."
git push heroku master
```

After Heroku has finished installing and updating all the packages for your Heroku app, you will see your app working.
