// context.spec.js (for context.js)
const gremlins = require('gremlins.min.js'); // Import the module from node_modules
jest.mock('./gremlins.min.js'); // Mock the gremlins.min.js module

describe('context.js', () => {
  let context;

  beforeEach(() => {
    context = require('./context.js'); // Import the context.js module
  });

  it('should log "Gremlins.min.js loaded"', () => {
    expect(console.log).toHaveBeenCalledWith('Gremlins.min.js loaded');
  });

  it('should start Gremlins.js horde with specified attack duration', () => {
    const attackDuration = 30; // Example duration

    context.startGremlins(attackDuration);

    expect(console.log).toHaveBeenCalledWith('Starting Gremlins.js horde on webpage');
    expect(console.log).toHaveBeenCalledWith('Gremlins.js horde started');
  });

  it('should stop Gremlins.js horde', () => {
    context.horde = { stop: jest.fn() }; // Mock the horde object
    context.attackTimeout = jest.fn(); // Mock the attackTimeout

    context.stopGremlins();

    expect(context.horde.stop).toHaveBeenCalled();
    expect(clearTimeout).toHaveBeenCalledWith(context.attackTimeout);
    expect(console.log).toHaveBeenCalledWith('Gremlins.js horde stopped');
  });

  it('should configure specific attacks', () => {
    const attackType = 'clicker'; // Example attack type

    context.configureAttack(attackType);

    expect(context.horde.stop).toHaveBeenCalled();
    expect(context.horde.unleash).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(`Gremlins.js ${attackType} attack configured and started`);
  });

  it('should handle incoming messages correctly', () => {
    const message = { command: 'startGremlins', attackDuration: 15 }; // Example message

    context.chrome = {
      runtime: {
        onMessage: {
          addListener: jest.fn()
        }
      }
    };

    context.chrome.runtime.onMessage.addListener(jest.fn());

    context.handleIncomingMessage(message);

    expect(context.chrome.runtime.onMessage.addListener).toHaveBeenCalledWith(
      expect.any(Function)
    );
  });
});
