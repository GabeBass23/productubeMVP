// Wrap chrome.storage.sync.get in a promise and set the value if it doesn't exist
function getStorageData(key, defaultValue = []) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get({ [key]: defaultValue }, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        // If the key is not in memory, set it to the defaultValue
        if (result[key] === defaultValue) {
          chrome.storage.sync.set({ [key]: defaultValue }, () => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(defaultValue);
            }
          });
        } else {
          resolve(result[key]);
        }
      }
    });
  });
}

//=============================================================================================//
//has big html dump

function addExtensionSettingsPage(){
  let browseGrid = document.getElementsByTagName("ytd-browse")[0];
  if(browseGrid){
      let newGrid = document.createElement("div");
      newGrid.classList.add("extension_options_grid");
      newGrid.id = "productube_app";

      const partialUrl = chrome.runtime.getURL('html/homepageStruct.html');

      // // testing only
      // chrome.storage.sync.set({'blockActive': false});
      chrome.storage.sync.set({'categories': ["Autos & Vehicles", "Comedy", "Education", "Entertainment", 
        "Film & Animation", "Gaming", "Howto & Style", "Music", "News & Politics", "Nonprofits & Activism", 
        "People & Blogs", "Pets & Animals", "Science & Technology", "Sports", "Travel & Events"]
      })

      fetch(partialUrl)
          .then(response => response.text())
          .then(html => {
              newGrid.innerHTML = html;
              browseGrid.append(newGrid);
              /// load the current settings
              displaySettings();
              // handle click events
              blockMode();
              lockBlock();
            }
          ).catch(error => console.error('Error loading partial HTML:', error));
  }
}

function blockMode(){
  document.querySelectorAll('.cat').forEach(function(checkbox) {
      checkbox.addEventListener('click', function(event) {
        // Prevents users from changing settings in block mode
        event.preventDefault();
        getStorageData('blockActive', false).then((data) => {
          // Is useful for setting state of checkbox
          let num = parseInt(checkbox.id.match(/\d+/)[0], 10); // Extracts the first sequence of digits

          if(!data){
            checkbox.checked = !checkbox.checked;
            saveCheckboxState(num, checkbox.checked);
          }
          else if(data && checkbox.checked === true){
            event.preventDefault();
          }
          else{
            let userConfirmed = confirm("Are you sure you want to block this category?");
            if(userConfirmed){
              checkbox.checked = true;
              saveCheckboxState(num, true);
            }
          }
        }).catch((error) => {
          console.error('Error:', error);
        });
      });
  });
}

function lockBlock(){
  document.querySelector('.toggle-container').addEventListener('click', function(event) {
    getStorageData('blockActive').then((data) => {
      if(data){
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();

        // Check if the current time is between 11:55 PM and 11:59 PM
        if (currentHours === 23 && currentMinutes >= 55 && currentMinutes <= 59) {
          this.classList.toggle('active');
          chrome.storage.sync.set({'blockActive': false});
        } else {
          event.preventDefault();
        }
      }
      else{
        let userConfirmed = confirm("Are you sure you want to activate Locked Block? This action cannot be cancelled until 11:55pm.");
        if (userConfirmed) {
          this.classList.toggle('active');
          chrome.storage.sync.set({'blockActive': true});
        }
      }
    }).catch((error) => {
      console.error('Error:', error);
    });
  });
}

function saveCheckboxState(checkboxId, isChecked) {
  chrome.storage.sync.get('catsBlocked', (result) => {
    let catsBlocked = result.catsBlocked || {};
    catsBlocked[checkboxId-1] = isChecked;
    chrome.storage.sync.set({ catsBlocked });
  });
}


function displaySettings(){
  chrome.storage.sync.get('blockActive', (result) => {
    if(result.blockActive){
      document.querySelector('.toggle-container').classList.toggle('active');
    }
  });

  chrome.storage.sync.get('catsBlocked', (result) => {
    const catsBlocked = result.catsBlocked || Array(15).fill(false);
    // Update the UI with the stored states
    for (let i = 1; i <= 15; i++) {
      const checkbox = document.getElementById(`checkbox${i}`);
      if (checkbox) {
        checkbox.checked = catsBlocked[i-1];
      }
    }
  });
}