output "cluster_role_arn" { 
  value = aws_iam_role.eks_cluster.arn 
}

output "node_role_arn" { 
  value = length(aws_iam_role.node) > 0 ? aws_iam_role.node[0].arn : "" 
}
