# mozaik-ext-table

> [Mozaik v2](https://github.com/plouc/mozaik/tree/v2.x) extension to
render table data given a filesystem path available to the Mozaik server
or a network accessible url.

## Setup

- Installation

```bash
npm install --save mozaik-ext-table
```

- Sample Usage

```yaml
  -
    extension:      table
    widget:         Table
    title:          Ongoing Projects
    fields:
      -
        Project:    '{project}'
      -
        Lead:       '{lead}'
      -
        Developers: '{devs}'
      -
        QA:         '{tester}'
    path:           data/ongoing-projects.json
    columns:        3
    rows:           2
    x:              1
    y:              1
```

## Configuration

key           | required | description
--------------|----------|---------------
`widget`      | yes      | `Table` - only available widget
`title`       | yes      | Unless the lame default "Table" works for you
`fields`      | yes      | Array of per field column headers to corresponding [field value formats](https://www.npmjs.com/package/string-format)
`path`        | no\*     | File system path to table data accessible to the Mozaik server (supports JSON and CSV)
`url`         | no\*     | URL under which JSON data is accessible

\* Either `path` or `url` must be supplied

## Changelog

### Release 0.0.1

- Initial release

## License

Module is MIT -licensed

## Credit

The repo initially started as a fork of
[mozaik-ext-sheets](https://github.com/SC5/mozaik-ext-sheets).
The initial release was updated to work with custom
JSON or CSV data as part of Mozaik 2.

