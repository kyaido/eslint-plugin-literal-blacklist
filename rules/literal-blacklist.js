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
        const value = String(node.value);

        options.forEach((option) => {
          const isStringOption = typeof option === 'string';
          const term = isStringOption ? option : option.term;

          if (value.indexOf(term) !== -1) {
            const message = isStringOption
              ? `You should not use '${term}'.`
              : option.message;
            context.report({ node, message });
          }
        });
      },
    };
  },
};
