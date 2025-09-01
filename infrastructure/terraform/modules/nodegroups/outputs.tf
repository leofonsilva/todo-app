output "nodegroup_ids" {
  value = {
    for name, group in aws_eks_node_group.this :
    name => group.id
  }
  description = "Map of node group names to their IDs"
}

output "nodegroup_arns" {
  value = {
    for name, group in aws_eks_node_group.this :
    name => group.arn
  }
  description = "Map of node group names to their ARNs"
}

output "nodegroup_statuses" {
  value = {
    for name, group in aws_eks_node_group.this :
    name => group.status
  }
  description = "Map of node group names to their statuses"
}