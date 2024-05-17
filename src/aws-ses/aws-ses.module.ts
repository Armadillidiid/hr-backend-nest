import { type DynamicModule, Module, type ModuleMetadata } from '@nestjs/common';
import { AwsSESService } from '../email/services/aws-ses.service.js';

@Module({})
export class ConfigModule {
  static registerAsync(options: Record<string, any>): DynamicModule {
    const imports: ModuleMetadata["imports"] = [];

    return {
      module: ConfigModule,
      imports,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        AwsSESService,
      ],
      exports: [AwsSESService],
    };
  }
}
