$(document).ready(function(){

    // When Click Scrap (not working)
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
});