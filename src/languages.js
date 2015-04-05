var raw = [
  {
    'begin': 'coffee-?(?:script)?',
    contentName: 'source.coffee'
  }, {
    'begin': '(?:javascript|js)',
    contentName: 'source.js'
  }, {
    'begin': '(?:markdown|mdown|md)',
    'name': 'markup.code.gfm',
    'include': '$self'
  }, {
    'begin': 'json',
    contentName: 'source.json'
  }, {
    'begin': 'css',
    contentName: 'source.css'
  }, {
    'begin': 'less',
    contentName: 'source.css.less'
  }, {
    'begin': 'xml',
    contentName: 'text.xml'
  }, {
    'begin': '(?:ruby|rb)',
    contentName: 'source.ruby'
  }, {
    'begin': 'java',
    contentName: 'source.java'
  }, {
    'begin': 'erlang',
    contentName: 'source.erlang'
  }, {
    'begin': 'go(?:lang)?',
    contentName: 'source.go'
  }, {
    'begin': 'cs(?:harp)?',
    contentName: 'source.cs'
  }, {
    'begin': 'php',
    contentName: 'source.php'
  }, {
    'begin': '(?:sh|bash)',
    contentName: 'source.shell'
  }, {
    'begin': 'py(?:thon)?',
    contentName: 'source.python'
  }, {
    'begin': 'c',
    contentName: 'source.c'
  }, {
    'begin': 'c(?:pp|\\\\+\\\\+)',
    contentName: 'source.cpp'
  }, {
    'begin': '(?:objc|objective-c)',
    contentName: 'source.objc'
  }, {
    'begin': 'haskell',
    contentName: 'source.haskell'
  }, {
    'begin': 'html',
    'name': 'markup.code.html.gfm',
    contentName: 'source.html.basic',
    'include': 'text.html.basic'
  },
  {
    'begin': '(?:la)?tex',
    'name': 'markup.code.latex.gfm',
    'include': 'text.tex.latex'
  }, {
    'begin': 'ya?ml',
    contentName: 'source.yaml'
  }, {
    'begin': 'elixir',
    contentName: 'source.elixir'
  }, {
    'begin': '(?:diff|patch|rej)',
    contentName: 'source.diff'
  }
];

//"^\\s*(((`|~){3,})\\s*(?:(?:(?:sh|bash))|(\\{.*\\.(?:sh|bash)[^\\}]*\\})))\\s*$"

var _ = require('lodash');

var template = _.template('{"begin":"^\\\\s*(((`|~){3,})\\\\s*(?:(?:<%= begin %>)|(\\\\{.*\\\\.<%= begin %>[^\\\\}]*\\\\}))\\\\s*)$","beginCaptures":{"1":{"name":"support.gfm"},"4":{"patterns":[{"include":"source.css.less"}]}},"end":"^\\\\s*\\\\2\\\\3*$","endCaptures":{"0":{"name":"support.gfm"}},"name":"<%= name %>","patterns":[{"include":"<%= include %>"}]}');

var template2 = _.template('{"match":"(`+)(.+)\\\\1\\\\s*(\\\\{.*\\\\.<%= begin %>[^\\\\}]*\\\\})","captures":{"2":{"patterns":[{"include":"<%= include %>"}]},"3":{"patterns":[{"include":"source.css.less"}]}},"name":"<%= name %>"}');


languages = _.flatten(_.map(raw, function(language) {
  if (!language.include) {
    language.include = language.contentName;
  }
  if (!language.name) {
    language.name = language.contentName.replace(/.+\./, '');
    language.name = 'markup.code.' + language.name + '.gfm'
  }

  var parsed = JSON.parse(template(language))
  var parsed2 = JSON.parse(template2(language))

  if (language.contentName) {
    parsed.contentName = language.contentName;
  }

  if (language.include === 'empty') {
    delete parsed.patterns;
    delete parsed2.patterns;
  }

  return [parsed, parsed2];
}))

raw = [
  {
    'begin': '^\\s*((`|~){3,})\\s*.*\\s*$',
    'beginCaptures': {
      '0': {
        'name': 'support.gfm'
      }
    },
    'end': '^\\s*\\1\\2*$',
    'endCaptures': {
      '0': {
        'name': 'support.gfm'
      }
    },
    'name': 'markup.raw.gfm'
  }, {
    'begin': '(`+)(?!$)',
    'end': '\\1',
    'name': 'markup.raw.gfm'
  }
];

module.exports = _.union(languages, raw)
