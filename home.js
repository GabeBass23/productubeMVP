// import * as sessions from './sessions.js'

//=============================================================================================//

//moved to sessions.js delete here and hope it works/////////////////////////////////
function changeTime(parentElement, hours, minutes){
  timeSlots = parentElement.querySelectorAll(".timeInp");
  parentElement.dataset.hrs = hours;
  parentElement.dataset.mins = minutes;
  let adjustedHrs = hours;
  let mVal = "am";
  if(minutes < 10){
    minutes = "0" + minutes;
  }
  if(hours == 12){
    mVal = "pm";
  }
  else if(hours > 12){
    adjustedHrs = hours - 12;
    mVal = "pm";
  }
  if(hours == 0){
    adjustedHrs = 12;
  }
  if(timeSlots.length == 3){
    timeSlots[0].value = adjustedHrs;
    timeSlots[1].value = minutes;
    timeSlots[2].value = mVal;
  }         
}

//=============================================================================================//

function arrowClick(event) {
  let parentElement = event.target.parentNode.parentNode;
  let hours = Number(parentElement.dataset.hrs);
  let minutes = Number(parentElement.dataset.mins);

  let compElement = event.target.classList[1];

  if(compElement == "shup"){
    hours = (hours + 1) % 24;
  }
  else if(compElement == "shdown"){
    hours = (hours + 23) % 24;
  }
  else if(compElement == "smup"){
    if(minutes == 59){
      hours = (hours + 1) % 24;
    }
    minutes = (minutes + 1) % 60;
  }
  else if(compElement == "smdown"){
    if(minutes == 0){
      hours = (hours + 23) % 24;
    }
    minutes = (minutes + 59) % 60;
  }
  else if(compElement == "sapup"){
    hours = (hours + 12) % 24;
  }
  else if(compElement == "sapdown"){
    hours = (hours + 12) % 24;
  }
  if(parentElement.classList[0] == "limitTime"){
    timeSlots = parentElement.querySelectorAll(".timeInp");
    parentElement.dataset.hrs = hours;
    parentElement.dataset.mins = minutes;
    timeSlots[0].value = hours;
    timeSlots[1].value = minutes;
  }
  else{
    changeTime(parentElement, hours, minutes);
  }
}

//=============================================================================================//

function newButton(name, classes){
  let newB = document.createElement("button");
  newB.innerText = name;
  newB.classList.add(classes);
  return newB;
}

//=============================================================================================//

// function newRow(chans, newChan){
//   chans.push(newChan);
//   let newX = document.createElement("button");
//   newX.classList.add("remove");
//   newX.innerText = "❌";
//   let newP = document.createElement("p");
//   newP.innerText = newChan;
//   let newRow = document.createElement("div");
//   newRow.classList.add("chanDisplay");
//   newRow.append(newX, newP);

//   newX.onclick = function(){
//     let chanInd = -1;
//     for(k = 0; k < chans.length; ++k){
//       if(chans[k] == this.parentNode.children[1].innerText){
//         chanInd = k;
//       }
//     }
//     if(chanInd != -1){
//       chans.splice(chanInd, 1);
//       this.parentNode.remove();
//     }
//   }
//   return chans, newRow;
// }

//=============================================================================================//

//=============================================================================================//

// function addChanButtonFunc(chans){
//   let parentElem = document.querySelector(".addChannel");
//   let newChan = parentElem.children[1].value;
//   parentElem.children[1].value = "";
  
//   var insert = true;
//   for(i = 0; i < chans.length; ++i){
//     if(newChan == chans[i]){
//       insert = false;
//       break;
//     }
//   }
//   if(insert){
//     let newChanRow;
//     chans, newChanRow = newRow(chans, newChan);
//     document.querySelector(".chanList").append(newChanRow)
//   }
//   return chans;
// }

//=============================================================================================//
// old system

//=============================================================================================//
//has big html dump

function addExtensionSettingsPage(){
    let browseGrid = document.getElementsByTagName("ytd-browse")[0];
    if(browseGrid){
        let newGrid = document.createElement("div");
        newGrid.classList.add("extension_options_grid");
        newGrid.id = "productube_app";

        const partialUrl = chrome.runtime.getURL('html/homepageStruct.html');

        let chansBlock = [];

        fetch(partialUrl)
            .then(response => response.text())
            .then(html => {
                newGrid.innerHTML = html;

                browseGrid.append(newGrid);
                blockMode(true);

              }
            ).catch(error => console.error('Error loading partial HTML:', error));
  }
}

function blockMode(blockActive){
  document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
    console.log(checkbox);
      checkbox.addEventListener('click', function(event) {
          // If blockActive is true and the checkbox is already checked, prevent unchecking
          if (blockActive && checkbox.checked === false) {
              event.preventDefault();
          }
      });
  });
}