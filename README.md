# Node REST API with AngularJs App for Reddit

This app provide a simple Node Rest API with an AngularJs App. With This App, you can get Posts et Comments From Reddit.com.

## Running project

You need to have installed Node.js 

### Install dependencies 

To install dependencies enter project folder and run following command:
```
cd api_node/node_modules/
npm install
```

### Run server

To run server execute:
```
node server.js 
```

### Make Requests

Getting posts with term
```
http http://localhost:8765/api/posts/:term/:limit/:offset
```

Getting posts with term
```
http http://localhost:8765/api/posts/:term/:limit/:offset
```

## Modules used

Some of non standard modules used:
* [express](https://www.npmjs.com/package/mongoose)
* [Request](https://www.npmjs.com/package/request)
* [body-parser](https://www.npmjs.com/package/body-parser)

## Tools used

[toaster] (https://github.com/jirikavi/AngularJS-Toaster) - Notification Helper
[bootstrap] (http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js)
[ngResource] (http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-resource.min.js)
[ngRoute] (http://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular-route.min.js)

## Author

This example was created by Sofiane BELGHALI

## License

[MIT](https://github.com/ealeksandrov/NodeAPI/blob/master/LICENSE)
