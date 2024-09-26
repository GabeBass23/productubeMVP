//main function
if(typeof deleteComplete === 'undefined'){
  const deleteComplete = function(){
    if(document.location.href.includes("youtube.com/watch")){
      handleWatch();
    }
    else if(document.location.href.includes("youtube.com/shorts")){
      // blocks shorts entirely
      // window.location.href = "https://youtube.com/";
    }
    else if (document.location.href.endsWith("youtube.com/")) {
      // replaces homepage with extension settings
      const homeGrid = document.querySelector('ytd-rich-grid-renderer');
      const insertedGrid = document.querySelector('.extension_options_grid');
      if (homeGrid && !insertedGrid) {
        homeGrid.remove();
        addExtensionSettingsPage();
      }

      // get rid of shorts links on the homepage
      const shorts_nav = document.getElementsByTagName('ytd-mini-guide-entry-renderer');
      const shorts = document.getElementById('shorts-container');
      if (shorts_nav[1] && shorts_nav.length == 4){
        shorts_nav[1].remove();
      }
      if (shorts) {
        shorts.remove();
      }

    }
  } //deleteComplete
  deleteComplete();
  setTimeout(deleteComplete, 500);
  setTimeout(deleteComplete, 1000);
  setTimeout(deleteComplete, 2000);
  setTimeout(deleteComplete, 5000);
}
else{
  deleteComplete();
  setTimeout(deleteComplete, 500);
  setTimeout(deleteComplete, 1000);
  setTimeout(deleteComplete, 2000);
  setTimeout(deleteComplete, 5000);
}
