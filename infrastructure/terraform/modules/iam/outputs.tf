output "cluster_role_arn" {
  description = "ARN da IAM role criada para o cluster EKS"
  value       = aws_iam_role.eks_cluster.arn
}

output "node_role_arn" {
  description = "ARN da IAM role criada para os nodes EKS (vazio se create_node_role = false)"
  value       = length(aws_iam_role.node) > 0 ? aws_iam_role.node[0].arn : ""
}
