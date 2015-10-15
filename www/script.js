var app = angular.module('asolitarymann', ['ngRoute', 'duScroll', 'ngTextTruncate']);

app.config(function($locationProvider, $routeProvider, $sceDelegateProvider) {

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


	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'https://player.vimeo.com/video/**'
	]);

});

app.controller('main', function($scope, $timeout, $http, $rootScope) {

	$scope.trailer = 'https://player.vimeo.com/video/124823784';
	$scope.playing = false;

	$timeout(function() {
		$scope.loaded = true;
	});

	$timeout(function() {
		$rootScope.naving = false;
		$rootScope.spynav = false;
	}, 500);

	var _0x4981=["\x63\x66\x38\x33\x65\x31\x33\x35\x37\x65\x65\x66\x62\x38\x62\x64\x66\x31\x35\x34\x32\x38\x35\x30\x64\x36\x36\x64\x38\x30\x30\x37\x64\x36\x32\x30\x65\x34\x30\x35\x30\x62\x35\x37\x31\x35\x64\x63\x38\x33\x66\x34\x61\x39\x32\x31\x64\x33\x36\x63\x65\x39\x63\x65\x34\x37\x64\x30\x64\x31\x33\x63\x35\x64\x38\x35\x66\x32\x62\x30\x66\x66\x38\x33\x31\x38\x64\x32\x38\x37\x37\x65\x65\x63\x32\x66\x36\x33\x62\x39\x33\x31\x62\x64\x34\x37\x34\x31\x37\x61\x38\x31\x61\x35\x33\x38\x33\x32\x37\x61\x66\x39\x32\x37\x64\x61\x33\x65","\x72\x63\x56\x5A\x58\x6B\x48\x36\x57\x34\x35\x6A\x6E\x56\x6D\x42\x6F\x73\x50\x6B\x43","\x67\x42\x61\x6C\x76\x7A\x52\x4C\x49\x76\x57\x55\x64\x48\x65\x62\x4D\x46\x46\x45\x69\x70\x39\x32\x48\x67\x36\x64\x65","\x64\x44\x6B\x50\x64\x54\x34\x4F\x63\x31\x79\x4D\x4E\x71\x48\x6C\x34\x74\x68\x66\x34\x35\x63\x58\x31"];function z(){var _0x42f4x2=_0x4981[0];var _0x42f4x3=_0x4981[1];var _0x42f4x4=_0x4981[2];var _0x42f4x5=_0x4981[3];return [_0x42f4x3+_0x42f4x4,_0x42f4x5];}

	$scope.play = function() {
		if ($scope.playing) {
			return;
		}
		$scope.playing = true;
		$scope.trailer += '?autoplay=1';
	};

	var feed = new Instafeed({
		get: 'tagged',
		tagName: 'asolitarymann',
		clientId: 'ff454614590d4e298f6a38fa03e146f0',
		mock: true,
		success: function(data) {
			angular.forEach(data.data, function(v, k) {
				var d = new Date(v.created_time *1000);
				data.data[k].date = d.toString().replace(/[a-z]+ ([a-z]+ [0-9]+).*/i,'$1');
			});
			$scope.$apply(function() {
				console.log(data.data);
				$scope.ig = data.data;
			});
		}
	});
	feed.run();

	var cb = new Codebird;
	z = z();

	cb.setConsumerKey(z[1], z[0]);


	var owner = 'arzynik';

	var params = {
		q: '#asolitarymann '+owner+' #testing'
	};
	cb.__call('search_tweets',params,function (reply) {
		var keep = [];
		angular.forEach(reply.statuses, function(v, k) {
			if (v.user.screen_name == owner) {
				v.date = v.created_at.replace(/[a-z]+ ([a-z]+ [0-9]+).*/i,'$1');
				keep.push(v);
			}
		});
		$scope.$apply(function() {
			$scope.news = keep;
		});
		console.log(keep);
	});

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
