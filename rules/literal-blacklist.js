'use strict';

module.exports = function(context) {

  let options = [];
  if (Array.isArray(context.options[0])) {
    options = context.options[0];
  }

  return {
    'Literal': node => {
      let message = null;
      let value = String(node.value);

      options.forEach(option => {
        if(value.indexOf(option) !== -1) {
          message = `You should not use "${option}".`;
          context.report({node: node, message: message});
        }
      });
    }
  };
};

module.exports.schema = [{
  type: 'array',
  items: { type: 'string' },
  uniqueItems: true
}];
