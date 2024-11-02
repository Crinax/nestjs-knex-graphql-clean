import { z } from 'zod';

export const ConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  ROOT_PATH: z.string(),
});

export type ConfigType = z.infer<typeof ConfigSchema>;
