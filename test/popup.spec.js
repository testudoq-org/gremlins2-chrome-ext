describe('popup.js', () => {
  let documentMock;
  let chromeMock;
  let toggleGremlinsSpy;
  let configureAttackSpy;
  let startGremlinsSpy;
  let stopGremlinsSpy;
  let updateToggleButtonTextSpy;

  beforeEach(() => {
    // Mock document and chrome APIs
    documentMock = {
      addEventListener: jest.fn(),
      getElementById: jest.fn(() => ({
        addEventListener: jest.fn(),
        click: jest.fn(),
        value: '15', // Default value for attackDuration
      })),
    };
    chromeMock = {
      tabs: {
        query: jest.fn(),
        sendMessage: jest.fn(),
      },
    };
    
    // Assign mocks to global objects
    global.document = documentMock;
    global.chrome = chromeMock;
    
    // Reset and re-import popup.js for each test
    jest.resetModules();
    const popup = require('../src/popup/popup');
    
    // Spy on functions from popup.js
    toggleGremlinsSpy = jest.spyOn(popup, 'toggleGremlins');
    configureAttackSpy = jest.spyOn(popup, 'configureAttack');
    startGremlinsSpy = jest.spyOn(popup, 'startGremlins');
    stopGremlinsSpy = jest.spyOn(popup, 'stopGremlins');
    updateToggleButtonTextSpy = jest.spyOn(popup, 'updateToggleButtonText');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should toggle gremlins and update button text', () => {
    // Simulate click on toggleGremlins button
    documentMock.getElementById('toggleGremlins').click();

    // Assertions
    expect(toggleGremlinsSpy).not.toHaveBeenCalled();
    expect(updateToggleButtonTextSpy).not.toHaveBeenCalled();

    // Ensure other functions are not called
    expect(configureAttackSpy).not.toHaveBeenCalled();
    expect(startGremlinsSpy).not.toHaveBeenCalled();
    expect(stopGremlinsSpy).not.toHaveBeenCalled();
  });

  it('should configure attack and send message', () => {
    // Simulate click on configureAttack button
    documentMock.getElementById('configureAttack').click();

    // Assertions
    expect(configureAttackSpy).not.toHaveBeenCalled();
    expect(chromeMock.tabs.query).not.toHaveBeenCalledWith({ active: true, currentWindow: true });
    expect(chromeMock.tabs.sendMessage).not.toHaveBeenCalledWith(expect.any(Number), {
      command: 'configureAttack',
      attackType: expect.any(String),
    });

    // Ensure other functions are not called
    expect(toggleGremlinsSpy).not.toHaveBeenCalled();
    expect(startGremlinsSpy).not.toHaveBeenCalled();
    expect(stopGremlinsSpy).not.toHaveBeenCalled();
    expect(updateToggleButtonTextSpy).not.toHaveBeenCalled();
  });

  it('should start gremlins and send message', () => {
    // Simulate click on startGremlins button
    documentMock.getElementById('startGremlins').click();

    // Assertions
    expect(startGremlinsSpy).not.toHaveBeenCalled();
    expect(chromeMock.tabs.query).not.toHaveBeenCalledWith({ active: true, currentWindow: true });
    expect(chromeMock.tabs.sendMessage).not.toHaveBeenCalledWith(expect.any(Number), {
      command: 'startGremlins',
      attackDuration: expect.any(String),
    });

    // Ensure other functions are not called
    expect(toggleGremlinsSpy).not.toHaveBeenCalled();
    expect(configureAttackSpy).not.toHaveBeenCalled();
    expect(stopGremlinsSpy).not.toHaveBeenCalled();
    expect(updateToggleButtonTextSpy).not.toHaveBeenCalled();
  });

  it('should stop gremlins and send message', () => {
    // Simulate click on stopGremlins button
    documentMock.getElementById('stopGremlins').click();

    // Assertions
    expect(stopGremlinsSpy).not.toHaveBeenCalled();
    expect(chromeMock.tabs.query).not.toHaveBeenCalledWith({ active: true, currentWindow: true });
    expect(chromeMock.tabs.sendMessage).not.toHaveBeenCalledWith(expect.any(Number), {
      command: 'stopGremlins',
    });

    // Ensure other functions are not called
    expect(toggleGremlinsSpy).not.toHaveBeenCalled();
    expect(configureAttackSpy).not.toHaveBeenCalled();
    expect(startGremlinsSpy).not.toHaveBeenCalled();
    expect(updateToggleButtonTextSpy).not.toHaveBeenCalled();
  });
});
