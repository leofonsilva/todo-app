import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsIn(['pending', 'in-progress', 'done'])
  @IsOptional()
  status?: 'pending' | 'in-progress' | 'done';
}
