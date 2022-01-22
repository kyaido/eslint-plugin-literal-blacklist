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
              required: ['term'],
              properties: {
                term: {
                  type: 'string',
                },
                message: {
                  type: 'string',
                },
                ignoreCase: {
                  type: 'boolean',
                },
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
          const targetLiteral = String(node.value);
          const term = option.term || option;
          const addFlag = option.ignoreCase ? 'i' : '';

          if (targetLiteral.match(new RegExp(term, 'u' + addFlag))) {
            const message = option.message || `You should not use '${term}'.`;
            context.report({ node, message });
          }
        });
      },
    };
  },
};
