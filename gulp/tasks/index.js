const path = require("path");
const gulp = require("gulp");

const Tasks = {};

// Copy one dir's contents to another dir
Tasks.copy = function(from, to) {
    return function copyTask(cb) {
        gulp.src("**/*", { cwd: path.resolve(from) })
        .pipe(gulp.dest(to))
        cb();
    }
}

module.exports = Tasks;
