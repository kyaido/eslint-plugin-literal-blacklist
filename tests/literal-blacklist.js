'use strict';

const RuleTester = require('eslint').RuleTester;
const tester = new RuleTester();

tester.run('literal-blacklist', require('../rules/literal-blacklist'), {
  valid: [
    { code: 'var https = "https:";', options: [['http:']] },
    { code: 'var http = "https:";', options: [['http:']] },
    { code: 'var http = "http:";', options: [['^https:']] },
    { code: 'http();', options: [['http:']] },
    {
      code: 'var https = "HTTPS:";',
      options: [
        [
          {
            term: 'http:',
            ignoreCase: true,
          },
        ],
      ],
    },
  ],
  invalid: [
    {
      code: 'var http = "http://example.com";',
      options: [['http:']],
      errors: [`You should not use 'http:'.`],
    },
    {
      code: 'var http = "http://example.com";',
      options: [['^http']],
      errors: [`You should not use '^http'.`],
    },
    {
      code: 'var http = "http://example.com";',
      options: [['^http://example.com$']],
      errors: [`You should not use '^http://example.com$'.`],
    },
    {
      code: 'document.body.innerHTML("<script src=\'http://example.com\'></script>");',
      options: [['http:']],
      errors: [`You should not use 'http:'.`],
    },
    {
      code: 'var obj = { url: "http://example.com" };',
      options: [['http:']],
      errors: [`You should not use 'http:'.`],
    },
    {
      code: 'var arr = [ "https://example.com", "http://example.com" ];',
      options: [['http:']],
      errors: [`You should not use 'http:'.`],
    },
    {
      code: '(function() { return "http://example.com" })();',
      options: [['http:']],
      errors: [`You should not use 'http:'.`],
    },
    {
      code: 'var http = "http://example.com";',
      options: [
        [
          {
            term: 'http:',
            message: `You should use 'https:' instead of 'http:.'`,
          },
        ],
      ],
      errors: [`You should use 'https:' instead of 'http:.'`],
    },
    {
      code: 'var http = "HTTP://example.com";',
      options: [
        [
          {
            term: 'http:',
            ignoreCase: true,
          },
        ],
      ],
      errors: [`You should not use 'http:'.`],
    },
    {
      code: 'var http = "HTTP://example.com";',
      options: [
        [
          {
            term: '^http:',
            ignoreCase: true,
          },
        ],
      ],
      errors: [`You should not use '^http:'.`],
    },
    {
      code: 'var http = "HTTP://example.com";',
      options: [
        [
          {
            term: 'http:',
            message: `You should use 'https:' instead of 'http:.'`,
            ignoreCase: true,
          },
        ],
      ],
      errors: [`You should use 'https:' instead of 'http:.'`],
    },
    {
      code: 'var http = "HTTP://EXAMPLE.com";',
      options: [
        [
          {
            term: 'http:',
            message: `You should use 'https:' instead of 'http:.'`,
            ignoreCase: true,
          },
          'EXAMPLE',
        ],
      ],
      errors: [
        `You should use 'https:' instead of 'http:.'`,
        `You should not use 'EXAMPLE'.`,
      ],
    },
  ],
});
