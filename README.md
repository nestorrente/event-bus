# EventBus

This class allows you to trigger and listen events in JavaScript and TypeScript.

## Table of contents

+ **[Installation](#installation)**
    + **[Using NPM](#using-npm)**
    + **[Using `<script>` tag](#using-script-tag)**
+ **[Usage](#usage)**
+ **[Method reference](#method-reference)**
    + **[on()](#on)**
    + **[off()](#off)**
    + **[once()](#once)**
    + **[trigger()](#trigger)**

## Installation

### Using NPM

Install latest stable version...

```bash
npm install --save @nestorrente/event-bus
```

... then import it in your modules:

```javascript
import EventBus from '@nestorrente/event-bus';
```

### Using `<script>` tag

You can [download latest version from here](https://combinatronics.com/nestorrente/event-bus/master/dist/event-bus.js). Then, you can use it as any other JavaScript file:

```html
<script src="event-bus.js"></script>
```

## Usage

```javascript
const eventBus = new EventBus();

eventBus.on('my-event', (param1, param2) => {
    console.log(`Event received with params "${param1}" and "${param2}"`);
});

eventBus.trigger('my-event', 1, 'two');
// console will display:
// > Event received with params "1" and "two"

// You can also chain method calls
eventBus.on('my-event', () => { /* do nothing */ })
        .trigger('my-event')
        .off('my-event');
```

## Method reference

### on()

```typescript
on(event: string, listener: (...args: any[]) => void): EventBus;
```

Registers an event handler function for the specified event.

**Usage example:**

```javascript
eventBus.on('my-event', (param1, param2, /* ... more params... */) => {
    // ... handle event...
});
```

### off()

```typescript
off(event: string, listener?: (...args: any[]) => void): EventBus;
```

Unregisters an event handler for the specified event.

If `listener` parameter is not specified, all event handlers registered for the specified event are unregistered.

**Usage example:**

```javascript
// Define an event handler...
const myEventHandler = () => {
    console.log('Event triggered');
};

// ... register it on the bus...
eventBus.on('my-event', myEventHandler);

// ... then remove it
eventBus.off('my-event', myEventHandler);

// This will remove all registered event handlers for 'my-event'
eventBus.off('my-event');
```

### once()

```typescript
once(event: string, listener: (...args: any[]) => void): EventBus;
```

Registers an event handler function that will be called at most once for the specified event.

This method receives the same parameters as [`on()`](#on).

**Usage example:**

```javascript
eventBus.once('my-event', (param1, param2, /* ... more params... */) => {
    // ... handle event...
});
```

### trigger()

```typescript
trigger(event: string, ...eventParameters: any[]): EventBus;
```

Invokes all event handlers registered for the specified event. You can pass any number of parameters of any type.

**Usage example:**

```javascript
// Without parameters
eventBus.trigger('my-event');

// With 4 parameters (number, boolean, string and array)
eventBus.trigger('my-event', 42, true, 'OMG', ['this', 'is', 'cool']);
```
