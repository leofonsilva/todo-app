output "cluster_id" {
  value       = aws_eks_cluster.this.id
  description = "ID of the EKS cluster"
}

output "cluster_name" {
  value       = aws_eks_cluster.this.name
  description = "Name of the EKS cluster"
}

output "cluster_endpoint" {
  value       = aws_eks_cluster.this.endpoint
  description = "Endpoint for the EKS cluster API server"
}

output "cluster_certificate_authority_data" {
  value       = aws_eks_cluster.this.certificate_authority[0].data
  description = "Base64 encoded certificate authority data for the cluster"
}

output "cluster_status" {
  value       = aws_eks_cluster.this.status
  description = "Status of the EKS cluster"
}

output "cluster_arn" {
  value       = aws_eks_cluster.this.arn
  description = "ARN of the EKS cluster"
}
