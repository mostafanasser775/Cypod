import { Injectable } from '@nestjs/common';
import { devices } from 'src/data';

@Injectable()
export class DevicesService {
 

  findAll() {
    return devices.map(({ totalPowerConsumption, ...device }) => {
      const totalConsumption = Object.values(totalPowerConsumption).reduce((sum, value) => {
        const numericValue = parseInt(value.split(' ')[0], 10); // Extract numeric part
        return sum + numericValue;
      }, 0);
      return { ...device, totalPowerConsumptionSum: `${totalConsumption} kw` };
    });
  }

  findOne(id: string) {
    const device = devices.find((device) => device.id === id);
    if (!device) return { message: 'Device not found' };
    return device;
  }

  
}
