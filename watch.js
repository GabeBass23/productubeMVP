function handleWatch(){
    checkCategory();

    const suggestions = document.getElementById('related');
    if (suggestions) {
        suggestions.remove();
    }

    let secondary = document.getElementById('secondary');
    if(secondary){
        secondary.remove();
    }

    let primary = document.getElementById('primary');
    if(primary){
        primary.style.width = "100%";
    }

    let miniPlayer = document.getElementsByClassName('ytp-miniplayer-button ytp-button');
    if(miniPlayer.length === 1){
        miniPlayer[0].remove();
    }

    let autoPlay = document.getElementsByClassName('ytp-autonav-endscreen-countdown-overlay');
    let autoButton = document.getElementsByClassName('ytp-button');
    let sizeButton = document.getElementsByClassName('ytp-size-button');
    let nextButton = document.getElementsByClassName('ytp-next-button');

    if(nextButton.length === 1){
        nextButton[0].remove();
    }

    // prevents autoplay at the end of videos
    for(i = 0; i < autoButton.length; ++i){
        if(autoButton[i].getElementsByClassName('ytp-autonav-toggle-button-container').length > 0){
            if(autoButton[i].getAttribute('title') === "Autoplay is on"){
            autoButton[i].click();
            }
            autoButton[i].remove();
            break;
        }
    }

    // defaults to theater mode
    if(sizeButton.length === 1){
        if(sizeButton[0].getAttribute('title') === "Theater mode (t)"){
            sizeButton[0].click();
        }
        else{
            sizeButton[0].remove();
        }
    }
    
    // removes autoplay button
    if(autoPlay.length === 1){
        autoPlay[0].remove();
    }
}

//===========================================================================//
//removes endscreen video content

if(typeof obs === 'undefined'){
    const current = document.getElementsByClassName('html5-video-player');

    const obs = new MutationObserver(callback);

    function callback (muations) {
        let endScreen0 = document.getElementsByClassName('ytp-endscreen-content');
        if(endScreen0.length > 0){
            endScreen0[0].remove();
        }
    }

    obs.observe(current[0], {
        childList: true
    });
}


//===========================================================================//
//removes related video content
if(typeof obs2 === 'undefined'){
    const below = document.getElementById('below');

    const obs2 = new MutationObserver(callback);

    function callback (muations) {
        let endScreen1 = document.getElementById('related');
        if(endScreen1){
            endScreen1.remove();
        }
    }

    if(below){
        obs2.observe(below, {
        childList: true
        });
    }
}