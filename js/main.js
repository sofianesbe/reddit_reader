var app = angular.module('RDApp', [
  'ngRoute',
  'ngResource',
  'toaster'
]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

app.constant('urls', {
  API: 'http://localhost:8765/api/',
});

app.controller('PageCtrl', function ($scope, RD_API_POSTS, RD_API_COMMENTS, toaster) {
  $scope.limit = 20;
  $scope.offset = 0;

  $scope.getPost = function (){
    RD_API_POSTS.get({ term : $scope.term, limit : $scope.limit, offset : $scope.offset}
    , function success (result){
        $scope.posts = result.data;
        if ($scope.posts && $scope.posts.length > 0)
          toaster.success("Success, We find ", $scope.posts.length, " posts !");
        else {
          $scope.posts = [];
          toaster.error("Sorry, We didn't find a post with the term: ", $scope.term);
        }
    }, function err (result) {
      $scope.posts = [];
      toaster.error("Sorry, We didn't find a post with the term: ", $scope.term);
    });
  }

    $scope.getComment = function (){
      RD_API_COMMENTS.get({ postId : $scope.postId, limit : $scope.limit, offset : $scope.offset}
      , function success (result){
          $scope.comments = result.data;
          if ($scope.comments && $scope.comments.length > 0)
            toaster.success("Success, We find ", $scope.comments.length, " comments !");
          else {
            $scope.comments = [];
            toaster.error("Sorry, We didn't find a comment with the postId: ", $scope.postId);
          }
      }, function err (result) {
        $scope.comments = [];
        toaster.error("Sorry, We didn't find a comment with the postId: ", $scope.postId);
      });
    }
});

app.factory('RD_API_COMMENTS', ['$resource', 'urls', function($resource, urls) {
	return  $resource( urls.API + 'comments/:postId/:limit/:offset' , { postId: '@postId' , limit:'@limit', offset:'@offset'}, { 
      query: { 
        method: 'GET', 
        isArray : false, 
        params: { 
          postId: '@postId', 
          limit:'@limit',
          offset:'@offset'
        }
      }
    });
}]);

app.factory('RD_API_POSTS', ['$resource', 'urls', function($resource, urls) {
	return  $resource( urls.API + 'posts/:term/:limit/:offset' , { term: '@term' , limit:'@limit', offset:'@offset'}, { 
      query: { 
        method: 'GET', 
        isArray : false, 
        params: { 
          term: '@term', 
          limit:'@limit',
          offset:'@offset'
        }
      }
    });
}]);

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('myHttpInterceptor');
});

app.factory('myHttpInterceptor', function ($q,toaster) {
    return {
        responseError: function (response) {
          console.log(response);
          if(response.data){
            if(response.data.message)
            toaster.error("Error: ", response.data.message);
            else
            toaster.error("Error: ", response.data);
          }
          return $q.reject(response);
        }
    };
});