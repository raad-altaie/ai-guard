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

    // Create the indicator dot
    const indicator = document.createElement("div");
    indicator.style.position = "fixed";
    indicator.style.top = "10px";
    indicator.style.right = "10px";
    indicator.style.width = "20px";
    indicator.style.height = "20px";
    indicator.style.borderRadius = "50%";
    indicator.style.backgroundColor = match ? "green" : "red";
    indicator.style.zIndex = "99999";
    indicator.style.boxShadow = "0 0 6px rgba(0,0,0,0.3)";
    indicator.title = tooltip;

    document.body.appendChild(indicator);
})();