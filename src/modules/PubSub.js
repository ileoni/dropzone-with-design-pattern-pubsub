export const pubsub = {
    subscribes: {},
    subscribe(action, fn) {
        if(Array.isArray(this.subscribes[action])) {
            this.subscribes[action] = [...this.subscribes[action], fn]
        } else {
            this.subscribes[action] = [fn];
        }
    },
    unsubescribe(action, fn) {
        this.subscribes[action] = this.subscribes[action].filter(fun => fun !== fn);
    },
    publish(action, data) {
        if(Array.isArray(this.subscribes[action])) {
            this.subscribes[action].map(fun => fun(data));
        }
        return false;
    }
}