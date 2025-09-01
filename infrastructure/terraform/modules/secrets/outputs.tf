output "secret_arn" {
  value       = aws_secretsmanager_secret.this.arn
  description = "ARN of the secret"
}

output "secret_name" {
  value       = aws_secretsmanager_secret.this.name
  description = "Full name of the secret with environment prefix"
}

output "secret_short_name" {
  value       = var.name
  description = "Short name without environment prefix"
  sensitive   = true
}
