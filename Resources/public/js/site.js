/**
 * All the frontend functionality
 */

$(document).ready(function() {
	$("#homepage-carousel").slides({
		preload : false,
		container : 'slides_container',
		generateNextPrev : false,
		generatePagination : true,
		paginationClass : 'slides-paginator',
		pagination : true,
		effect : 'fade',
		fadeSpeed : 500,
		crossfade : true,
		play : 5000,
		hoverPause : true
	});
});