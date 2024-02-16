export const subscribers = new Set();

export function subscribe(id) {
  subscribers.add(id);
}

export function unsubscribe(id) {
  subscribers.delete(id);
}
