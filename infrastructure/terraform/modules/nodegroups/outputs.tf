output "nodegroup_ids" {
  description = "Mapa de nomes de node groups para seus IDs"
  value = {
    for name, group in aws_eks_node_group.this :
    name => group.id
  }
}

output "nodegroup_arns" {
  description = "Mapa de nomes de node groups para seus ARNs"
  value = {
    for name, group in aws_eks_node_group.this :
    name => group.arn
  }
}

output "nodegroup_statuses" {
  description = "Mapa de nomes de node groups para seus status"
  value = {
    for name, group in aws_eks_node_group.this :
    name => group.status
  }
}