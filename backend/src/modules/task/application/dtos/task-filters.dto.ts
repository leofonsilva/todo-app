import { IsOptional, IsIn, IsString, IsInt, Min, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer'; // Importante usar quando é query nos tipos que são diferentes de string

export class TaskFiltersDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['pending', 'in-progress', 'done'])
  status?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isCompleted?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsIn(['createdAt', 'updatedAt', 'title'])
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: string = 'desc';
}
