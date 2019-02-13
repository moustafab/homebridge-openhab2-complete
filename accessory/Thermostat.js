'use strict';

const {Accessory} = require('../util/Accessory');
const {
    addTemperatureDisplayUnitsCharacteristic,
    addTargetRelativeHumidityCharacteristic,
    addCurrentRelativeHumidityCharacteristic,
    addTargetTemperatureCharacteristic,
    addCurrentTemperatureCharacteristic,
    addHeatingThresholdCharacteristic,
    addCoolingThresholdCharacteristic,
    addCurrentHeatingCoolingStateCharacteristic,
    addTargetHeatingCoolingStateCharacteristic
} = require('./characteristic/Climate');

class ThermostatAccessory extends Accessory {

    constructor(platform, config) {
        super(platform, config);

        // Services will be retrieved by homebridge
        this._services = [
            this._getAccessoryInformationService('Thermostat'),
            this._getPrimaryService()
        ]
    }

    _getPrimaryService() {
        this._log.debug(`Creating thermostat service for ${this.name}`);
        let primaryService = new this.Service.Thermostat(this.name);
        addCurrentTemperatureCharacteristic.bind(this)(primaryService);
        addTargetTemperatureCharacteristic.bind(this)(primaryService);
        addCurrentRelativeHumidityCharacteristic.bind(this)(primaryService, true);
        addTargetRelativeHumidityCharacteristic.bind(this)(primaryService, true);
        addTargetHeatingCoolingStateCharacteristic.bind(this)(primaryService);
        addCurrentHeatingCoolingStateCharacteristic.bind(this)(primaryService);
        addTemperatureDisplayUnitsCharacteristic.bind(this)(primaryService);
        addCoolingThresholdCharacteristic.bind(this)(primaryService, true);
        addHeatingThresholdCharacteristic.bind(this)(primaryService, true);
        return primaryService;
    }

}

const type = "thermostat";

function createAccessory(platform, config) {
    return new ThermostatAccessory(platform, config);
}

module.exports = {createAccessory, type};
