output "secret_arn" {
  description = "ARN do segredo criado para uso em políticas IAM"
  value       = aws_secretsmanager_secret.this.arn
}

output "secret_name" {
  description = "Nome completo do segredo criado"
  value       = aws_secretsmanager_secret.this.name
}

output "secret_short_name" {
  description = "Nome curto do segredo sem prefixo de ambiente"
  value       = var.name
  sensitive   = true
}
