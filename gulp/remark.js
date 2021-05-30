const remark = require("gulp-remark");

const html = require("remark-html");
const gfm = require("remark-gfm");

module.exports = () => {
    return remark()
        .use(gfm)
        .use(html)
};
