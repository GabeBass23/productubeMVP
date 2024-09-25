chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.status === 'loading' && tab.url?.includes("youtube.com/watch")){
        chrome.scripting.executeScript({
            files: ['categories.js', 'content.js'],
            target: {tabId: tab.id}
        })
        //add settings here
        //if is blocked then insert CSS
        //possibly also update the saved values of blocklists
        chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ["css/block_mode.css", "css/deleter.css"]
        });
    }
    else if(changeInfo.status === 'loading' && tab.url == "https://www.youtube.com/" || tab.url == "http://www.youtube.com/"){
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
        chrome.scripting.removeCSS({
            target: { tabId: tab.id },
            files: ["css/grid_off.css"]
        })
        chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ["css/block_mode.css", "css/deleter.css", "css/channel_on.css"]
        });
    }
    if(changeInfo.status == 'complete' && tab.url == "https://www.youtube.com/" || tab.url == "http://www.youtube.com/"){
        chrome.scripting.executeScript({
            files: ['home.js', 'content.js'],
            target: {tabId: tab.id}
        });
    }
    else if(changeInfo.status == 'complete' && tab.url?.includes("youtube.com")){
        // chrome.scripting.executeScript({
        //     files: ['home.js', 'content.js'],
        //     target: {tabId: tab.id}
        // })
    }
    if (changeInfo.status === 'complete' && tab.url?.includes("youtube.com/results")){
        chrome.scripting.executeScript({
            files: ['search.js'],
            target: {tabId: tab.id}
        })
    }
})