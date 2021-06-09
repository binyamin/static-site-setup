# TagToken

## Example A
```ts
// "{% layout 'base' %}"
Tag {
  token: TagToken {
    kind: 4,
    input: "{% layout 'base' %}",
    begin: 0,
    end: 19,
    file: '',
    trimLeft: false,
    trimRight: false,
    content: "layout 'base'",
    name: 'layout',
    args: "'base'"
  },
  name: 'layout',
  impl: {
    liquid: Liquid {
      options: [Object],
      parser: [Parser],
      renderer: Render {},
      filters: [FilterMap],
      tags: [TagMap]
    },
    file: QuotedToken {
      kind: 1024,
      input: "'base'",
      begin: 0,
      end: 6,
      file: ''
    },
    hash: Hash { hash: {} },
    tpls: []
  }
}
```

## Example B
```ts
// "{% layout 'base' %}\nfoo"
Tag {
  token: TagToken {
    kind: 4,
    input: "{% layout 'base' %}\nfoo",
    begin: 0,
    end: 19,
    file: '',
    trimLeft: false,
    trimRight: false,
    content: "layout 'base'",
    name: 'layout',
    args: "'base'"
  },
  name: 'layout',
  impl: {
    liquid: Liquid {
      options: [Object],
      parser: [Parser],
      renderer: Render {},
      filters: [FilterMap],
      tags: [TagMap]
    },
    file: QuotedToken {
      kind: 1024,
      input: "'base'",
      begin: 0,
      end: 6,
      file: ''
    },
    hash: Hash { hash: {} },
    tpls: [ [HTML] ]
  }
}
```

### Example B (1)
```ts
// Above, impl.tpls[]
[
  HTML {
    token: HTMLToken {
      kind: 16,
      input: "{% layout 'base' %}\nfoo",
      begin: 19,
      end: 23,
      file: '',
      trimLeft: 0,
      trimRight: 0
    },
    str: '\nfoo'
  }
]
```

## Example C
```ts
// "foo"
HTML {
  token: HTMLToken {
    kind: 16,
    input: 'foo',
    begin: 0,
    end: 3,
    file: '',
    trimLeft: 0,
    trimRight: 0
  },
  str: 'foo'
}
```

## Example D
```ts
// "Hi, my name is {{name}}."
// 1
 HTML {
  token: HTMLToken {
    kind: 16,
    input: 'Hi, my name is {{name}}.',
    begin: 0,
    end: 15,
    file: '',
    trimLeft: 0,
    trimRight: 0
  },
  str: 'Hi, my name is '
}
// 2
 Output {
  token: OutputToken {
    kind: 8,
    input: 'Hi, my name is {{name}}.',
    begin: 15,
    end: 23,
    file: '',
    trimLeft: false,
    trimRight: false,
    content: 'name'
  },
  value: Value { filters: [], initial: Expression { postfix: [Array] } }
}
// 3
 HTML {
  token: HTMLToken {
    kind: 16,
    input: 'Hi, my name is {{name}}.',
    begin: 23,
    end: 24,
    file: '',
    trimLeft: 0,
    trimRight: 0
  },
  str: '.'
}

