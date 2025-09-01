variable "cluster_name" {
  type        = string
  description = "Name of the EKS cluster"
}

variable "subnet_ids" {
  type        = list(string)
  description = "List of subnet IDs for the node groups"
}

variable "node_groups" {
  type = map(object({
    node_role_arn  = string
    desired_size   = number
    min_size       = number
    max_size       = number
    instance_types = list(string)
    disk_size      = optional(number, 20)
    ami_type       = optional(string, "AL2_x86_64")
    capacity_type  = optional(string, "ON_DEMAND")
  }))
  description = "Map of node group configurations"
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to resources"
  default     = {}
}
