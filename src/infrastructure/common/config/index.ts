import { join } from 'path';
import {
  ConfigSchema,
  ConfigType,
} from 'src/infrastructure/common/config/validator';

class AppConfig {
  constructor(private readonly config: ConfigType) {}

  get isProduction() {
    return this.config.NODE_ENV === 'production';
  }

  get isDevelopment() {
    return this.config.NODE_ENV === 'development';
  }

  get isTest() {
    return this.config.NODE_ENV === 'test';
  }

  get rootPath() {
    return this.config.ROOT_PATH;
  }
}

const PROJECT_PATH = process.cwd();
const ROOT_PATH =
  process.env.NODE_ENV === 'production'
    ? join(PROJECT_PATH, 'dist')
    : PROJECT_PATH;

const defineConfig = () => {
  const validated = ConfigSchema.parse({ ...process.env, ROOT_PATH });

  return new AppConfig(validated);
};

export const Config = defineConfig();
