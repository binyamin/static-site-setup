# Token Examples

## Output Token

- `{{name}}`

```ts
Output {
  token: OutputToken {
    kind: 8,
    input: '{{name}}',
    begin: 0,
    end: 8,
    file: '',
    trimLeft: false,
    trimRight: false,
    content: 'name'
  },
  value: Value { filters: [], initial: [Expression] }
}
```

## HTML Token

- `foo`

```ts
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

## Tag Token (if/else)

- `token` property in `{% if name %}name{% else %}no name{% endif %}`

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
