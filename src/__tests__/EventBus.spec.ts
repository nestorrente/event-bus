import EventBus from '../EventBus';

test('Triggering an event before registering any listener has no effect', () => {

    const eventBus = new EventBus();
    const listener = jest.fn();

    eventBus.trigger('my-event');
    eventBus.on('my-event', listener);

    expect(listener).not.toHaveBeenCalled();

});

test('Triggering an event when a listener is registered invokes the listener', () => {

	const eventBus = new EventBus();
	const listener = jest.fn();

	eventBus.on('my-event', listener);

	eventBus.trigger('my-event');

	expect(listener).toHaveBeenCalledTimes(1);

});

test('Triggering an event when several listeners are registered invokes the listeners', () => {

	const eventBus = new EventBus();
	const listener1 = jest.fn();
	const listener2 = jest.fn();
	const listener3 = jest.fn();

	eventBus.on('my-event', listener1);
	eventBus.on('my-event', listener2);
	eventBus.on('my-event', listener3);

	eventBus.trigger('my-event');

	expect(listener1).toHaveBeenCalledTimes(1);
	expect(listener2).toHaveBeenCalledTimes(1);
	expect(listener3).toHaveBeenCalledTimes(1);

});

test('Triggering an event with parameters invokes its listeners with those parameters', () => {

	const eventBus = new EventBus();
	const listener = jest.fn();

	eventBus.on('my-event', listener);

	eventBus.trigger('my-event', 1, 2, 3);

	expect(listener).toHaveBeenCalledTimes(1);
	expect(listener).toHaveBeenCalledWith(1, 2, 3);

});

test('A listener registered with on() can be executed several times', () => {

	const eventBus = new EventBus();
	const listener = jest.fn();

	eventBus.on('my-event', listener);

	eventBus.trigger('my-event');
	eventBus.trigger('my-event');
	eventBus.trigger('my-event');

	expect(listener).toHaveBeenCalledTimes(3);

});

test('A listener registered with once() will be executed at most once', () => {

	const eventBus = new EventBus();
	const listener = jest.fn();

	eventBus.once('my-event', listener);

	eventBus.trigger('my-event', 1);
	eventBus.trigger('my-event', 2);
	eventBus.trigger('my-event', 3);

	expect(listener).toHaveBeenCalledTimes(1);
	expect(listener).toHaveBeenCalledWith(1);

});

test('A listener registered with on() can be cancelled by calling off()', () => {

	const eventBus = new EventBus();
	const listener = jest.fn();

	eventBus.on('my-event', listener);
	eventBus.off('my-event', listener);

	eventBus.trigger('my-event');

	expect(listener).not.toHaveBeenCalled();

});

test('A listener registered with once() can be cancelled by calling off()', () => {

	const eventBus = new EventBus();
	const listener = jest.fn();

	eventBus.once('my-event', listener);
	eventBus.off('my-event', listener);

	eventBus.trigger('my-event');

	expect(listener).not.toHaveBeenCalled();

});

test('Unregistering one listener does not affect other listeners of the same event', () => {

	const eventBus = new EventBus();
	const listener1 = jest.fn();
	const listener2 = jest.fn();
	const listener3 = jest.fn();

	eventBus.on('my-event', listener1);
	eventBus.on('my-event', listener2);
	eventBus.on('my-event', listener3);
	eventBus.off('my-event', listener3);

	eventBus.trigger('my-event');

	expect(listener1).toHaveBeenCalledTimes(1);
	expect(listener2).toHaveBeenCalledTimes(1);
	expect(listener3).not.toHaveBeenCalled();

});

test('Calling off() without any specific listener removes all the listeners for the event', () => {

	const eventBus = new EventBus();
	const listener1 = jest.fn();
	const listener2 = jest.fn();
	const listener3 = jest.fn();

	eventBus.on('my-event', listener1);
	eventBus.on('my-event', listener2);
	eventBus.once('my-event', listener3);

	eventBus.off('my-event');

	eventBus.trigger('my-event');

	expect(listener1).not.toHaveBeenCalled();
	expect(listener2).not.toHaveBeenCalled();
	expect(listener3).not.toHaveBeenCalled();

});

test('An error in a listener does not affect others', () => {

	const originalConsoleError = global.console.error;

	try {

		const mockConsoleError = global.console.error = jest.fn();

		const eventBus = new EventBus();

		const listener1 = jest.fn();
		const listener2 = jest.fn();
		const listener3 = jest.fn();

		const testError = new Error('Test error');

		listener2.mockImplementation(() => {
			throw testError;
		});

		eventBus.on('my-event', listener1);
		eventBus.on('my-event', listener2);
		eventBus.once('my-event', listener3);

		eventBus.trigger('my-event');

		expect(listener1).toHaveBeenCalled();
		expect(listener2).toHaveBeenCalled();
		expect(listener3).toHaveBeenCalled();
		expect(mockConsoleError).toHaveBeenCalledWith(testError);

	} finally {
		global.console.error = originalConsoleError;
	}

});
