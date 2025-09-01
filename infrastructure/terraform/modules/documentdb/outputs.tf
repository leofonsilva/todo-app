output "cluster_endpoint" {
  value       = aws_docdb_cluster.this.endpoint
  description = "DocumentDB cluster endpoint"
  sensitive   = true
}

output "cluster_username" {
  value       = aws_docdb_cluster.this.master_username
  description = "DocumentDB master username"
  sensitive   = true
}

output "cluster_password" {
  value       = random_password.db_password.result
  description = "DocumentDB master password"
  sensitive   = true
}

output "connection_string" {
  value       = "mongodb://${aws_docdb_cluster.this.master_username}:${random_password.db_password.result}@${aws_docdb_cluster.this.endpoint}:27017/?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false"
  description = "MongoDB connection string"
  sensitive   = true
}

output "security_group_id" {
  value       = aws_security_group.documentdb.id
  description = "DocumentDB security group ID"
}