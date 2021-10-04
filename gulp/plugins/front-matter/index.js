const deepmerge = require("deepmerge");
const grayMatter = require("gray-matter");
const PluginError = require("plugin-error");
const through = require("through2");

// Goal: pass yaml front-matter to gulp

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

    // We're done with setting-up the plugin.
    const matter = grayMatter(String(chunk.contents), /*options*/);
    chunk.contents = Buffer.from(matter.content);
    chunk.data = deepmerge(chunk.data || {}, matter.data);
    callback(null, chunk)
}

module.exports = function(options) {
    return through.obj(transformChunk)
}
