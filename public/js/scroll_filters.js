function scrollFilters(amount) {
    document.getElementById("filters").scrollBy({
        left: amount,
        behavior: "smooth"
    });
}