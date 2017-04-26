const assert = require('assert');
const db = require('../components/database');

describe('components/database.js', function() {
  it('should start with empty messages array', function() {
    assert.deepEqual(db.all(), []);
  });

  it('should push message to array, when given message', function() {
    db.insert('test message');
    assert.deepEqual(db.all(), ['test message']);
  });
});
