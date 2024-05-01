const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

// Test 4
describe("Message class name validation", function() {
    test("throws error if name is NOT passed into the constructor", function(){
        expect(function() { new Message(); }).toThrow(new Error('Message name required.'));
    });
});
// Test 5
describe("constructor sets name", function() {
    test("constructor sets the name property.", function() {
        // creates a new message object with a name and an array for commands
        let message = new Message("Test Message", []);
        // checks that the name property is correctly set
        expect(message.name).toBe("Test Message");                                                
    });
});

// Test 6
describe("contains a commands array passsed into the constructor as the 2nd argument.", function() {
    test("commands property of a new message object inherited Message(name, commands)", function() {
// setting commands  array
        let commandArray = ['MODE_CHANGE', 'MOVE', 'STATUS_CHECK']
        // create a new messageobject with name and commands
        let message = new Message("Test Message", commandArray);
        // checks if commands property is correct
        expect(message.commands).toEqual(commandArray) 
    });
});