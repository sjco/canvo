'use strict';

/**
* Canvas Module
*
* Description
*/

angular.module('canvas', ['ngRoute'])

.config(function($routeProvider) {
	$routeProvider.otherwise("/");
	$routeProvider.when("/",{
		templateUrl:"scripts/app/home/home.html",
		controller:"CanvasController"
	});
	console.log("configured");
});

