# Todo (Angular)
A responsive single page web app using the MEAN stack to create a user friendly todo application.

<br>
## Initial Setup

> Clone this repo:
```
$ git clone git@github.com:rorysterley/todo-angular.git
```

<br>
> Change directory to project root:
```
$ cd todo-angular
```

<br>
> Install dependancies:
```
$ npm install
```

<br>
> Install grunt-cli globally (if you don't have it)
```
$ npm install -g grunt-cli
```

<br>
> Create a local data-base folder:
```
$ mkdir db
```

<br>
> Start MongoDB:  (if you don't have MongoDB installed see their [docs](http://docs.mongodb.org/manual/))
```
$ mongod --dbpath=./db --smallfiles
```
###### Note: This process should be given its own terminal tab.

<br>
> Start the server:
```
$ node server
```
###### Note: It can be helpful to give this process its own terminal tab.


<br>
## Grunt Commands

> Run tests:
```
$ grunt test:server
$ grunt test:client
```

<br>
> Build client side code:
```
$ grunt build
```

<br>
> Build client side code for production:
```
$ grunt production
```

<br>
## Deployment Process (Heroku)

### Heroku Setup:
Assuming you already have a [Heroku](//www.heroku.com) account:<br>

Create a new heroku app. [(docs)](//devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)<br>

Add MongoLab to your app. Search "MongoLab" in the Resources tab of your app.<br>

Add environmental variable. In the Settings tab click "Reveal Config Vars"
then click "Edit".<br>
Add a new variable with key: PRODUCTION and value: true<br>
Click "save".<br>

Add this Heroku app to your git remotes:
```
$ git remote add heroku git@heroku.com:{heroku-app-name}.git
```
###### Note: Replace {heroku-app-name} with your heroku app name e.g. git@heroku.com:myapp.git

### Deployment:

0. Checkout a production branch: (example follows)
```
$ git checkout -b production-v1
```

0. Lock-down dependencies:
```
$ npm shrinkwrap
```

0. Build production code:
```
$ grunt production
```

0. Commit production code: (example follows)
```
$ git add .
$ git commit -m 'Production v1'
```

0. Deploy:
```
$ git push heroku HEAD:master
```

0. Return to master branch:
```
$ git checkout master
```

<br>
## Contributors

[Rory Sterley](//github.com/rorysterley)<br>


<br>
## License
[MIT](LICENSE)
