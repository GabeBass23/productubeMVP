// document.getElementById('findPair').addEventListener('click', () => {
//     getPageSource().then(data => {
//         if (data) {
//         const scriptContent = extractScriptContent(data);
//         console.log(scriptContent);
//         const keyToFind = 'category'; // replace with your specific key
//         const valueToFind = 'catType'; // replace with your specific value

//         const result = searchForKeyValuePair(scriptContent, keyToFind, valueToFind);
//         document.getElementById('result').textContent = result ? result.join('\n') : 'No matches found';
//         }
//     });
// });


////////////////////////////////////////////////////////////////////////////////////////////////

getPageSource().then(data => {
    if (data) {
    const scriptContent = extractScriptContent(data);
    console.log(scriptContent);
    const keyToFind = 'category'; // replace with your specific key
    const valueToFind = 'Sports'; // replace with your specific value

    const result = searchForKeyValuePair(scriptContent, keyToFind, valueToFind);
    const stuffs = result ? result.join('\n') : 'No matches found';
    console.log(stuffs);
    document.getElementById('result').textContent = result ? result.join('\n') : 'No matches found';
    }
});

// getPageSource().then(data => {
//     if(data){
//         console.log(data);
//     }
//     console.log('ppoo')
// });
  
function getPageSource() {
return fetch(window.location.href)
    .then(response => response.text())
    .then(source => source)
    .catch(error => {
    console.error('Error fetching page source:', error);
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

function searchForKeyValuePair(scriptContent, key, value) {
    // const regex = new RegExp(`"${key}"\\s*:\\s*"${value}"`, 'g');
    // const matches = scriptContent.match(regex);
    // return matches;

    const regex = new RegExp(`"${key}"\\s*:\\s*"(.*?)"`, 'g');
    const matches = regex.exec(scriptContent);
    console.log(matches[1])
    
    // If a match is found, return the captured value (in the first capturing group).
    return matches ? matches[1] : null;
}