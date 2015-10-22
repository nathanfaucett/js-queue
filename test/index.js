var tape = require("tape"),
    Queue = require("..");


tape("Queue: should enqueue callbacks and call all in order when notifyAll() is called", function(assert) {
    var queue = Queue.getPooled(),
        called0 = false,
        called1 = false;

    queue.enqueue(function() {
        called0 = true;
    });

    queue.enqueue(function() {
        called1 = true;
    });

    queue.notifyAll();

    assert.equal(called0, true);
    assert.equal(called1, true);

    assert.end();
});
