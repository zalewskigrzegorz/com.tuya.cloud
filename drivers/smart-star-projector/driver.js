'use strict';

const TuyaBaseDriver = require('../tuyabasedriver');

class TuyaStarProjectorDriver extends TuyaBaseDriver{

  onInit() {
    this.log('Tuya Smart Star Projector driver has been initialized');
  }

  async onPairListDevices() {
    let devices = [];
    if (!this.homey.app.isConnected()) {
      throw new Error("Please configure the app first.");
    }
    else {
      let starProjector = this.get_devices_by_type("starProjector");
      for (let tuyaDevice of Object.values(starProjector)) {
        let capabilities = ["onoff","laser_onoff","dim","light_hue",
        ];

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
