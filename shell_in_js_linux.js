
const readline = require('readline');
const { exec } = require('child_process');
const { promisify } = require("util");
const execP = promisify(exec);

async function command_execution(command) {
  try {
    const { stdout } = await execP(command);
    return stdout;
  } catch (error) {
    console.error(`exec error: ${error}`);
    return;
  }
}


process.stdin.setRawMode(true);  // for the program exit
process.stdin.resume();


async function main() {
  const readline = require("readline");
  const read_line = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  //exiting the program
read_line.on("keypress", (str, key) => {
  if (key.ctrl && key.name === "d") {   
    console.log("Shell Exit. Program Terminated.");  // CTRL-D for exiting the program; CTRL-P doesn't work on my Romanian keyboard :)
    process.exit(0);
    }
  });
  while (true) {
    //promise 
    const command = await new Promise((resolve) => {
      read_line.question("> ", resolve);
    });

    const part_of_the_command = command.split(" ");   // I split the user input 
    const option = part_of_the_command[0]; // in this String I take the first word , example : >lp   -is the first word

    switch (option) {
      case "/":
      case ".":
        console.log(await command_execution(command));
        break;
      case "lp":
        //print the processes
        console.log(await command_execution("ps"));
        break;
      case "bing":
        if (part_of_the_command.length !== 3) {
          console.log(
            'This format is not accepted. Please, tap instead bing "-kill","-pause","-continue" <processId>'
          );
          return;
        }

        const bing_opt = part_of_the_command[1]; // in this String I take the second word , example : >bing -kill  -kill is the second word
        const process_ID = part_of_the_command[2]; // in this String I take the third word , example : >bing -kill 57 ; 57(the process_ID) is the third word

        switch (bing_opt) {
          case "-kill":
            console.log(await command_execution(`kill -9 ${process_ID}`));   // kill -9 - sends a kill signal to terminate any process immediately  - in my opinion is better
            break;
          case "-pause":
            console.log(await command_execution(`kill -STOP ${process_ID}`)); // kill -SIGSTOP would be another way to pause a process
            break;
          case "-continue":
            console.log(await command_execution(`kill -CONT ${process_ID}`)); // kill -SIGCONT would be another way to continue a process
            break;
          default:
            console.log('Not a valid option. Please, tap instead "-kill","-pause","-continue"');
        }
        break;
      case "!":
        console.log(await command_execution(`${command} &`));
        break;
      case "ls":
        console.log(await command_execution("ls"));
        break;
      case "keep":
        
        if (part_of_the_command.length !== 2) {
          console
          .log("Please provide a valid process ID");
          return;
        }
        const process_ID_2 = part_of_the_command[1];
        console.log(await command_execution(`nohup node ${process_ID_2} &`));
          console.log("Process successfully Detached!");
      break;
    }
  }
}

main();


