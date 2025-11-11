output "cluster_endpoint" {
  description = "Endpoint do cluster DocumentDB para conexão"
  value       = aws_docdb_cluster.this.endpoint
  sensitive   = true
}

output "cluster_username" {
  description = "Nome de usuário master do DocumentDB"
  value       = aws_docdb_cluster.this.master_username
  sensitive   = true
}

output "cluster_password" {
  description = "Senha master do DocumentDB gerada automaticamente"
  value       = random_password.db_password.result
  sensitive   = true
}

output "connection_string" {
  description = "String de conexão MongoDB completa para aplicação"
  value       = "mongodb://${aws_docdb_cluster.this.master_username}:${random_password.db_password.result}@${aws_docdb_cluster.this.endpoint}:27017/?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false"
  sensitive   = true
}

output "security_group_id" {
  description = "ID do security group criado para o DocumentDB"
  value       = aws_security_group.documentdb.id
}
