"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTTQueue = void 0;
class TTTQueue {
    constructor() {
        this.queue = new Array();
    }
    addToQueue(t) {
        this.queue.push(t);
    }
    firstInQueue() {
        return this.queue.shift();
    }
    length() {
        return this.queue.length;
    }
    removeUserFromQueue(user) {
        let newQueue = this.queue.filter(u => u.username !== user.username);
        if (this.queue.length === newQueue.length)
            return;
        this.queue = newQueue;
    }
}
exports.TTTQueue = TTTQueue;
