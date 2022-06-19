import { User } from "@prisma/client";
import { userInfo } from "os";

interface Queue<T> {
    firstInQueue(): T | undefined;
    addToQueue(t: T): void;
}

export class TTTQueue implements Queue<User>{
    private queue: Array<User>;

    constructor() {
        this.queue = new Array<User>();
    }

    addToQueue(t: User): void {
        this.queue.push(t);
    }

    firstInQueue(): User | undefined {
        return this.queue.shift();
    }

    length(): number {
        return this.queue.length;
    }

    removeUserFromQueue(user: User) {
        let newQueue = this.queue.filter(u => u.username !== user.username);
        if (this.queue.length === newQueue.length) return;
        this.queue = newQueue;
        return user
    }
}