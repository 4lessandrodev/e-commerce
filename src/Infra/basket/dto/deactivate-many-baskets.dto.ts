import { IsOptional, IsUUID } from 'class-validator';

export class DeactivateManyBasketsDto {
  @IsOptional()
  @IsUUID('4', { each: true })
  basketsIds?: string[];
}
