module.exports = function sanitize(input) {
    if (!input || typeof input !== "object") return input;

    const sanitized = {};

    for (const key in input) {
        // Skip prototype pollution attempts
        if (key === "__proto__" || key === "constructor") continue;

        const value = input[key];

        // Reject MongoDB operators: $gt, $ne, $regex etc.
        if (key.startsWith("$")) continue;

        // Reject dotted keys like "profile.password"
        if (key.includes(".")) continue;

        if (typeof value === "string") {
            // Remove $ and . from string values (safe but non-destructive)
            sanitized[key] = value.replace(/\$/g, "").replace(/\./g, "");
        }

        else if (typeof value === "object") {
            sanitized[key] = sanitize(value); // recursive
        }

        else {
            sanitized[key] = value;
        }
    }

    return sanitized;
};