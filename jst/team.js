var Team;

Team = {
  i: function() {
    /* click functionality for the leadership table */
    $("#leadership .leaderEntry").click(function(){
        /* reset everything */
        $("#leadership .leaderEntry.active").removeClass("active");
    	$("#leadership .leaderInfoCard.visible").removeClass("visible");
        
    	/* slide the info card into view */
    	$(this).next().addClass("visible");
        $(this).addClass("active");
    });

    /* click functionality for the close button */
    $("#leadership .leaderInfoClose").click(function(){
    	$(this).parent().removeClass("visible");
        $("#leadership .leaderEntry.active").removeClass("active");
    });
  }
};
