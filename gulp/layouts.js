const fs = require("fs/promises");
const path = require("path");

const PluginError = require("plugin-error");
const through = require("through2");

const PLUGIN_NAME = (
    path.basename(__dirname) + "/" + path.basename(__filename, ".js")
);

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

    if(chunk.data.layout) {
        let layoutPath = path.join(ldir, chunk.data.layout)
        if(path.extname(chunk.data.layout) === "") layoutPath += ext;

        fs.readFile(layoutPath)
        .then(value => {
            const layout = value.toString();
            const template = chunk.contents.toString();
            const final = layout.replace(/{{\s?content\s?}}/, template);
            chunk.contents = Buffer.from(final);
            callback(null, chunk);
        })
        .catch(err => {
            callback(new PluginError(PLUGIN_NAME, err))
        })
        return
    }
    callback(null, chunk)
    return
}

let ldir, ext;

/**
 *
 * @param {Object} config
 * @param {string} config.dir - path to the layout directory
 * @param {string} [config.ext] - Used when the layout key is missing a file extension. (default: ".html")
 * @returns
 */

module.exports = function(config) {
    ldir = config.dir;
    ext = config.ext || ".html";
    return through.obj(transformChunk)
}
