const messages = [];

exports.all = function all() {
  return messages;
};

exports.insert = function insert(message) {
  messages.push(message);
};
