# Install Strapi

By following this tutorial, we will get Strapi installed globally onto your system. From here you will be able to follow additional guides which will walk you through installing and connecting a database, creating your first user and content types and deploying your application.

::: warning NOTE

You need to have ***Node.js and npm*** installed on your system prior to following these steps. If you do not have Node.js and npm installed or are not sure, please visit our [Installation Requirements](/3.x.x/getting-started/install-requirements.html).
:::

## Install Strapi globally

```bash
npm install strapi@alpha -g
```

Strapi is now installed globally on your computer. Type `strapi -h` in your command line to access available Strapi commands.

```bash
strapi -h

## You will get the following available commands
Usage: strapi [options] [command]

Options:
  -v, --version                                  output the version number
  -h, --help                                     output usage information

Commands:
  version                                        output your version of Strapi
  console                                        open the Strapi framework console
  new [options]                                  create a new application
  start [appPath]                                start your Strapi application
  generate:api [options] <id> [attributes...]    generate a basic API
  generate:controller [options] <id>             generate a controller for an API
  generate:model [options] <id> [attributes...]  generate a model for an API
  generate:policy [options] <id>                 generate a policy for an API
  generate:service [options] <id>                generate a service for an API
  generate:plugin [options] <id>                 generate a basic plugin
  install [options] <plugin>                     install a Strapi plugin
  uninstall <plugin>                             uninstall a Strapi plugin
  help                                           output the help
  *
```

## Verify Strapi installation 

```bash
strapi -v
```

If you get a version number, like `3.0.0-alpha.x.x`, then Strapi has been properly installed.

You may now proceed with a follow-up tutorial to install a database or proceed to the [Quick Start Guide](/3.x.x/getting-started/quick-start.html).



