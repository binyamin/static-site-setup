const remark = require("gulp-remark");

const gfm = require("remark-gfm");
const highlight = require("rehype-highlight");
const html = require("rehype-stringify");
const raw = require("rehype-raw");
const remark2rehype = require("remark-rehype");

module.exports = () => {
    return remark()
        .use(gfm)
        .use(remark2rehype, {allowDangerousHtml: true})
        .use(raw)
        .use(highlight)
        .use(html)
};
