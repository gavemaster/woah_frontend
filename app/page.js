'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const triangleImageUrl = 'https://cdn3.iconfinder.com/data/icons/UltimateGnome/256x256/actions/gtk-media-play-ltr.png'; // Replace with your actual image URL
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [isTextFullyTyped, setIsTextFullyTyped] = useState(false);
  const validCommands = {
    help: "List of available commands: help, command1, command2...",
    login: "this will prompt login can bypass this by using -u {username} -p {password}",
    register: "this will prompt register screen.",
    viewHome: "will go to home screen for non users",
    clear: "clears previous inputs and outputs"
    // Add more commands as needed
  };
  const handleInputChange = (e) => {
    setInput(e.target.value);
  }; 
  const processCommand = (command, extraInput, flags) => {
    // Check if the command is valid
    if (command == "help") {
      return "Help: commands : login = prompts login screen, register = prompts register screen, viewHome = redirects to home page for non users"
  } else if(command == "login") {
      if(Object.keys(flags).length == 0 & extraInput === ""){
        return "redirecting to login........";
      }else if(Object.keys(flags).length == 2 & extraInput === ""){
        if(flags.u && flags.p){
          return `Logging in as ${flags.u} ......`;
        } else {
          return `invalid flags for command ${command}`;
        }
      }else {
        return `invalid flags for command ${command}`;
      }
  }else if(command == "register"){
    if(Object.keys(flags).length == 0 & extraInput === ""){
      return "redirecting to register......";
    }else{
      return "Invalid input for command register"
    }
    
  }else if(command == "viewHome"){
    if(Object.keys(flags).length == 0 & extraInput === ""){
      return "redirecting to app home......."
    }else{
      return "invalid input for command viewHome"
    }

  }
}

  const checkCommand = (command) => {
    if (validCommands[command]) {
      return true;
  } else {
      return false;
    }
  }

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      // Split the input into words
      const inputParts = input.split(' ');
  
      // The first word is the command
      const command = inputParts[0];
      const valid = checkCommand(command);
      if(valid & command != "clear"){
        // Initialize variables for extra input and flags
        let extraInput = '';
        let flags = {};
  
        // Iterate over the remaining parts
        for (let i = 1; i < inputParts.length; i++) {
          if (inputParts[i].startsWith('-')) {
            // It's a flag; next part is the value
            const flag = inputParts[i].substring(1); // Remove the '-' from flag
            const value = inputParts[i + 1] ? inputParts[i + 1] : true; // Assign the next part as value or true
            flags[flag] = value;
            i++; // Increment to skip the value in the next iteration
        }else{
            // It's extra input
            extraInput = inputParts[i];
        }
      }
      // Process the command
      const response = processCommand(command, extraInput, flags);
      setOutput([...output,
        <div className='flex items-center'>
          <span className='mr-2'><img src={triangleImageUrl} className='w-4 h-4'/></span>
          <span>{input}</span>
        </div>,
        response
      ]);
      setInput('');
      }else if(valid & command == "clear"){
        setOutput([]);
        setInput('');
      }else{
        setOutput([...output,
          <div className='flex items-center'>
            <span className='mr-2'><img src={triangleImageUrl} className='w-4 h-4'/></span>
            <span>{input}</span>
          </div>,
          "INVALID COMMAND BOZO"
        ]);
        setInput('');
      }
  
      
    }
  }
useEffect(() => {
      // Simulate typing effect for "WOAH"
      const textToType = 'WOAH';
      let currentIndex = 0;
  
      const typingInterval = setInterval(() => {
        if (currentIndex <= textToType.length) {
          setTypedText(textToType.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTextFullyTyped(true);
        }
      }, 500); // Adjust the typing speed as needed
  
      return () => {
        clearInterval(typingInterval);
      };
    }, []);

  




  return (
<div className="bg-terminalBlack min-h-screen text-terminalGreen font-Press Start 2P text-sm" >
    <div className="p-4">
      <div className="bg-terminalBlack text-terminalGreen font-Press Start 2P text-9xl">{typedText}</div>
      {output.map((line, index) => (
        <span key={index}>{line}</span>
      ))}
  {isTextFullyTyped && (
          <div className='flex'>
            <span className='mr-2'>
              <img src={triangleImageUrl} className='w-4 h-4' />
            </span>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleCommand}
              className="bg-terminalBlack text-terminalGreen focus:outline-none border-none w-full text-sm"
            />
          </div>
        )}
    </div>
  </div>
  );
}