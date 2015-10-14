

var app = angular.module('asolitarymann', ['ngRoute']);

app.config(function($locationProvider, $routeProvider) {
//app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

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
		requireBase: false
	});
});
//}]);


app.controller('main', function($scope) {
	
});

app.run(function($rootScope, $location, $anchorScroll) {
	$rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
		setTimeout(function() {
			var hash = $location.$$path.replace('/','');
			var el = $('a[name="' + hash + '"]');
			if (!el.length) {
				return;
			}
			$('html, body').animate({
				scrollTop: el.offset().top
			}, 500);
		},10);
		//$anchorScroll(hash);
	});
});


$(function() {
	var time = 600;
	time = 0;
	$('.trailer').click(function() {
		$(this).addClass('play');
		$('#vimeo').attr('src','https://player.vimeo.com/video/124823784?autoplay=1'); 
	});

	$('.trailer').parallax({imageSrc: '/images/trailer.jpg', speed : .4, positionY : '0px'});
	$('.gallery').parallax({imageSrc: '/images/gallery001.jpg', speed : .4, positionY : '0px'});
	$('.about-jeremy-pic').parallax({imageSrc: '/images/jeremy.jpg', speed : .4, positionY : '0px'});
	$('.ost').parallax({imageSrc: '/images/ostbg.jpg', speed : .4, positionY : '-1800px'});



	setTimeout(function() {
		$('body').addClass('loaded');
	}, time);
/*
	$('a').click(function(){
		$('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top
		}, 500);
		return false;
	});
	*/

});