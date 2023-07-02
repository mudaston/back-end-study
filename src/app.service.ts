import { Injectable } from '@nestjs/common';

const delay = (time: number) => new Promise((res) => setTimeout(res, time));

@Injectable()
export class AppService {
  async getName(): Promise<string> {
    await delay(1000);

    const name = 'фцвфцв';

    return name;
  }
}
