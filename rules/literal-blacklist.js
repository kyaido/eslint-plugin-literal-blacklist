'use strict';

module.exports = {
  meta: {
    schema: [
      {
        type: 'array',
        items: {
          oneOf: [
            {
              type: 'string',
            },
            {
              type: 'object',
              properties: {
                term: {
                  type: 'string',
                },
                message: {
                  type: 'string',
                },
                ignoreCase: {
                  type: "boolean",
                }
              },
              additionalProperties: false,
            },
          ],
        },
        uniqueItems: true,
      },
    ],
  },

  create: (context) => {
    let options = [];
    if (Array.isArray(context.options[0])) {
      options = context.options[0];
    }

    return {
      Literal: (node) => {
        options.forEach((option) => {
          const isStringOption = typeof option === 'string';
          const term = isStringOption ? option : option.term;
          const ignoreCase = option.ignoreCase || false;
          const value = ignoreCase ? String(node.value).toLowerCase() : String(node.value);

          if (value.indexOf(term) !== -1) {
            const message = option.message || `You should not use '${term}'.`;
            context.report({ node, message });
          }
        });
      },
    };
  },
};
