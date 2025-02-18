export function configToYAML(postData: {[key: string]: any}) {

    const fs = require('fs');
    const yaml = require('js-yaml');


    try{
        const config = yaml.safeLoad(fs.readFileSync('./src/utils/config_template.yaml', 'utf8'));
        
        config.optimism_package.chains[0].network_params.seconds_per_slot = 1;


        const newYaml = yaml.safeDump(config);
        fs.writeFileSync('./data-out.yaml', newYaml, 'utf8');
        console.log("YAML file created successfully");
      } catch (e) {
        console.log(e);
      }

}