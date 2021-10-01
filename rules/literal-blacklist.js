'use strict';

module.exports = {
  meta: {
    schema: [
      {
        type: "object",
        properties: {
          ignoreCase: {
            type: "boolean",
            default: false,
          },
          literals: {
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
        },
        additionalProperties: false,
      },
    ],
  },

  create: (context) => {
    const options = context.options[0] || {}, ignoreCase = options.ignoreCase || false;
    let literalOptions = [];
    if (Array.isArray(options.literals)) {
      literalOptions = options.literals;
    }

    return {
      Literal: (node) => {
        const value = ignoreCase ? String(node.value).toLowerCase() : String(node.value);

        literalOptions.forEach((option) => {
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
