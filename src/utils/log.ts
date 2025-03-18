import { colors } from './colors';

export const startLog = () => {
  //   console.log(colors.fg.cyan,
  //     `
  // ██╗   ██╗██████╗ ███╗   ██╗ ██████╗ ██████╗ ███████╗
  // ██║   ██║██╔══██╗████╗  ██║██╔═══██╗██╔══██╗██╔════╝
  // ██║   ██║██████╔╝██╔██╗ ██║██║   ██║██║  ██║█████╗
  // ██║   ██║██╔═══╝ ██║╚██╗██║██║   ██║██║  ██║██╔══╝
  // ╚██████╔╝██║     ██║ ╚████║╚██████╔╝██████╔╝███████╗
  //  ╚═════╝ ╚═╝     ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝
  // `,
  //     colors.reset
  //   );

  console.log(
    colors.fg.cyan,
    `
         ██▀███   ▒█████   ██▓     ██▓     █    ██  ██▓███          
        ▓██ ▒ ██▒▒██▒  ██▒▓██▒    ▓██▒     ██  ▓██▒▓██░  ██▒        
        ▓██ ░▄█ ▒▒██░  ██▒▒██░    ▒██░    ▓██  ▒██░▓██░ ██▓▒        
        ▒██▀▀█▄  ▒██   ██░▒██░    ▒██░    ▓▓█  ░██░▒██▄█▓▒ ▒        
 ██▓    ░██▓ ▒██▒░ ████▓▒░░██████▒░██████▒▒▒█████▓ ▒██▒ ░  ░    ██▓ 
 ▒▓▒    ░ ▒▓ ░▒▓░░ ▒░▒░▒░ ░ ▒░▓  ░░ ▒░▓  ░░▒▓▒ ▒ ▒ ▒▓▒░ ░  ░    ▒▓▒ 
 ░▒       ░▒ ░ ▒░  ░ ▒ ▒░ ░ ░ ▒  ░░ ░ ▒  ░░░▒░ ░ ░ ░▒ ░         ░▒  
 ░        ░░   ░ ░ ░ ░ ▒    ░ ░     ░ ░    ░░░ ░ ░ ░░           ░   
  ░        ░         ░ ░      ░  ░    ░  ░   ░                   ░  
  ░                                                              ░  
`,
    colors.reset
  );

  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
  console.log(
    colors.fg.green,
    `Welcome to UpRoll`,
    colors.reset
  );
  console.log(colors.fg.green, 'OP Stack Deployment Tool', colors.reset);
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
};

export function loadingBarAnimation(
  duration = 3000,
  totalSteps = 20,
  isLoggingEnabled = true
) {
  let currentStep = 0;

  // Check if logging is enabled
  if (!isLoggingEnabled) return;

  // Calculate the time interval for each step
  const interval = duration / totalSteps;

  const loadingInterval = setInterval(() => {
    // Clear the console for smooth animation (optional)
    console.clear();

    // Generate the loading bar
    const progressBar = `[${'='.repeat(currentStep)}${' '.repeat(
      totalSteps - currentStep
    )}]`;
    const percentage = Math.round((currentStep / totalSteps) * 100);

    console.log(`Loading... ${progressBar} ${percentage}%`);

    // Move to the next step
    currentStep++;

    // Stop the animation when complete
    if (currentStep > totalSteps) {
      clearInterval(loadingInterval);
      console.clear();
      console.log('✅ Loading Complete!');
    }
  }, interval);
}

const loadingSpin = ['|', '/', '-', '\\'];

export function loadingBarAnimationInfinite(
  text = 'Loading',
  duration = 1500,
  totalSteps = 20,
  isLoggingEnabled = true
) {
  let currentStep = 0;

  // Check if logging is enabled
  if (!isLoggingEnabled) return;

  // Calculate the time interval for each step
  const interval = duration / totalSteps;
  let i = 0;
  return setInterval(() => {
    // Clear the console for smooth animation (optional)
    // console.clear();

    // Generate the loading bar
    const progressBar = `[${'='.repeat(currentStep)}${' '.repeat(
      totalSteps - currentStep
    )}]`;

    console.log(
      `${loadingSpin[i]} ${loadingSpin[i]} ${text}... ${progressBar}`
    );

    // Move to the next step
    currentStep = (currentStep + 1) % (totalSteps + 1);
    i = (i + 1) % 4;
  }, interval);
}

