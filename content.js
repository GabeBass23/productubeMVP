//main function
if(typeof deleteComplete === 'undefined'){
  const deleteComplete = function(){
    if(document.location.href.includes("youtube.com/watch")){
      document.querySelector('ytd-mini-guide-renderer').hidden = true;
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
      
      // removes autoplay button
      if(autoPlay.length === 1){
        autoPlay[0].remove();
      }
    }
    else if(document.location.href.includes("youtube.com")){
      const shorts_nav = document.getElementsByTagName('ytd-mini-guide-entry-renderer');
      const homeGrid = document.querySelector('ytd-rich-grid-renderer');
      const shorts = document.getElementById('shorts-container');
      const subs = document.querySelector('ytd-section-list-renderer');
      const library = document.querySelector('ytd-two-column-browse-results-renderer');
      const navegationBar = document.querySelector('ytd-mini-guide-renderer');
      // const ytp_browse = document.getElementsByTagName("ytd-browse")[0];

      if (shorts_nav[1] && shorts_nav.length == 4){
        shorts_nav[1].remove();
      }

      if (shorts_nav[1] && shorts_nav.length == 4){
        shorts_nav[1].remove();
      }
      //fixes navbar
      if(window.innerWidth > 791 && navegationBar){
        navegationBar.hidden = false;
      }
      window.onresize = function(){
        if(!document.location.href.includes("youtube.com/watch")){
          //on youtube but not watching a video
          if(navegationBar){
            if(window.innerWidth > 791){
              navegationBar.hidden = false;
            }
            else{
              navegationBar.hidden = true;
            }
          }
        }
      }
      //end fixes navbar

      if (homeGrid) {
        if(document.location.href == "https://www.youtube.com/" || document.location.href == "http://www.youtube.com/"){
          homeGrid.remove();
          if(document.getElementsByClassName("extension_options_grid").length === 0){
            addExtensionSettingsPage();
          }
          navegationBar.hidden = false;
        }
        
        // the following is currently useless but could be revisited when 
        // there is an option to show suggested on the homescreen
        // else{
        //   homeGrid.style = "display: flex !important";
        // }
      }
      if(navegationBar){
        if(window.innerWidth > 1000){
          navegationBar.hidden = false;
        }
      }
      if(subs){
        //subs.remove();
      }
      if(library){
        //library.remove();
      }
      if (shorts) {
        shorts.remove();
      }

      //should populate the currentBlocks thing (switching to new system)
      // let currBlocks = document.getElementsByClassName("currentBlocks")[0];
      // if(currBlocks && currBlocks.childElementCount == 0 && activeList.size > 0){
      //   activeList.forEach(element => {
      //     let bb = document.createElement('span');
      //     bb.innerText = element;
      //     currBlocks.append(bb);
      //   })
      // }
      

    } //youtube home
  } //deleteComplete
  deleteComplete();
  setTimeout(deleteComplete, 500);
  setTimeout(deleteComplete, 1000);
  setTimeout(deleteComplete, 2000);
  setTimeout(deleteComplete, 5000);
} //define deleteComplete
else{ //runs deleteComplete again
  deleteComplete();
  setTimeout(deleteComplete, 500);
  setTimeout(deleteComplete, 1000);
  setTimeout(deleteComplete, 2000);
  setTimeout(deleteComplete, 5000);
}

if(typeof obs === 'undefined' && document.location.href.includes("youtube.com/watch")){
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

if(typeof obs2 === 'undefined' && document.location.href.includes("youtube.com/watch")){
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
