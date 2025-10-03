output "state_buckets" {
  description = "Mapa dos buckets S3 criados para armazenamento de estado do Terraform"
  value       = { for k, v in aws_s3_bucket.tf_state : k => v.arn }
}

output "lock_tables" {
  description = "Mapa das tabelas DynamoDB criadas para controle de locking do Terraform"
  value       = { for k, v in aws_dynamodb_table.tf_locks : k => v.arn }
}