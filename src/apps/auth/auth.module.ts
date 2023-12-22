import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthProvider } from '_common/auth/provider.service';
import { AuthCommonModule } from '_common/auth/auth.module';
import { AuthJwtStrategy } from './strategy/auth.strategy';

@Module({
  imports: [
    AuthCommonModule
  ],
  controllers: [AuthController],
  providers: [AuthController,AuthService,AuthJwtStrategy ],
  exports: [AuthController],
})
export class AuthAppsModule {}
