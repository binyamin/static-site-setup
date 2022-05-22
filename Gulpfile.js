const path = require("path");
const gulp = require("gulp");
const lazypipe = require("lazypipe");
const {is} = require("./gulp/tasks/util");

const tasks = require("./gulp/tasks");

// Pre-defined gulp plugins
const rename = require("gulp-rename");
const gulpIf = require("gulp-if");

// Custom gulp plugins
const frontmatter = require("./gulp/plugins/front-matter");
const layouts = require("./gulp/plugins/layouts-fm");
const liquid = require("@gulp-community/liquidjs");
const remark = require("./gulp/plugins/md-engine");

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

const copy = tasks.copy(config.copy, config.output);

module.exports = {
    'start': markup,
    'build': gulp.parallel(copy, markup),
}
