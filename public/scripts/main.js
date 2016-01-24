$(document).ready(function() {
	$("#CompetitiveRating").ionRangeSlider({
	values:["I'm just here to have fun!", "Working on the ferocity","The Middle Path", "Working on the chill", 
	"I'm in it to win it."],
	from:"The Middle Path"
	});
	$('.revealer').on('click', function(e) {
		if ($(this).text() != "Hide") {
			$(this).text("Hide");
		}
		else {
				$(this).text("Expand");
		}
		$("#pars-" + $(this).attr("data-num")).slideToggle();
		// var $collapse = $this.closest('.collapse-group').find('.collapse');
		// $collapse.collapse('toggle');
	});
});
