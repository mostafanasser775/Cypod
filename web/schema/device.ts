import { z } from 'zod';

const MonthlyPowerConsumption = z.object({
  jan: z.string(),
  feb: z.string(),
  march: z.string(),
  april: z.string(),
  may: z.string(),
  june: z.string(),
  july: z.string(),
  august: z.string(),
  september: z.string(),
  october: z.string(),
  november: z.string(),
  december: z.string(),
});

export const DeviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['on', 'off']),
  temperature: z.string(),
  humidity: z.string(),
  lat: z.number(),
  lng: z.number(),
  totalPowerConsumption: z.union([z.string(), MonthlyPowerConsumption]),
});

export type Device = z.infer<typeof DeviceSchema>;
