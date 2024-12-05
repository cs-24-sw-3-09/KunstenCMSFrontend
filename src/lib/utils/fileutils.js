
export function mimeToType(mime) {
    if (mime === null) {
        return ".unknown"; // Default for unknown MIME types
    }

    switch (mime) {
        case "image/jpeg":
            return ".jpg";
        case "image/png":
            return ".png";
        case "image/gif":
            return ".gif";
        case "image/webp":
            return ".webp";
        case "image/bmp":
            return ".bmp";
        case "video/mp4":
            return ".mp4";
        default:
            return ".unknown"; // Default for unrecognized MIME types
    }
}