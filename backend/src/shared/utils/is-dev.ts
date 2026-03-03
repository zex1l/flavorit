import { ConfigService } from "@nestjs/config";

export function isDev(configService: ConfigService): boolean {
  return configService.get<string>('MODE') === 'development';
}