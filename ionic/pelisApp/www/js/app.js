// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('moviesApp', ['ionic', 'ngCordova', 'moviesApp.controllers', 'moviesApp.services'])

.run(function($ionicPlatform, $cordovaSplashscreen, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
        
    $timeout(function(){
                $cordovaSplashscreen.hide();
      },20000);
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    controller: 'AppCtrl'
  })

  .state('app.movies', {
      url: '/movies',
      views: {
        'menuContent': {
          templateUrl: 'templates/movies.html',
          controller: 'MoviesController',
          resolve: {
              movies:  ['homeFactory', function(homeFactory){
                  return homeFactory.query();
              }]
          }
        }
      }
    })
  
    .state('app.shows', {
      url: '/shows',
      views: {
        'menuContent': {
          templateUrl: 'templates/shows.html',
          controller: 'ShowsController',
          resolve: {
              shows:   ['homeFactory2', function(homeFactory2){
                  return homeFactory2.query();
              }]
          }
        }
      }
    })
  
   .state('app.favoriteMovies', {
      url: '/favoriteMovies',
      views: {
        'menuContent': {
          templateUrl: 'templates/movieslist.html',
          controller: 'FavoriteMoviesController',
          resolve: {
              movies:  ['favoriteMoviesFactory', function(favoriteMoviesFactory){
                  return favoriteMoviesFactory.query();
              }]
          }
        }
      }
    })
  
    .state('app.favoriteShows', {
      url: '/favoriteShows',
      views: {
        'menuContent': {
          templateUrl: 'templates/showslist.html',
          controller: 'FavoriteShowsController',
          resolve: {
              shows:  ['favoriteShowsFactory', function(favoriteShowsFactory){
                  return favoriteShowsFactory.query();
              }]
          }
        }
      }
    })
  
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeController',
          resolve: {
              movies:  ['homeFactory', function(homeFactory){
                  return homeFactory.query();
              }],
              shows:   ['homeFactory2', function(homeFactory2){
                  return homeFactory2.query();
              }]
          }
            
        }
      }
    })

  .state('app.moviedetails', {
    url: '/movies/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/moviedetails.html',
        controller: 'MovieDetailsController',
        resolve: {
              movie:  ['$stateParams','homeFactory', function($stateParams, homeFactory){
                return homeFactory.get({id:parseInt($stateParams.id, 10)});
            }] 
        }
      }
    }
  })
  
  .state('app.showdetails', {
    url: '/shows/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/showdetails.html',
        controller: 'ShowDetailsController',
        resolve: {
              show:  ['$stateParams','homeFactory2', function($stateParams, homeFactory2){
                return homeFactory2.get({id:parseInt($stateParams.id, 10)});
            }] 
        }
      }
    }
  })
  
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
