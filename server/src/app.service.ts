import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs';
import { CreateApiBlockDto, GetApiBlockDto } from './dto';

@Injectable()
export class AppService {
  async getAll(): Promise<GetApiBlockDto[]> {
    return this.readFile();
  }

  async getOne(id: string): Promise<GetApiBlockDto | null> {
    const data = await this.readFile();
    const instance = data.find((item) => item.id === id);
    if (instance) {
      return instance;
    }
    return null;
  }

  async createOne(createDto: CreateApiBlockDto): Promise<GetApiBlockDto> {
    const result = { ...createDto, id: Date.now().toString() };
    const currentData = await this.readFile();
    await this.writeFile([...currentData, result]);
    return result;
  }

  private async readFile(): Promise<GetApiBlockDto[] | []> {
    const localReadFunc: () => Promise<string> = () => {
      return new Promise((resolve, reject) => {
        readFile('database.json', 'utf8', (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      });
    };
    const data = await localReadFunc();
    return JSON.parse(data || '[]') || [];
  }

  private async writeFile(data: GetApiBlockDto[]): Promise<void> {
    const rawData = JSON.stringify(data);
    return new Promise((resolve, reject) => {
      writeFile('database.json', rawData, 'utf8', (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}
