(async function () {
    const url = window.location.href;

    // Load the JSON file from the extension directory
    const res = await fetch(chrome.runtime.getURL('ai-websites.json'));
    const sites = await res.json();

    // Normalize and check if current URL matches any Company URL
    let match = null;
    for (const site of sites) {
        if (url.startsWith(site["Company URL"])) {
            match = site;
            break;
        }
    }

    // Create tooltip content if matched
    let tooltip = "AI Guard: Unsafe Site";
    if (match) {
        tooltip = Object.entries(match)
            .map(([key, val]) => `${key}: ${val}`)
            .join('\n');
    }


    // Check if the current document is the top-level document and not in an iframe
    if (window.self === window.top && window.frameElement === null) {
        const indicatorSpan = document.createElement("span");
        indicatorSpan.setAttribute("id", "indicator");
        indicatorSpan.setAttribute("title", tooltip);

        // add location based on the option
        indicatorSpan.style.backgroundColor = match ? "green" : "red";

        document.body.appendChild(indicatorSpan);

    }

})();