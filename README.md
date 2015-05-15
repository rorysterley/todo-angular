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
## Contributors

[Rory Sterley](//github.com/rorysterley)<br>


<br>
## License
[MIT](LICENSE)
