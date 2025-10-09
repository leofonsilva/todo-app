output "cluster_role_arn" {
  description = "ARN da IAM role do cluster EKS"
  value       = aws_iam_role.eks_cluster.arn
}

output "node_role_arn" {
  description = "ARN da IAM role dos nodes EKS"
  value       = aws_iam_role.node.arn
}

output "admin_role_arn" {
  description = "ARN da IAM role de administradores EKS"
  value       = var.admin_assume_role_policy != null ? aws_iam_role.eks_admin[0].arn : null
}