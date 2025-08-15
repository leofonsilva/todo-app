output "state_buckets" {
  description = "Map of created S3 buckets"
  value       = { for k, v in aws_s3_bucket.tf_state : k => v.arn }
}

output "lock_tables" {
  description = "Map of created DynamoDB tables"
  value       = { for k, v in aws_dynamodb_table.tf_locks : k => v.arn }
}