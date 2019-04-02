$('#loginModal').on('shown.bs.modal', function () {
	$('#exampleInputEmail3').trigger('focus');
})

$(document).ready(function() {
	$('#mycarousel').carousel({interval: 1000});
	$('#carouselButton').click(function() {
		if ($('#carouselButton span').hasClass('fa-pause')) {
			$('#mycarousel').carousel('pause');
		} else {
			$('#mycarousel').carousel('cycle');
		}
		$('#carouselButton span').toggleClass('fa-play');
		$('#carouselButton span').toggleClass('fa-pause');
	});

	$('#loginButton').click(function() {
		$('#loginModal').modal('show');
	});

	$('#reservationButton').click(function() {
		$('#reservationModal').modal('show');
	});
})