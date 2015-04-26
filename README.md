# CS377d_Project1



## TODO: 

add +1 notifications
a little more code splitting

## Installing

In order to add the extension to chrome goto chrome://extensions and unpack this whole directory as an extension
Make sure "Developer Mode" is checked in the upper right corner

## Changing the code

This project uses Node.js, Gulp, and Browserify to deal with building and code bundling. 

First, make sure to run:

```
$ npm install
```

In order to change any javascript you need to run:

```
$ gulp watch
```

This will setup Gulp to watch any changes for files in '/js_src' and rebundle app.js, which is the javascript file actually deployed to the scene.

## Reloading the Extension

Every time you change the codebase, make sure to reload the extension. You can do this by reloading the chrome://extensions page or downloading the Chrome App & Extension Developer tool and reloading with that. I recommend the latter.


