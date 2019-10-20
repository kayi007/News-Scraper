$(document).ready(function(){

    // When Click Scrap (working)
    $(".scrape").on("click", function(){
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
    // When Click Delete Saved Articles (working)
    $(document).on("click", "a.deleteSaved", function(){
        event.preventDefault();
        const postID = $(this).attr("data-id");
        console.log(postID);
        $.ajax({
            method: "PUT",
            url: "/article/delete/" + postID
        }).then(function(data){
            location.reload();
        }).catch(function(err){
            console.log(err);
        });
    });
    // When Clear button is clicked (working)
    $("#clear").on("click", function(){
        event.preventDefault();
        $.ajax({
            method: "DELETE",
            url: "/article/clear"
        }).then(function(data){
            location.reload();
        }).catch(function(err){
            console.log(err);
        });
    });
    // When Add Note is Clicked (not working)
    $(".addNotes").on("click", function(){
        event.preventDefault();
        const postID = $(this).attr("data-id");
    });
});