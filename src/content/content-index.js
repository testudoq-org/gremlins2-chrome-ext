// Dynamically import gremlins.min.js
const loadGremlins = async () => {
    console.log('Loading gremlins.min.js');
    const gremlins = await import('./gremlins.min.js');
    console.log('Gremlins.min.js loaded');
    // Example of how to start gremlins.js horde
    console.log('Starting gremlins.js horde');
    gremlins.createHorde().unleash();
    console.log('Gremlins.js horde started');
  };
  
  loadGremlins();
  