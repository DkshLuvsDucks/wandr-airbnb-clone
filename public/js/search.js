document.addEventListener("DOMContentLoaded", () => {
    const listings = window.LISTINGS_DATA || [];
    const searchInput = document.getElementById("searchInput");

    if (!searchInput || !listings.length) return;

    const fuse = new Fuse(listings, {
        keys: ["title", "location", "country"],   // filter by all 3
        threshold: 0.32,
        includeMatches: true
    });

    const wrappers = document.querySelectorAll(".listing-wrapper");

    const noResultsBox = document.createElement("div");
    noResultsBox.id = "no-results-box";
    noResultsBox.style.display = "none";
    noResultsBox.style.textAlign = "center";
    noResultsBox.style.padding = "40px 0";
    noResultsBox.style.fontSize = "1.2rem";
    noResultsBox.style.color = "#777";
    noResultsBox.innerText = "No results found";
    const listingsContainer = document.querySelector(".container.pb-5.mt-5 .row");
    listingsContainer.parentNode.insertBefore(noResultsBox, listingsContainer);

    function highlightText(text, matches) {
        if (!matches || matches.length === 0) return text;

        let result = "";
        let lastIndex = 0;

        matches[0].indices.forEach(([start, end]) => {
            result += text.slice(lastIndex, start);
            result += `<mark>${text.slice(start, end + 1)}</mark>`;
            lastIndex = end + 1;
        });

        result += text.slice(lastIndex);
        return result;
    }

    wrappers.forEach(wrap => {
        const titleEl = wrap.querySelector(".card-title");
        if (titleEl) titleEl.dataset.original = titleEl.textContent;
    });

    const filterDOM = (results) => {
        const matchedIDs = new Set(results.map(r => r.item._id));
        const totalMatches = results.length;

        // toggle no results box
        if (searchInput.value.trim() && totalMatches === 0) {
            noResultsBox.style.display = "block";
        } else {
            noResultsBox.style.display = "none";
        }

        wrappers.forEach(wrap => {
            const id = wrap.getAttribute("data-id");
            const titleEl = wrap.querySelector(".card-title");

            // reset all when input empty
            if (!searchInput.value.trim()) {
                wrap.style.display = "";
                if (titleEl) titleEl.innerHTML = titleEl.dataset.original;
                return;
            }

            if (matchedIDs.has(id)) {
                wrap.style.display = "";

                const result = results.find(r => r.item._id === id);

                const titleMatches = result.matches?.filter(m => m.key === "title");

                titleEl.innerHTML = highlightText(result.item.title, titleMatches);

            } else {
                wrap.style.display = "none";
            }
        });
    };

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim();

        if (!query) {
            filterDOM([]);
            return;
        }

        const results = fuse.search(query);
        filterDOM(results);
    });
});
