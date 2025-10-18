import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { UserModule } from '../user/user.module';
@Module({
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
