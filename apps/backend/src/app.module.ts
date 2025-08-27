import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { SeoModule } from './seo/seo.module';
import { ThemeSettingsModule } from './themesettings/themesettings.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    SeoModule,
    ThemeSettingsModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
