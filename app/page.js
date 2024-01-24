'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const triangleImageUrl = 'https://cdn3.iconfinder.com/data/icons/UltimateGnome/256x256/actions/gtk-media-play-ltr.png'; // Replace with your actual image URL
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [isTextFullyTyped, setIsTextFullyTyped] = useState(false);
  const [isLoginState, setIsLoginState] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const validCommands = {
    help: "List of available commands: help, command1, command2...",
    login: "this will prompt login credentials",
    register: "this will prompt register screen.",
    viewHome: "will go to home screen for non users",
    clear: "clears previous inputs and outputs"
    // Add more commands as needed
  };

  const handleLoginSubmit = (e) => {
    setUsernameInput('');
    setPasswordInput('');
    setIsLoginState('');
    setOutput([]);
  }
  const handleInputChange = (e) => {
    setInput(e.target.value);

    }
  


  const processCommand = (command, extraInput, flags) => {
    // Check if the command is valid
    if (command == "help") {
      res = "Help: commands : login = prompts login screen, register = prompts register screen, viewHome = redirects to home page for non users";
      setOutput([...output,
        <div className='flex items-center font-Press Start 2P text-xs'>
          <span className='mr-2'><img src={triangleImageUrl} className='w-3 h-3'/></span>
          <span>{input}</span>
        </div>,
        res
      ]);
      setInput('');
  } else if(command == "login") {
      if(Object.keys(flags).length == 0 & extraInput === ""){
        setIsLoginState('username');
        setOutput([]);
      }else if(Object.keys(flags).length == 2 & extraInput === ""){
        if(flags.u && flags.p){
          res = `Logging in as ${flags.u} ......`;
          setOutput([...output,
            <div className='flex items-center font-Press Start 2P text-xs'>
              <span className='mr-2'><img src={triangleImageUrl} className='w-3 h-3'/></span>
              <span>{input}</span>
            </div>,
            res
          ]);
          setInput('');
        } else {
          res = `invalid flags for command ${command}`;
          setOutput([...output,
            <div className='flex items-center font-Press Start 2P text-xs'>
              <span className='mr-2'><img src={triangleImageUrl} className='w-3 h-3'/></span>
              <span>{input}</span>
            </div>,
            res
          ]);
        }
      }else {
        res = `invalid flags for command ${command}`;
        setOutput([...output,
          <div className='flex items-center font-Press Start 2P text-xs'>
            <span className='mr-2'><img src={triangleImageUrl} className='w-3 h-3'/></span>
            <span>{input}</span>
          </div>,
          res
        ]);
      }
  }else if(command == "register"){
    if(Object.keys(flags).length == 0 & extraInput === ""){
      res = "redirecting to register......";
      setOutput([...output,
        <div className='flex items-center font-Press Start 2P text-xs'>
          <span className='mr-2'><img src={triangleImageUrl} className='w-3 h-3'/></span>
          <span>{input}</span>
        </div>,
        res
      ]);
      setInput('');
    }else{
      res = "Invalid input for command register";
      setOutput([...output,
        <div className='flex items-center font-Press Start 2P text-xs'>
          <span className='mr-2'><img src={triangleImageUrl} className='w-3 h-3'/></span>
          <span>{input}</span>
        </div>,
        res
      ]);
      setInput('');
    }
    
  }else if(command == "viewHome"){
    if(Object.keys(flags).length == 0 & extraInput === ""){
      res = "redirecting to app home.......";
      setOutput([...output,
        <div className='flex items-center font-Press Start 2P text-xs'>
          <span className='mr-2'><img src={triangleImageUrl} className='w-3 h-3'/></span>
          <span>{input}</span>
        </div>,
        res
      ]);
      setInput('');
    }else{

      res = "invalid input for command viewHome";
      setOutput([...output,
        <div className='flex items-center font-Press Start 2P text-xs'>
          <span className='mr-2'><img src={triangleImageUrl} className='w-3 h-3'/></span>
          <span>{input}</span>
        </div>,
        res
      ]);
      setInput('');
    }

  }
};

  const checkCommand = (command) => {
    if (validCommands[command]) {
      return true;
  } else {
      return false;
    }
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      // If in the username or password state, handle login
      if (isLoginState === 'username' || isLoginState === 'password') {
        if (isLoginState === 'username') {
          setUsernameInput(input.trim());
          setIsLoginState('password');
          setInput('');
        } else if (isLoginState === 'password') {
          setPasswordInput(input.trim());
          setIsLoginState('');
          handleLoginSubmit();
        }
      } else {
        // Split the input into words
        const inputParts = input.split(' ');
  
        // The first word is the command
        const command = inputParts[0];
        const valid = checkCommand(command);
        if (valid && command !== "clear") {
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
            } else {
              // It's extra input
              extraInput = inputParts[i];
            }
          }
          // Process the command
          processCommand(command, extraInput, flags);
        } else if (valid && command === "clear") {
          setOutput([]);
          setInput('');
        } else {
          setOutput([...output,
            <div className='flex items-center font-Press Start 2P text-xs'>
              <span className='mr-2'><img src={triangleImageUrl} className='w-3 h-3'/></span>
              <span>{input}</span>
            </div>,
            "INVALID COMMAND BOZO"
          ]);
          setInput('');
        }
      }
    }
  };
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
<div className="bg-terminalBlack min-h-screen text-terminalGreen font-pressStart text-xs" >
    <div className="p-4">
      <div className="bg-terminalBlack text-terminalGreen text-9xl">{typedText}</div>
      {output.map((line, index) => (
        <span key={index}>{line}</span>
      ))}
  {isTextFullyTyped && (
          <div className='flex'>
            <span className='mr-2'>
              <img src={triangleImageUrl} className='w-3 h-3' />
            </span>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleCommand}
              className="bg-terminalBlack text-terminalGreen focus:outline-none border-none w-full"
            />
          </div>
        )}
  {isTextFullyTyped && isLoginState === 'username' && (
          <div className='flex'>
            <span className='mr-2'>
              username: 
            </span>
            <input
              type="text"
              value={usernameInput}
              onKeyDown={handleCommand}
              className="bg-terminalBlack text-terminalGreen focus:outline-none border-none w-full"
            />
          </div>
        )}
  {isTextFullyTyped && isLoginState === 'password' && (
          <div className='flex'>
            <span className='mr-2'>
              password: 
            </span>
            <input
              type="text"
              value={passwordInput}
              onKeyDown={handleCommand}
              className="bg-terminalBlack text-terminalGreen focus:outline-none border-none w-full"
            />
          </div>
        )}
    </div>
    </div>
  );
}