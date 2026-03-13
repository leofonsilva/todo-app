import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/domain/entities/user.entity';

export class JwtGeneratorHelper {
  private jwtService: JwtService;

  constructor() {
    this.jwtService = new JwtService({
      secret: process.env.JWT_SECRET || 'test-secret-key',
      signOptions: { expiresIn: '1h' }
    });
  }

  generateForUser(user: User): string {
    const payload = { 
      sub: user.id,
      email: user.email 
    };
    
    return this.jwtService.sign(payload);
  }

  generateInvalidToken(): string {
    return 'invalid-token';
  }
}