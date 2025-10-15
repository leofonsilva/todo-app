import { validate } from 'class-validator';
import { CreateTaskDto } from 'src/task/application/dtos/create-task.dto';
import { CreateTaskDtoBuilder } from 'test/builders/dto/create-task.dto.builder';

describe('CreateTaskDto', () => {
  describe('Success cases', () => {
    it('should pass validation without description', async () => {
      const request = CreateTaskDtoBuilder.build({ description: undefined });
      const sut = Object.assign(new CreateTaskDto(), request);

      const errors = await validate(sut);

      expect(errors.length).toBe(0);
    });

    it('should pass validation with empty description string', async () => {
      const request = CreateTaskDtoBuilder.build({ description: '' });
      const sut = Object.assign(new CreateTaskDto(), request);

      const errors = await validate(sut);

      expect(errors.length).toBe(0);
    });
  });

  describe('Error cases', () => {
    it('should fail validation when is without title', async () => {
      const request = CreateTaskDtoBuilder.build({ title: undefined });
      const sut = Object.assign(new CreateTaskDto(), request);

      const errors = await validate(sut);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isString');
    });

    it('should fail validation when title is empty', async () => {
      const request = CreateTaskDtoBuilder.build({ title: '' });
      const sut = Object.assign(new CreateTaskDto(), request);

      const errors = await validate(sut);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
  });  
});
