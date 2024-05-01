const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

// Test 1
describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command(); }).toThrow(new Error('Command type required.'));
  });

});

// Test 2
describe("constructor sets the command type", function() {

  test("sets the commandType property", function() {
    // 'commandType' is defined with the value of "testCommand" to represent the command that will be the 'Command' constructor
    let commandType = "testCommand";
    // creates command instance by calling the 'command' object constructor with the 'commandType' variable as the 1st argument
    let command = new Command(commandType);
    expect(command.commandType).toEqual(commandType)
  });
});

// Test 3
describe("constructor sets a value passed in as the 2nd argument", function() {

  test("constructor correctly sets value property in the new object", function() {
    // defines the variables 'commandType' with the value with "testCommand" and 'value' with the value "testValue"
    // representing the commmand type and the value to be passed to the constructor as the 2nd argument
    let commandType = "testCommand";
    let value = "testValue";
    // creates a new 'command' object calls the 'command' constructor with both 'commandType' and 'value' as the arguments
    let command = new Command(commandType, value)
    expect(command.value).toEqual(value);
  } );
});