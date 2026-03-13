import { validate } from 'class-validator';
import { UpdateTaskDto } from 'src/modules/task/application/dtos/update-task.dto';
import { UpdateTaskDtoBuilder } from 'test/support/builders/dto/update-task.dto.builder';

describe('UpdateTaskDto', () => {
  describe('Success cases', () => {
    it('should pass validation without description', async () => {
      const request = UpdateTaskDtoBuilder.build({ description: undefined });
      const sut = Object.assign(new UpdateTaskDto(), request);

      const errors = await validate(sut);

      expect(errors.length).toBe(0);
    });

    it('should pass validation with empty description string', async () => {
      const request = UpdateTaskDtoBuilder.build({ description: '' });
      const sut = Object.assign(new UpdateTaskDto(), request);

      const errors = await validate(sut);

      expect(errors.length).toBe(0);
    });

    it('should pass validation without status', async () => {
      const request = UpdateTaskDtoBuilder.build({ status: undefined });
      const sut = Object.assign(new UpdateTaskDto(), request);

      const errors = await validate(sut);

      expect(errors.length).toBe(0);
    });

    it('should pass validation with valid status', async () => {
      const request = UpdateTaskDtoBuilder.build({ status: 'in-progress' });
      const sut = Object.assign(new UpdateTaskDto(), request);

      const errors = await validate(sut);

      expect(errors.length).toBe(0);
    });
  });

  describe('Error cases', () => {
    it('should fail validation when is without title', async () => {
      const request = UpdateTaskDtoBuilder.build({ title: undefined });
      const sut = Object.assign(new UpdateTaskDto(), request);

      const errors = await validate(sut);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
      expect(errors[0].constraints).toHaveProperty('isString');
    });

    it('should fail validation when title is empty', async () => {
      const request = UpdateTaskDtoBuilder.build({ title: '' });
      const sut = Object.assign(new UpdateTaskDto(), request);

      const errors = await validate(sut);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should fail validation when status is invalid', async () => {
      const request = UpdateTaskDtoBuilder.build({ status: 'invalid-status' as any });
      const sut = Object.assign(new UpdateTaskDto(), request);

      const errors = await validate(sut);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isIn');
    });
  });
});