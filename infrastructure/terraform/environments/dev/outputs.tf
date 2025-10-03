output "vpc_id" {
  description = "ID da VPC criada"
  value       = module.network.vpc_id
}

# TODO: Necessário verificar daqui para baixo
output "eks_cluster_name" {
  value       = module.eks.cluster_name
  description = "EKS Cluster Name"
}

output "eks_cluster_endpoint" {
  value       = module.eks.cluster_endpoint
  description = "EKS API Server Endpoint"
}

output "documentdb_endpoint" {
  value       = module.documentdb.cluster_endpoint
  description = "DocumentDB endpoint"
  sensitive   = true
}

output "secret_arn" {
  value       = module.db_secret.secret_arn
  description = "Database secret ARN"
}

output "ecr_repository_urls" {
  value       = module.ecr.repository_urls
  description = "ECR Repository URLs"
}
