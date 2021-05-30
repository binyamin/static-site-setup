# Migration

## Tasks

<!-- - _core_: Necessary for project to be complete
- _feat_: Useful idea, added bonus, cool feature
- _bug_: Something broke (if there's no workaround, it's also _core_) -->

### Backlog
- `#core` Replace markdown-it plugins with [remark plugins](https://github.com/remarkjs/remark/blob/HEAD/doc/plugins.md) (or rehype, for html transforms)
- `#feat` might want to use https://www.npmjs.com/package/gulp-newer
- `#feat` Read "layout" frontmatter key when rendering liquid templates
### Complete
- `#core` Parse file front-matter (html _and_ md)
- `#core #internal` Gulpfile should differentiate by file-type
- `#core` static assets pipeline
- `#core` liquid layouts & includes
- `#feat` Use remark-rehype instead of remark-html (see [this readme note](https://github.com/remarkjs/remark-html))

## Depends
- [liquidjs](https://github.com/harttle/liquidjs/) for templating engine (see also [gulp-nunjucks](https://github.com/sindresorhus/gulp-nunjucks))
- [gulp-remark](https://github.com/remarkjs/gulp-remark) for converting markdown to html, via [remark](https://github.com/remarkjs/remark)
- [graymatter](https://github.com/jonschlinkert/gray-matter) for frontmatter parsing
- [gulp-data](https://github.com/colynb/gulp-data) for injecting data with gulp
