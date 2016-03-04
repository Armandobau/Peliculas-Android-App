'use strict';

angular.module('moviesApp.services',['ngResource'])

        .constant("baseURL","http://192.168.1.108:3000/") 


        .factory('homeFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

            return $resource(baseURL + "movies/:id", null, {'update': {method: 'PUT'}});

        }])

        
        .factory('homeFactory2', ['$resource', 'baseURL', function ($resource, baseURL) {

            return $resource(baseURL + "shows/:id", null, {'update': {method: 'PUT'}});

        }])


        .factory('favoriteMoviesFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

            return $resource(baseURL + "favorites/:id", null, {'update': {method: 'PUT'}});

        }])

        
        .factory('favoriteShowsFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

            return $resource(baseURL + "favorites2/:id", null, {'update': {method: 'PUT'}});

        }])
        

;