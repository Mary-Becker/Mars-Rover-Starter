const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

// Test 7
describe("rover class", () => {
  test("constructor sets position and default vaulues for mode and generatorWatts", () => {
    let rover = new Rover(10);
    expect(rover.position).toEqual(10);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });
  
  // Test 8
  test("response returned by receiveMessage contains the name of the message", () => {
    // Creates a new instance of 'Rover', putting it's position back to 0
    let rover = new Rover(0)
    // creates a new message object with 'Test message' and an empty array of commands.
    // this gets passed through 'receiveMessage' method
    let message = new Message('Test message', []);
    // passes the 'message' object as an argument and saves it to 'results'
    let results = rover.receiveMessage(message);
    // checks if the the name of the original message is included in the response.
    expect(results.message).toBe('Test message');
  });

  // Test 9
  test("response returned by receiveMessage includes two results if commands are sent in the message", () => {
    let rover = new Rover(0);
    // Creates a new message object called 'Test message' containing both of the new commands 
    let message = new Message('Test message', [
      // new command instance with "MOVE" as the name and the value of 10 
      new Command('MOVE', 10),
      // new command instance with "MODE_NAME" as the name and the value of "LOW_POWER"
      new Command( 'MODE_CHANGE', 'LOW_POWER')
    ]);
    let results = rover.receiveMessage(message);
    // makes sure there are 2 results
    expect(results.results.length).toBe(2);
  });

  // Test 10
  test("responds correctly to the status check command", () => {
    let rover = new Rover(0);
    // New instance of the message object, with the new command 'STATUS_CHECK' 
    let message = new Message('Test message', [new Command('STATUS_CHECK')]);
    // calling the 'receiveMessage' method of the rover instance
    let results = rover.receiveMessage(message);
    expect(results.results[0].completed).toBe(true);
    // checks that the mode is set to 'NORMAL'
    expect(results.results[0].roverStatus.mode).toBe('NORMAL'); 
    // ckecks that 'generatorWatts' and 'position' are back to default values
    expect(results.results[0].roverStatus.generatorWatts).toBe(110); 
    expect(results.results[0].roverStatus.position).toBe(0);
  });

  // Test 11 
  test("responds correctly to the mode change command", () => {
    let rover = new Rover(0);
     // establishes new message instance with the new command 'MODE_CHANGE' with the value 'LOW_POWER'
    let message = new Message('Test message', [new Command('MODE_CHANGE', 'LOW_POWER')]);
    let results = rover.receiveMessage(message);
    // makes sure the command is successful that the 1st result 'completed' is true
    expect(results.results[0].completed).toBe(true);
    expect(rover.mode).toBe('LOW_POWER');
  });

  // Test 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", () => {
    let rover = new Rover(0);
    // sends a message to the rover to change it's mode to 'LOW_POWER' by calling the rover.receiveMessage() with the 'MODE_CHANGE' command
    rover.receiveMessage(new Message('Test message', [new Command('MODE_CHANGE','LOW_POWER')]));
    // attempts to call the rover to move
    let results = rover.receiveMessage(new Message('Test message', [new Command('MOVE',10)]));
    expect(results.results[0].completed).toBe(false);
    expect(rover.position).toBe(0)
  });
  // Test 13
  test("responds with the position for the move command", () => {
    let rover = new Rover(0);
    // Creates new message with the command 'MOVE' with the value of 10
    let message = new Message('Test message', [new Command('MOVE', 10)]);
    // Passes the message through rover to proccess and update it's state
    let results = rover.receiveMessage(message)
    expect(results.results[0].completed).toBe(true);
    expect(rover.position).toBe(10);
  });

});