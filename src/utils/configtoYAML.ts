export function configToYAML(postData: {[key: string]: any}) {
    const path = require("path");
    const fs = require('fs');
    const yaml = require('js-yaml');


    try{
        const templatePath = path.join(__dirname, '../config/config_template.yaml');
        const config = yaml.safeLoad(fs.readFileSync(templatePath, 'utf8'));
        
        config.optimism_package.chains[0].network_params.seconds_per_slot = 1;
        

        const newYaml = yaml.safeDump(config);

        const newConfigPath = path.join(__dirname, '../config/' + postData.configName + '.yaml');
        fs.writeFileSync(newConfigPath, newYaml, 'utf8');
        console.log("Config file created successfully");
      } catch (e) {
        console.log(e);
      }

}