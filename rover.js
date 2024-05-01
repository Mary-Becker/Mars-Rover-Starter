class Rover {
   // default values
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   // Takes message object as parameter
   // the message object is filled with the commands
   receiveMessage(message) {
      // declaring commandActions object to map command types to it's corrisponding functions
      const commandActions = {
         MOVE:(command) => {
            // makes sure the rover wont move if the mode is in 'LOW_POWER'
            if(this.mode === 'LOW_POWER') {
               return { completed: false };
            } else {
               this.position = command.value;
               return { completed: true }
            }
         },
         STATUS_CHECK: () => {
            return {
               completed: true,
               roverStatus:{
                  mode: this.mode,
                  generatorWatts:this.generatorWatts,
                  position: this.position
               }
            };
         },
         MODE_CHANGE: (command) => {
            this.mode = command.value;
            return {completed: true};
         }
      };
      // iterates over the commands in the 'command' array in the 'message' object
      const commandResults = message.commands.map((command) => {
         // looks up the right action function in the 'commandActions' object based on the command type
         const action = commandActions[command.commandType];
         if(action) {
            return action(command);
         } else {
            return {completed: false, error: 'Unknown command'};
         }
      });
      // returns an object with the name and an array of results that have been executed
      return {
         message: message.name,
         results: commandResults,
      };
   }
}

module.exports = Rover;