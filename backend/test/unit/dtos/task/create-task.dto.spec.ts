import { validate } from 'class-validator';
import { CreateTaskDto } from 'src/task/application/dtos/create-task.dto';
import { CreateTaskRequestBuilder } from 'test/builders/requests/create-task-request.builder';

describe('CreateTaskDto', () => {

  it('should pass validation without description', async () => {
    // Arrange
    const request = CreateTaskRequestBuilder.buildWithoutDescription();
    const dto = Object.assign(new CreateTaskDto(), request);

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBe(0);
  });

  it('should pass validation with empty description string', async () => {
    // Arrange
    const request = CreateTaskRequestBuilder.buildWithEmptyDescription();
    const dto = Object.assign(new CreateTaskDto(), request);

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBe(0);
  });

  it('should fail validation when title is empty', async () => {
    // Arrange
    const request = CreateTaskRequestBuilder.buildEmptyTitle();
    const dto = Object.assign(new CreateTaskDto(), request);

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });
});
