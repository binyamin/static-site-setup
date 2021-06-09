const Lib = require("liquidjs");

const engine = new Lib.Liquid({
    root: ["../src", "../src/includes", "../src/layouts"],
    dynamicPartials: true,
    extname: ".html",
    globals: {
        name: "Bob"
    }
});

const tmpl = engine.parse("{% layout 'base' %}\nfoo {{name}}");

const tzr = new Lib.Tokenizer("{% layout 'base' %}", engine.options.operatorsTrie);

// engine.parseFile("layout.md").then(res => {
//     res[0].impl.tpls[1].impl.tpls.forEach(v => {
//         console.log("===");
//         console.log(v);
//     })
// }).catch(err => {
//     throw new Error(err);
// })
