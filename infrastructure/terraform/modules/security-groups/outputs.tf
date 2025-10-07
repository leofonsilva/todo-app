output "security_group_id" {
  description = "ID do security group criado para o EKS"
  value       = aws_security_group.this.id
}

output "security_group_name" {
  description = "Nome do security group criado para o EKS"
  value       = aws_security_group.this.name
}
