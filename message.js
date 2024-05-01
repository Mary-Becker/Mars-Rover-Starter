class Message {
   constructor(name, commands) {
      if(!name) {
         throw new Error('Message name required.');
      }
      if(!Array.isArray(commands)) {
         throw new Error('Message commands required.');
      }
      this.name = name;
      this.commands = commands;
   }
}

module.exports = Message;