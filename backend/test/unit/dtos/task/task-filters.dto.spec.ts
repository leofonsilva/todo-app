import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { TaskFiltersDto } from 'src/task/application/dtos/task-filters.dto';
import { TaskFiltersDtoBuilder } from 'test/support/builders/dto/task-filters.dto.builder';

describe('TaskFiltersDto', () => {
  describe('Success cases', () => {
    it('should pass validation with empty filters', async () => {
      const request = TaskFiltersDtoBuilder.build();
      const sut = plainToClass(TaskFiltersDto, request);
      expect((await validate(sut)).length).toBe(0);
    });

    it('should pass validation with valid data', async () => {
      const request = TaskFiltersDtoBuilder.build({ 
        search: 'test', 
        status: 'done', 
        page: 2, 
        limit: 20 
      });
      const sut = plainToClass(TaskFiltersDto, request);
      expect((await validate(sut)).length).toBe(0);
    });

    it('should convert query params to correct types', async () => {
      const request = { page: '2', limit: '10', isCompleted: 'true' };
      const sut = plainToClass(TaskFiltersDto, request);
      
      const errors = await validate(sut);
      
      expect(errors.length).toBe(0);
      expect(sut.page).toBe(2);
      expect(sut.limit).toBe(10);
      expect(sut.isCompleted).toBe(true);
    });
  });

  describe('Error cases', () => {
    it('should fail validation with invalid status', async () => {
      const request = TaskFiltersDtoBuilder.build({ status: 'invalid-status' as any });
      const sut = plainToClass(TaskFiltersDto, request);
      const errors = await validate(sut);
      
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isIn');
    });

    it('should fail validation with invalid page', async () => {
      const request = TaskFiltersDtoBuilder.build({ page: 0 });
      const sut = plainToClass(TaskFiltersDto, request);
      const errors = await validate(sut);
      
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('min');
    });

    it('should fail validation with invalid limit', async () => {
      const request = TaskFiltersDtoBuilder.build({ limit: 0 });
      const sut = plainToClass(TaskFiltersDto, request);
      const errors = await validate(sut);
      
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('min');
    });
  });
});
