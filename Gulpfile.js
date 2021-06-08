const path = require("path");
const gulp = require("gulp");
const lazypipe = require("lazypipe");
const {is} = require("./gulp/util");

// Pre-defined gulp plugins
const rename = require("gulp-rename");
const gulpIf = require("gulp-if");

// Custom gulp plugins
const frontmatter = require("./gulp/frontmatter");
const layouts = require("./gulp/layouts");
const liquid = require("./gulp/liquid");
const remark = require("./gulp/remark");

const config = {
    input: "src",
    copy: "public",
    output: "dist"
}

function markup(cb) {
    gulp.src("**/*.{md,html}", {
        cwd: path.resolve(config.input),
        ignore: [
            path.resolve(config.input, "_layouts") + "/**/*",
            path.resolve(config.input, "_includes") + "/**/*"
        ]
    })
    .pipe(frontmatter())
    .pipe(gulpIf(is("markdown"), remark()))
    .pipe(layouts({
        dir: path.resolve(config.input, "_layouts"),
        ext: ".html"
    }))
    .pipe(liquid({
        root: [
            path.resolve(config.input, "_includes"),
        ],
        extname: ".html"
    }))
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest(config.output))
    cb();
}

function copy(cb) {
    gulp.src("**/*", { cwd: path.resolve(config.copy) })
    .pipe(gulp.dest(config.output))
    cb();
}

module.exports = {
    'start': markup,
    'build': gulp.parallel(copy, markup),
}