export const rollupConfigLog = () => {
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
  console.log(colors.fg.green, 'OP Stack Rollup', colors.reset);
  console.log(colors.fg.green, 'Config your rollup', colors.reset);
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
};

export const saveChainInfoLog = () =>{
  console.log(

    colors.fg.blue,
    '====================================',
    colors.reset
  );  
  console.log(colors.fg.green, 'Saving chain information to your project folder', colors.reset);
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
}


export const saveChainInfoCompleteLog = () =>{
  console.log(

    colors.fg.blue,
    '====================================',
    colors.reset
  );
  console.log(colors.fg.green, 'Chain information saved!', colors.reset);
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
}


export const saveChainInfoFailedLog = (errMsg:string) =>{
  console.log(

    colors.fg.blue,
    '====================================',
    colors.reset
  )
  console.log(colors.fg.red, 'Failed to save chain information');
  console.log(`${colors.fg.red}${errMsg}${colors.reset}`);
  console.log(

    colors.fg.blue,
    '====================================',
    colors.reset
  );  
}

export const kurtosisRunTestnetLog = () =>{
  console.log(

    colors.fg.blue,
    '====================================',
    colors.reset
  );  
  console.log(colors.fg.green, 'Deploying rollup using config', colors.reset);
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
}

export const deployCompleteLog = () =>{
  console.log(

    colors.fg.blue,
    '====================================',
    colors.reset
  );  
  console.log(colors.fg.green, 'Rollup deployment complete!', colors.reset);
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
}


export const deployFailedLog = (errMsg:string) =>{
  console.clear()
  console.log(

    colors.fg.blue,
    '====================================',
    colors.reset
  );  
  console.log(colors.fg.red, 'Rollup deployment failed');
  console.log(`${colors.fg.red}${errMsg}${colors.reset}`);
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
}


export const stopFailedLog = (errMsg:string) =>{
  console.log(

    colors.fg.blue,
    '====================================',
    colors.reset
  );  
  console.log(colors.fg.red, 'Unable to stop rollup', colors.reset);
  console.log(`${colors.fg.red}${errMsg}${colors.reset}`);
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
}


export const stopCompleteLog = () =>{
  console.log(

    colors.fg.blue,
    '====================================',
    colors.reset
  );  
  console.log(colors.fg.green, 'Rollup stopped succesfully', colors.reset);
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
}


export const statusCompleteLog = () =>{
  console.log(

    colors.fg.blue,
    '====================================',
    colors.reset
  );  
  console.log(colors.fg.green, 'Succesfully retrieved rollup status', colors.reset);
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
}

export const statusFailLog = (errMsg:string) =>{
  console.log(

    colors.fg.blue,
    '====================================',
    colors.reset
  );  
  console.log(colors.fg.red, 'Failed to retrieve rollup status', colors.reset);
  console.log(`${colors.fg.red}${errMsg}${colors.reset}`);
  console.log(
    colors.fg.blue, 
    '====================================',
    colors.reset
  );
}


export const infoCompleteLog = () =>{
  console.log(

    colors.fg.blue,
    '====================================',
    colors.reset
  );  
  console.log(colors.fg.green, 'Succesfully retrieved rollup info', colors.reset);
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
}

export const infoFailLog = (errMsg:string) =>{
  console.log(

    colors.fg.blue,
    '====================================',
    colors.reset
  );  
  console.log(colors.fg.red, 'Failed to retrieve rollup info', colors.reset);
  console.log(`${colors.fg.red}${errMsg}${colors.reset}`);
  console.log(
    colors.fg.blue, 
    '====================================',
    colors.reset
  );
}



export const logCompleteLog = () =>{
  console.log(

    colors.fg.blue,
    '====================================',
    colors.reset
  );  
  console.log(colors.fg.green, 'Succesfully retrieved log', colors.reset);
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
}

export const logFailLog = (errMsg:string) =>{
  console.log(

    colors.fg.blue,
    '====================================',
    colors.reset
  );  
  console.log(colors.fg.red, 'Failed to retrieve log', colors.reset);
  console.log(`${colors.fg.red}${errMsg}${colors.reset}`);
  console.log(
    colors.fg.blue, 
    '====================================',
    colors.reset
  );
}