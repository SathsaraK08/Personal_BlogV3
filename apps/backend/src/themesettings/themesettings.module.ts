import { Module } from '@nestjs/common';
import { ThemeSettingsService } from './themesettings.service';
import { ThemeSettingsController } from './themesettings.controller';

@Module({
  controllers: [ThemeSettingsController],
  providers: [ThemeSettingsService],
})
export class ThemeSettingsModule {}
