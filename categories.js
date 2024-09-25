// Wrap chrome.storage.local.get in a promise
function getStorageData(key, defaultValue = []) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get({ [key]: defaultValue }).then((result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result[key]);
        }
      });
    });
}


function checkCategory(){
    getPageSource().then(data => {
        if (data) {
            const scriptContent = extractScriptContent(data);
            const keyToFind = 'category'; // replace with your specific key
        
            const result = searchForKey(scriptContent, keyToFind);
            let stuffs = result ? result : 'No matches found';
            stuffs = stuffs.replace(/\\u0026/g, '&');

            getStorageData('catsBlocked').then((data) => {
                getStorageData('categories').then((data2) => {
                  for (let i = 1; i <= 15; ++i){
                    console.log(data2[i-1], stuffs, data2[i-1] == stuffs)
                    if(data[i-1] && data2[i-1] === stuffs){
                      window.location.href = "https://youtube.com/";
                    }
                  }
                });
              });
        }
    });
}
  
function getPageSource() {
    return fetch(window.location.href)
        .then(response => response.text())
        .then(source => source)
        .catch(error => {
        return null;
        });
}

function extractScriptContent(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const scriptTags = doc.querySelectorAll('script');

    let scriptContent = '';
    scriptTags.forEach(tag => {
        scriptContent += tag.innerHTML + '\n';
    });

    return scriptContent;
}

function searchForKey(scriptContent, key) {
    const regex = new RegExp(`"${key}"\\s*:\\s*"(.*?)"`, 'g');
    const matches = regex.exec(scriptContent);
    console.log(matches[1])
    
    // If a match is found, return the captured value (in the first capturing group).
    return matches ? matches[1] : null;
}