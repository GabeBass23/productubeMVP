function deleteExtra() {
    // var ad_stuff = document.getElementsByTagName("ytd-search-pyv-renderer");
    
    // for (var i = ad_stuff.length - 1; i >= 0; i--){
    //     ad_stuff[i].remove();
    // }
    // currently ads might take up the first two slots of the search results
    // this will need to be fixed for the final version

    var parentElement = document.getElementById("contents"); // Get the parent element by ID
    if (parentElement) {
        var specificTagElements = parentElement.getElementsByTagName("ytd-item-section-renderer");

        for (var i = 0; i < specificTagElements.length; i++) {
            var element = specificTagElements[i];
            if (i > 1){
                element.style.display = "none";
            }
        }
    }
}

window.onscroll = deleteExtra;