# Start Strapi and create a first user

If you have successfully installed Strapi on your local development computer, you are ready to to `strapi start` and create your first (admin) user.

You will execute the `strapi start` command in the root folder of your Strapi project.  In this case, the folder is called `cms`. 

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


If you see the above screen, you have successfully created your first user and logged into your Strapi project. You are now ready to create your first Content Type and develop the rest of your project. 
