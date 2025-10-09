variable "cluster_name" {
  description = "Nome do cluster EKS"
  type        = string
}

variable "subnet_ids" {
  description = "Lista de IDs das subnets para os node groups"
  type        = list(string)
}

variable "node_groups" {
  description = "Mapa de configurações dos node groups"
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
}

variable "tags" {
  description = "Tags para aplicar aos recursos"
  type        = map(string)
  default     = {}
}
