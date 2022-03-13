export class CreateApiBlockDto {
  readonly name: string;
  readonly baseUrl: string;
  readonly endpoint: string;
  readonly method: string;
  readonly headers: string;
  readonly body: string;
  readonly query: string;
}
