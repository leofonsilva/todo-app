variable "name" {
  description = "Nome base para todos os recursos IAM"
  type        = string
}

variable "cluster_assume_role_policy" {
  description = "Assume role policy para a role do cluster EKS"
  type        = string
}

variable "node_assume_role_policy" {
  description = "Assume role policy para a role dos nodes EKS"
  type        = string
}

variable "admin_assume_role_policy" {
  description = "Assume role policy para a role de administradores EKS"
  type        = string
  default     = null
}

variable "tags" {
  description = "Tags comuns para todos os recursos"
  type        = map(string)
  default     = {}
}