output "cluster_id" {
  description = "ID do cluster EKS criado"
  value       = aws_eks_cluster.this.id
}

output "cluster_name" {
  description = "Nome do cluster EKS"
  value       = aws_eks_cluster.this.name
}

output "cluster_endpoint" {
  description = "Endpoint do servidor da API do cluster EKS"
  value       = aws_eks_cluster.this.endpoint
}

output "cluster_certificate_authority_data" {
  description = "Dados da autoridade certificadora em base64 para autenticação no cluster"
  value       = aws_eks_cluster.this.certificate_authority[0].data
}

output "cluster_status" {
  description = "Status atual do cluster EKS"
  value       = aws_eks_cluster.this.status
}

output "cluster_arn" {
  description = "ARN completo do cluster EKS"
  value       = aws_eks_cluster.this.arn
}
