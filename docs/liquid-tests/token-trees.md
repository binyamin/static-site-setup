# Token Trees

Combinations of tokens

## 1. If/Else

```ts
Tag {
  token: TagToken, // See §1.1
  name: 'if',
  impl: {
    liquid: Liquid {
      options: [Object],
      parser: [Parser],
      renderer: Render {},
      filters: [FilterMap],
      tags: [TagMap]
    },
    branches: [ [Object] ],
    elseTemplates: [ [HTML] ]
  }
}
```

### 1.1 If/Else TagToken

```ts
TagToken {
  kind: 4,
  input: '{% if name %}name{% else %}no name{% endif %}',
  begin: 0,
  end: 13,
  file: '',
  trimLeft: false,
  trimRight: false,
  content: 'if name',
  name: 'if',
  args: 'name'
}
```

## 2. file "layout.md"

```ts
Tag {
  token: TagToken, // See §2.1
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
      input: "'default'",
      begin: 0,
      end: 9,
      file: ''
    },
    hash: Hash { hash: {} },
    tpls: [ [HTML], [Tag], [HTML] ] // See §2.2, 2.3, 2.4
  }
}
```

### 2.1 Layout TagToken (outer)
```ts
TagToken {
  kind: 4,
  input: "{% layout 'default' %}\n" +
    '\n' +
    '{% block content %}\n' +
    'I use a layout\n' +
    '{% endblock %}\n',
  begin: 0,
  end: 22,
  file: '/home/binyamin/Coding/static-site-setup/src/layout.md',
  trimLeft: false,
  trimRight: false,
  content: "layout 'default'",
  name: 'layout',
  args: "'default'"
}
```

### 2.2 Layout HTMLToken (middle 1)

- `impl.tpls[0]`
```ts
HTML {
  token: HTMLToken {
    kind: 16,
    input: "{% layout 'default' %}\n" +
      '\n' +
      '{% block content %}\n' +
      'I use a layout\n' +
      '{% endblock %}\n',
    begin: 22,
    end: 24,
    file: '/home/binyamin/Coding/static-site-setup/src/layout.md',
    trimLeft: 0,
    trimRight: 0
  },
  str: '\n\n'
}
```

### 2.3 Layout TagToken (middle)

- `impl.tpls[1]`
```ts
Tag {
  token: TagToken {
    kind: 4,
    input: "{% layout 'default' %}\n" +
      '\n' +
      '{% block content %}\n' +
      'I use a layout\n' +
      '{% endblock %}\n',
    begin: 24,
    end: 43,
    file: '/home/binyamin/Coding/static-site-setup/src/layout.md',
    trimLeft: false,
    trimRight: false,
    content: 'block content',
    name: 'block',
    args: 'content'
  },
  name: 'block',
  impl: {
    liquid: Liquid {
      options: [Object],
      parser: [Parser],
      renderer: Render {},
      filters: [FilterMap],
      tags: [TagMap]
    },
    block: 'content',
    tpls: [ [HTML] ] // See §2.5
  }
}
```

### 2.4 Layout HTMLToken (middle 2)

- `impl.tpls[2]`
```ts
HTML {
  token: HTMLToken {
    kind: 16,
    input: "{% layout 'default' %}\n" +
      '\n' +
      '{% block content %}\n' +
      'I use a layout\n' +
      '{% endblock %}\n',
    begin: 73,
    end: 74,
    file: '/home/binyamin/Coding/static-site-setup/src/layout.md',
    trimLeft: 0,
    trimRight: 0
  },
  str: '\n'
}
```

### 2.5 Layout HTMLToken (inner)

- `impl.tpls[1].impl.tpls[0]`
```ts
HTML {
  token: HTMLToken {
    kind: 16,
    input: "{% layout 'default' %}\n" +
      '\n' +
      '{% block content %}\n' +
      'I use a layout\n' +
      '{% endblock %}\n',
    begin: 43,
    end: 59,
    file: '/home/binyamin/Coding/static-site-setup/src/layout.md',
    trimLeft: 0,
    trimRight: 0
  },
  str: '\nI use a layout\n'
}
```
