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


export function logSuccess (message:string) {
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
  console.log(colors.fg.green, message, colors.reset);
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
}


export function logFailure (message:string, err:string) {
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
  console.log(colors.fg.red, message, colors.reset);
  console.log(`${colors.fg.red}${err}${colors.reset}`);
  console.log(
    colors.fg.blue,
    '====================================',
    colors.reset
  );
}


export function logWarning (message:string) {
  console.log(colors.fg.yellow, "\n Warning: " + message, colors.reset);
}












