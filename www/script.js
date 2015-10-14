var app = angular.module('asolitarymann', ['ngRoute', 'duScroll', 'ngTextTruncate']);

app.config(function($locationProvider, $routeProvider) {

	$routeProvider.when('/', {
		template: ''
	}).when('/synopsis', {
		template: ''
	}).when('/gallery', {
		template: ''
	}).when('/news', {
		template: ''
	}).when('/trailer', {
		template: ''
	}).when('/about', {
		template: ''
	}).when('/credits', {
		template: ''
	}).when('/soundtrack', {
		template: ''
	}).otherwise({redirectTo: '/'});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: true
	});
});

app.controller('main', function($scope, $timeout, $http, $rootScope) {
	$timeout(function() {
		$scope.loaded = true;
	});

	$timeout(function() {
		$rootScope.naving = false;
		$rootScope.spynav = false;
	}, 500);

	$('.trailer').click(function() {
		$(this).addClass('play');
		$('#vimeo').attr('src','https://player.vimeo.com/video/124823784?autoplay=1');
	});

	var feed = new Instafeed({
		get: 'tagged',
		tagName: 'asolitarymann',
		clientId: 'ff454614590d4e298f6a38fa03e146f0',
		mock: true,
		success: function(data) {
			$scope.$apply(function() {
				$scope.news = data.data;
			});
		}
	});
	feed.run();
});

app.run(function($rootScope, $location, $anchorScroll, $route, $timeout) {
	var animateTime = 500;

	$rootScope.$on('duScrollspy:becameActive', function($event, $element, $target){
		var hash = $element.prop('hash').replace('#','');

		if (hash == 'top') {
			hash = '';
		}

		if ($rootScope.naving) {
			return;
		}

		$rootScope.$apply(function() {
			$rootScope.spynav = true;
			$location.path('/' + hash).replace();
		});

		$timeout(function() {
			$rootScope.spynav = false;
		},10);

		if (!window.history || !history.replaceState) {
			return;
		}
	});

	$rootScope.$on('$routeChangeStart', function(e, current, next) {
		$rootScope.naving = true;
	});

	$rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {

		if ($rootScope.spynav) {
			$rootScope.naving = false;
			return;
		}

		$timeout(function() {
			var hash = $location.$$path.replace('/','');
			var el = $('#' + hash);

			if (!el.length) {
				return;
			}

			$('html, body').animate({
				scrollTop: el.offset().top
			}, animateTime);

			$timeout(function() {
				$rootScope.$apply(function() {
					$rootScope.naving = false;
					$rootScope.spynav = false;
				});
			}, animateTime + 10);
		},10);

	});
});

$(function() {
	$('.trailer').parallax({imageSrc: '/images/trailer.jpg', speed : .4, positionY : '0px'});
	$('.gallery').parallax({imageSrc: '/images/gallery001.jpg', speed : .4, positionY : '0px'});
	$('.about-jeremy-pic').parallax({imageSrc: '/images/jeremy.jpg', speed : .4, positionY : '0px'});
	$('.ost').parallax({imageSrc: '/images/ostbg.jpg', speed : .4});
});
