chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.status === 'loading' && tab.url?.includes("youtube.com/watch")){
        chrome.scripting.executeScript({
            files: ['categories.js', 'watch.js', 'content.js'],
            target: {tabId: tab.id}
        })
        chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ["css/block_mode.css", "css/deleter.css"]
        });
    }
    else if (changeInfo.status === 'loading' && tab.url?.includes("youtube.com/@")) {
        // Check the flag in chrome.storage to see if the page has been reloaded
        chrome.scripting.removeCSS({
            target: { tabId: tab.id },
            files: ["css/search.css", 'css/grid_off.css']
        });
    }
    else if (changeInfo.status === 'loading' && tab.url?.includes("youtube.com/shorts")) {
        chrome.tabs.update(tabId, { url: "https://www.youtube.com/" }); // Redirect to YouTube homepage
    }
    else if(changeInfo.status === 'loading' && tab.url?.endsWith("youtube.com/")){
        chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ["css/generate_home.css", "css/block_mode.css", "css/deleter.css", "css/grid_off.css"]
        });
    }
    else if (changeInfo.status === 'loading' && tab.url?.includes("youtube.com/results")){
        chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ["css/search.css"]
        });
    }
    else if (changeInfo.status === 'loading' && tab.url?.includes("youtube.com")){
        chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ["css/block_mode.css", "css/deleter.css"]
        });
    }
    if(changeInfo.status == 'complete' && tab.url == "https://www.youtube.com/" || tab.url == "http://www.youtube.com/"){
        chrome.scripting.executeScript({
            files: ['home.js', 'content.js'],
            target: {tabId: tab.id}
        });
    }
    else if (changeInfo.status === 'complete' && tab.url?.includes("youtube.com/@")) {
    }
    else if(changeInfo.status == 'complete' && tab.url?.includes("youtube.com")){
        chrome.scripting.executeScript({
            files: ['content.js'],
            target: {tabId: tab.id}
        })
    }
})