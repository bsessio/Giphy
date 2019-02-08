let topics = ["Dean", "Sam", "Bobby", "Castiel"];
let buttonsAway = function(){
    $(".buttons").empty();
    for (i = 0; i < topics.length; i++) {
        let spnEntry = topics[i],
            newBtn = $("<button>", {class: "spn-button", 'data-spn': spnEntry + ' supernatural', text: spnEntry});
        
            $(".buttons").append(newBtn);
}
};

buttonsAway();

$(document).on("click", ".spn-button", function(){

    let spn = $(this).data("spn");
        queryURL = "https://api.giphy.com/v1/gifs/search?apikey=KuKw7OwQ2SX8KW6ipc81SVs9FJol4Xzm&q=" + spn + "&limit=10&offset=0&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function(response) {
        let results  = response.data;
        console.log(response.data);
        // let seeMore = $("<div>", {class: 'see-more'});
        // $(".images").append(seeMore);
        // This would create a master Div to allow functionality for the '10 more' button to always track after the appropriate batch of gifs.
        for (i = 0; i < results.length; i++) {
        let spnDiv = $("<div>", {class: "spnDiv"}),
            p        = $("<p>").html("Rating: " + "<span class='rating'>"+results[i].rating+"</span>"),
            staticImage = results[i].images.fixed_height_still.url,
            animateImage = results[i].images.fixed_height.url,
            spnImage = $("<img>", {src: staticImage, 'data-still': staticImage, 'data-animate': animateImage, 'data-state': 'still', alt: "supernatural image", class: "gif"});
        spnDiv.append(spnImage, p);
        $(".images").prepend(spnDiv);
        // If using moreGifs/see-More, this would prepend to the see-more Div, then allowing me to append a '10 more gifs' button at the end of it.
      }
    //   let moreGifs = $("<button>", {text:"10 more", class: "moreGifs"});
    //   $(".images").append(moreGifs);
    //    This would then give me a button which I could code to reveal 10 more of the SPN result above.
    });
 });

 $("#newSubmit").on("click", function(e) {
    e.preventDefault();

    let newGuy = $('#newButton').val();
    
    topics.push(newGuy);
    
    buttonsAway();
    
    $('#newButton').val('')
}

 );

 $(document).on("click", ".gif", function() {
    
    let state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
 });