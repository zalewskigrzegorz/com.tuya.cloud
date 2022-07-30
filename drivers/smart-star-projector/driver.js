'use strict';

const TuyaBaseDriver = require('../tuyabasedriver');

class TuyaStarProjectorDriver extends TuyaBaseDriver{

  async onInit() {
    this.log('MyDriver has been initialized');
  }

  async onPairListDevices() {
    let devices = [];
    if (!this.homey.app.isConnected()) {
      throw new Error("Please configure the app first.");
    }
    else {
      let lights = this.get_devices_by_type("starProjector");
      for (let tuyaDevice of Object.values(lights)) {
        let capabilities = [];
        capabilities.push("onoff");
        for (let func of tuyaDevice.status) {
          switch (func.code) {
            case "bright_value":
            case "bright_value_v2":
            case "bright_value_1":
              capabilities.push("dim");
              break;
            case "temp_value":
            case "temp_value_v2":
              capabilities.push("light_temperature");
              break;
            case "colour_data":
            case "colour_data_v2":
              capabilities.push("light_hue");
              capabilities.push("light_saturation");
              capabilities.push("light_mode");
              break;
            default:
              break;
          }
        }
        devices.push({
          data: {
            id: tuyaDevice.id
          },
          capabilities: capabilities,
          name: tuyaDevice.name
        });

      }
    }
    return devices.sort(TuyaBaseDriver._compareHomeyDevice);
  }
}

module.exports = TuyaStarProjectorDriver;
