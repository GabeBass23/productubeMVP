//=============================================================================================//

function newSessionButtonInitialize(currentElement){
    let blockSessionName = currentElement.innerText;
    currBlockSession = blockSessionName;
    document.getElementsByClassName("newBlockSessionName")[0].value = blockSessionName;
    let blocks = [];
    let whites = [];
    //let timers = 0;
    chrome.storage.local.get({[blockSessionName]:[]}).then((data) => {
        if(data[blockSessionName].isBlock){
            console.log("getting here");
            bsTypeFunc(true);
        }
        else{
            bsTypeFunc(false);
        }

        for(j = 0; j < data[blockSessionName].blocklists.length; ++j){
            blocks.push(data[blockSessionName].blocklists[j]);
        }
        for(j = 0; j < data[blockSessionName].whitelists.length; ++j){
            whites.push(data[blockSessionName].whitelists[j]);
        }
        //sets blocklist options visually
        let blocksContainer = document.getElementsByClassName("blockChoices")[0].getElementsByClassName("blocklist");
        if(blocksContainer.length > 0){
            for(u = 0; u < blocksContainer.length; ++u){
                blocksContainer[u].style = "background-color: transparent"
            }
            for(j = 0; j < blocksContainer.length; ++j){
                for(p = 0; p < blocks.length; ++p){
                    if(blocks[p] == blocksContainer[j].innerText){
                        blocksContainer[j].style = "background-color: hsla(0, 0%, 100%, 0.08)"
                    }
                }
            }
        }
    });
    return blocks;
}

function newSessionButtonInitialize2(){
    // let blockSessionName = currentElement.innerText;
    currBlockSession = "none";
    document.getElementsByClassName("newBlockSessionName")[0].value = "";
    let blocksContainer = document.getElementsByClassName("blockChoices")[0].getElementsByClassName("blocklist");
    for(j = 0; j < blocksContainer.length; ++j){
        blocksContainer[j].style = "background-color: transparent";
    }

    let whitesContainer = document.getElementsByClassName("whiteChoices")[0].getElementsByClassName("whitelist");
    for(j = 0; j < whitesContainer.length; ++j){
        whitesContainer[j].style = "background-color: transparent";
    }

    document.getElementById("startTime").value = '';
    document.getElementById("endTime").value = '';

    let week = document.querySelectorAll(".weekChecks input");
    for(z = 0; z < week.length; ++z){
        week[z].checked = false;
    }
    
    return [];
}