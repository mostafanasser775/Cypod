export type Role = 'admin' | 'operator';

export interface User {
    id: number;
    username: string;
    password?: string; // Password should ideally be hashed
    role: Role;
  }
  
  export interface MonthlyPowerConsumption {
    jan: string; feb: string; march: string; april: string; may: string; june: string;
    july: string; august: string; september: string; october: string; november: string; december: string;
  }
  
  export interface Device {
    id: string;
    name: string;
    status: 'on' | 'off';
    temperature: string;
    humidity: string;
    lat: number;
    lng: number;
    totalPowerConsumption: string | MonthlyPowerConsumption; // Can be simple string or detailed object
  }
  