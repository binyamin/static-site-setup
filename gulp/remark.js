const remark = require("gulp-remark");

const gfm = require("remark-gfm");
const remark2rehype = require("remark-rehype");
const html = require("rehype-stringify");

module.exports = () => {
    return remark()
        .use(gfm)
        .use(remark2rehype)
        .use(html)
};
