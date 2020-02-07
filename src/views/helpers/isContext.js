const _ = require('lodash');

const isContext = (option, viewdata) => {
  const { context } = viewdata.data.root;
  console.log(context);
  if (!_.isString(context)) {
    return viewdata.inverse(this);
  }

  if (_.isEqual(context, option)) {
    return viewdata.fn(this);
  }

  return viewdata.inverse(this);
};

module.exports = isContext;
