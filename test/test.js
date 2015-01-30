var assert = require("assert"),
    Queue = require("../src/index");


describe("Queue", function() {
    it("should enqueue callbacks and call all in order when notifyAll(callback) is called", function(done) {
        var queue = new Queue();

        queue.enqueue(function(next) {
            assert.equal(this.key, "value");
            next();
        }, {
            key: "value"
        });

        queue.enqueue(function() {
            assert.equal(this.key, "value");
        }, {
            key: "value"
        });

        queue.notifyAll(done);
    });
});
