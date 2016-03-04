angular.module('moviesApp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

/*
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

*/

        .controller('HomeController', ['$scope', 'movies', 'shows', 'baseURL', function($scope, movies, shows, baseURL) {            
            $scope.baseURL = baseURL;
            $scope.movies = movies;
            $scope.shows = shows;
        }])

        
        .controller('MoviesController', ['$scope', 'movies', 'baseURL', function($scope, movies, baseURL) {            
            $scope.baseURL = baseURL;
            $scope.movies = movies;
        }])

    
        .controller('ShowsController', ['$scope', 'shows', 'baseURL', function($scope, shows, baseURL) {            
            $scope.baseURL = baseURL;
            $scope.shows = shows;
        }])


        .controller('MovieDetailsController', ['$scope', 'favoriteMoviesFactory', 'homeFactory', 'movie', 'baseURL', '$ionicPopover', '$ionicModal', '$ionicPlatform', '$timeout', function($scope, favoriteMoviesFactory, homeFactory, movie, baseURL, $ionicPopover, $ionicModal, $ionicPlatform, $timeout) {            
            $scope.baseURL = baseURL;
            //$scope.movie = {};
            $scope.movie = movie;
            
            
            
            $ionicPopover.fromTemplateUrl('templates/moviepopover.html', {
                scope: $scope
              }).then(function(popover) {
                $scope.popover = popover;
              });


              $scope.openPopover = function($event) {
                $scope.popover.show($event);
              };
              $scope.closePopover = function() {
                $scope.popover.hide();
              };
              //Cleanup the popover when we're done with it!
              $scope.$on('$destroy', function() {
                $scope.popover.remove();
              });
            
            
                //arreglar que no se agrega a favoritos
                $scope.addFavorite = function(){
                    favoriteMoviesFactory.save($scope.movie);
                    console.log("añadido");
                } 
                
                
                $scope.removeFavorite = function(){
                    favoriteMoviesFactory.remove($scope.movie);
                    console.log("borrado");
                }
                
                
                
                
                $ionicModal.fromTemplateUrl('templates/movie-comment.html', {
                scope: $scope
              }).then(function(modal) {
                $scope.commentform = modal;
              });

              // Triggered in the reserve modal to close it
              $scope.closeComment = function() {
                $scope.commentform.hide();
              };

              // Open the reserve modal
              $scope.openComment = function() {
                $scope.commentform.show();
                $scope.closePopover();
              };

              // Perform the reserve action when the user submits the reserve form 
              $scope.mycomment = {rating:"", comment:"", author:"", date:""};
            
              $scope.doComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.movie.comments.push($scope.mycomment);
                homeFactory.update({id:$scope.movie.id},$scope.movie);
                
                //$scope.commentForm.$setPristine();
                
                //$scope.mycomment = {rating:5, comment:"", author:"", date:""};
                
                $timeout(function() {
                  $scope.closeComment();
                }, 500);
              }
                
            
            
        }])


        .controller('ShowDetailsController', ['$scope', 'favoriteShowsFactory', 'homeFactory2', 'show', 'baseURL', '$ionicPopover', '$ionicModal', '$ionicPlatform', '$timeout', function($scope, favoriteShowsFactory, homeFactory2, show, baseURL, $ionicPopover, $ionicModal, $ionicPlatform, $timeout) {            
            $scope.baseURL = baseURL;
            $scope.show = show;
            
            
            $ionicPopover.fromTemplateUrl('templates/showpopover.html', {
                scope: $scope
              }).then(function(popover) {
                $scope.popover = popover;
              });


              $scope.openPopover = function($event) {
                $scope.popover.show($event);
              };
              $scope.closePopover = function() {
                $scope.popover.hide();
              };
              //Cleanup the popover when we're done with it!
              $scope.$on('$destroy', function() {
                $scope.popover.remove();
              });
            
            
            
                $scope.addFavorite = function(){
                    favoriteShowsFactory.save($scope.show);
                    console.log("añadido");
                } 
                
                
                $scope.removeFavorite = function(){
                    favoriteShowsFactory.remove($scope.show);
                    console.log("borrado");
                }
                
                
                
                
                
                
            $ionicModal.fromTemplateUrl('templates/show-comment.html', {
                scope: $scope
              }).then(function(modal) {
                $scope.commentform = modal;
              });

              // Triggered in the reserve modal to close it
              $scope.closeComment = function() {
                $scope.commentform.hide();
              };

              // Open the reserve modal
              $scope.openComment = function() {
                $scope.commentform.show();
                $scope.closePopover();
              };

              // Perform the reserve action when the user submits the reserve form 
              $scope.mycomment = {rating:"", comment:"", author:"", date:""};
            
              $scope.doComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.show.comments.push($scope.mycomment);
                homeFactory2.update({id:$scope.show.id},$scope.show);
                
                //$scope.commentForm.$setPristine();
                
                //$scope.mycomment = {rating:5, comment:"", author:"", date:""};
                
                $timeout(function() {
                  $scope.closeComment();
                }, 500);
              }
                
                
        }])


        .controller('FavoriteMoviesController', ['$scope', '$stateParams', 'movies', 'baseURL', function($scope, $stateParams, movies, baseURL) {
            $scope.baseURL = baseURL;
            $scope.movies = movies;
              
        }])

        .controller('FavoriteShowsController', ['$scope', '$stateParams', 'shows', 'baseURL', function($scope, $stateParams, shows, baseURL) {
            
            $scope.baseURL = baseURL;
            $scope.shows = shows;
              
        }])

;
