function is(fileType) {
    let extList = [];
    switch (fileType) {
        case 'markdown':
        case 'md':
            extList.push("md", "markdown", "mkd")
            break;
        case 'html':
            extList.push("html", "htm")
            break;
        default:
            throw new Error("file-type not recognized")
            break;
    }

    extList = extList.map(e => "." + e);
    return ((file) => extList.includes(file.extname))
}

module.exports = {
    is
}
