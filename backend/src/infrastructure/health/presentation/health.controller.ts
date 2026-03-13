import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, MongooseHealthIndicator, MemoryHealthIndicator, DiskHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mongoose: MongooseHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) { }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Só o que importa: banco de dados
      () => this.mongoose.pingCheck('database'),
      // Memória (opcional, mas útil)
      () => this.memory.checkHeap('memory', 200 * 1024 * 1024),
      // Disco (opcional)
      () => this.disk.checkStorage('disk', { path: '/', thresholdPercent: 0.9 }),
    ]);
  }

  @Get('live')
  @HealthCheck()
  live() {
    return this.health.check([
      // Liveness: só verifica se o processo está vivo
      () => Promise.resolve({ app: { status: 'up' } }),
    ]);
  }

  @Get('ready')
  @HealthCheck()
  ready() {
    return this.health.check([
      // Readiness: verifica dependências críticas como banco
      () => this.mongoose.pingCheck('database'),
    ]);
  }
}
