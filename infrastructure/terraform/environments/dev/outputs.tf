output "vpc_id" {
  description = "ID da VPC criada"
  value       = module.network.vpc_id
}

output "eks_cluster_name" {
  description = "Nome do cluster EKS para referência e comandos AWS CLI"
  value       = module.eks.cluster_name
}

output "eks_cluster_endpoint" {
  description = "Endpoint da API do Kubernetes para configurar kubectl"
  value       = module.eks.cluster_endpoint
  sensitive   = true
}

# TODO: Necessário verificar daqui para baixo
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
