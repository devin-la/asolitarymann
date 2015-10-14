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
	$('.ost').parallax({imageSrc: '/images/ostbg.jpg', speed : .4, positionY : '0px'});
	
	

	setTimeout(function() {
		$('body').addClass('loaded');
	}, time);
});