resource "aws_eks_node_group" "this" {
  for_each = var.node_groups

  cluster_name    = var.cluster_name
  node_group_name = each.key
  node_role_arn   = each.value.node_role_arn
  subnet_ids      = var.subnet_ids

  instance_types = each.value.instance_types
  disk_size      = each.value.disk_size
  ami_type       = each.value.ami_type
  capacity_type  = each.value.capacity_type

  scaling_config {
    desired_size = each.value.desired_size
    max_size     = each.value.max_size
    min_size     = each.value.min_size
  }

  update_config {
    max_unavailable_percentage = 50
  }

  lifecycle {
    create_before_destroy = true
    ignore_changes        = [scaling_config[0].desired_size]
  }

  tags = merge(var.tags, { Name = "${var.cluster_name}-${each.key}" })
}
