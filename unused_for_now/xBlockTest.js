// idea was to block chrome extensions page

// chrome.webRequest.onBeforeRequest.addListener(
//     function(details) {
//       // Check if the URL matches the one you want to block
//       if (details.url.includes("chrome://extensions")) {
//         // Cancel the request to prevent the tab from opening
//         return { cancel: true };
//       }
//       // Allow the request to proceed
//       return { cancel: false };
//     },
//     { urls: ["<all_urls>"] },
//     ["blocking"]
//   );