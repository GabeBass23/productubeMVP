// Wrap chrome.storage.local.get in a promise
function getStorageData(key, defaultValue = []) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get({ [key]: defaultValue }).then((result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result[key]);
      }
    });
  });
}

function checkCategory(){
  
}

function getChannels(){
            // is this included elsewhere?
      document.querySelector('ytd-mini-guide-renderer').style = 'display: none';


      // below is a system to be implemented in categories.js that finds video categories
      // it is not entirely complete
      
      // fetch(window.location.href)
      //   .then(response => response.text())
      //   .then(source => {
      //     // console.log(source);
      //     try {
      //       console.log(JSON.parse(source), "fasdklfjldskajfl;k")
      //       return JSON.parse(source);
      //     } catch (e) {
      //       console.log('Data is not JSON, likely HTML.');
      //       return data;
      //     }
      //     return source;
      //   })
      //   .catch(error => {
      //     console.error('Error fetching page source:', error);
      //     return null;
      //   });
    
      //needs to be fixed after blockschedules are created ////////////////////////////

    // Example usage
    let bChans = [];
    let lChans = {};
    getStorageData('sessions')
    .then(initialData => {
        const keysList = initialData;

        // Create an array of promises for each key
        const promises = keysList.map(key => getStorageData(key));
        
        // Use Promise.all to run all the get requests in parallel
        return Promise.all(promises);
    })
    .then(results => {
        console.log(results)
        results.forEach((result) => {
          let res = updateActive(result);
          bChans = res[0] ? bChans.concat(res[1]) : bChans;
          lChans = !res[0] ? {...lChans, ...res[2]} : lChans;
        });

        redirectBlocked(bChans);

        calculateLimits(lChans);

        console.log(bChans, lChans, "ahh");

    })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
    
    // chrome.storage.local.get({sessions:[]}).then((data) => {
    //     let bChans = [];
    //     let lChans = [];
    //     let sessions = data.sessions;

    //     sessions.forEach((sess) => {
    //         chrome.storage.local.get({[sess]:{}}).then((data2) => {
    //             let result = updateActive(data2[sess], bChans, lChans);
    //             bChans = result[1];
    //             lChans = result[2];
    //         })
    //     })
    // })

    
}


function redirectBlocked(blocked){
  let channel = document.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string")[0];
  var channelName = "";
  if(channel){
      channelName = channel.innerText;
  }

  //redirects user if channel is blocked
  if(blocked.map(item => item.toLowerCase()).includes(channelName.toLowerCase())){
    window.location.href = "https://youtube.com/";
  }
}

function calculateLimits(limited){
  let channel = document.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string")[0];
  var channelName = "";
  if(channel){
      channelName = channel.innerText;
      channelName = channelName.toLowerCase();
  }

  

  Object.keys(limited).forEach(limit => {
    if(limit.toLowerCase() == channelName){
      //access stored data with limited[limit]
      let newStart = new Date();
      // Create a timer that runs for 10 seconds
      const myTimer = new Timer(10, onTick, onComplete);
      window.addEventListener('beforeunload', (event) => {
        let newEnd = new Date();

        
      });
      document.addEventListener('visibilitychange', () => {
        let newEnd = new Date();

        //the timer needs to be changed in the storage to reflect the number of seconds left
        
      });
    }
  });
}