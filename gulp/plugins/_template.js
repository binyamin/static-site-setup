const path = require("path");

const PluginError = require("plugin-error");
const through = require("through2");
const vinyl = require("vinyl");

// you might want `gulplog` for logging stuff in gulp-style

// TODO store user-defined options

const PLUGIN_NAME = (
    path.basename(__dirname) + "/" + path.basename(__filename, ".js")
);

module.exports = function(options) {
    return through.obj(transformChunk)
}

/**
 * @param {import("vinyl")} chunk also called "file"
 * @param {BufferEncoding} encoding
 * @param {through.TransformCallback} callback
 */
function transformChunk(chunk, encoding, callback) {
    if(chunk.isNull()) {
        callback(null, chunk);
        return;
    }
    if (chunk.isStream()) {
        callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
        return;
    }
}
