module.exports = Queue;


function Queue() {
    this.__callbacks = [];
    this.__contexts = [];
}

Queue.prototype.enqueue = function(callback, context) {
    var contexts = this.__contexts,
        callbacks = this.__callbacks;

    callbacks[callbacks.length] = callback;
    contexts[contexts.length] = context;

    return this;
};

Queue.prototype.notifyAll = function(callback) {
    var contexts = this.__contexts,
        callbacks = this.__callbacks,
        index = 0,
        length = callbacks.length,
        called = false;

    function done(err) {
        contexts.length = 0;
        callbacks.length = 0;
        callback(err);
    }

    (function next(err) {
        var fn, i;

        if (called === true) {
            return;
        }

        if (err || index === length) {
            called = true;
            done(err);
            return;
        }

        i = index;
        fn = callbacks[i];

        index += 1;

        if (fn.length !== 0) {
            fn.call(contexts[i], next);
        } else {
            fn.call(contexts[i]);
            next();
        }
    }());

    return this;
};

Queue.prototype.reset = function() {

    this.__callbacks.length = 0;
    this.__contexts.length = 0;

    return this;
};
