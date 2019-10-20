$(document).ready(function(){

    // When Click Scrap (working)
    $("#scrape").on("click", function(){
        event.preventDefault();
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(function(data){
            location.reload();
        }).catch(function(err){
            console.log(err);
        });
    });
    // When Click Save (working)
    $(document).on("click", "a.save", function(){
        event.preventDefault();
        const postID = $(this).attr("data-id");
        console.log(postID);
        $.ajax({
            method:"PUT",
            url: "/article/saved/" + postID
        }).then(function(data){
            location.reload();
        }).catch(function(err){
            console.log(err);
        });
    });
    // When Click Delete Saved Articles (not working)
    $(document).on("click", "a.deleteSaved", function(){

    });
});