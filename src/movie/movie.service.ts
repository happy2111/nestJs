import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";

@Injectable()
export class MovieService {
  constructor(private readonly userService: UserService) {

  }
  async test() {
    return this.userService.test()
  }
}
