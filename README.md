Queue
=======

create a Queue for callbacks and call them all in order

```javascript
var Queue = require("@nathanfaucett/queue");


var queue = new Queue();


queue.enqueue(function() {
    console.log("called first");
});
queue.enqueue(function() {
    console.log("called second");
});

queue.notifyAll();
```
