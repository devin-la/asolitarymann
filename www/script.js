var app = angular.module('asolitarymann', ['ngRoute', 'duScroll']);

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
	}).when('/soundtrack', {
		template: ''
	}).otherwise({redirectTo: '/'});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: true
	});
});

app.controller('main', function($scope, $timeout) {
	$timeout(function() {
		$scope.loaded = true;
	});

	$('.trailer').click(function() {
		$(this).addClass('play');
		$('#vimeo').attr('src','https://player.vimeo.com/video/124823784?autoplay=1'); 
	});

});

app.run(function($rootScope, $location, $anchorScroll, $route) {


	
	var animateTime = 500;

	$rootScope.$on('duScrollspy:becameActive', function($event, $element, $target){
		var hash = $element.prop('hash').replace('#','');
		console.log(hash);
		if (hash == 'top') {
			hash = '';
		}
		
		
		
		
		if ($rootScope.naving) {
			console.log('end');
			return;
		}
		
		$rootScope.$apply(function() {
			$rootScope.spynav = true;
			$location.path('/' + hash).replace();
		});
		
		setTimeout(function() {
			$rootScope.$apply(function() {
				$rootScope.spynav = false;
			});
		},10);
		
		
		
		if (!window.history || !history.replaceState) {
			return;
		}
		
		//history.replaceState(null, null, hash);
	});
	
	$rootScope.$on('$routeChangeStart', function(e, current, next) {
		$rootScope.naving = true;
		var currentRoute = current.$$route;
    	var nextRoute = next ? next.$$route : null;
		console.log(currentRoute, nextRoute, $location.$$path);
		if (currentRoute.originalPath == '/' && nextRoute) {
			//$route.reload();
		}
	});

	$rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
		console.debug('success',arguments);
		
		if ($rootScope.spynav) {
			$rootScope.naving = false;
			return;
		}

		setTimeout(function() {
			var hash = $location.$$path.replace('/','');
			var el = $('#' + hash);

			if (!el.length) {
				return;
			}

			$('html, body').animate({
				scrollTop: el.offset().top
			}, animateTime);

			setTimeout(function() {
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
	$('.ost').parallax({imageSrc: '/images/ostbg.jpg', speed : .4, positionY : '-1800px'});
});