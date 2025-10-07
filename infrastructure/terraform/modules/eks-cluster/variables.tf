variable "cluster_name" {
  description = "Nome do cluster EKS"
  type        = string
}

variable "cluster_role_arn" {
  description = "ARN da role IAM para o cluster EKS"
  type        = string
}

variable "subnet_ids" {
  description = "Lista de IDs das subnets onde o cluster EKS será implantado"
  type        = list(string)
}

variable "security_group_ids" {
  description = "Lista de IDs dos security groups para o cluster EKS"
  type        = list(string)
  default     = []
}

variable "cluster_version" {
  description = "Versão do Kubernetes para o cluster EKS"
  type        = string
  default     = "1.29"
}

variable "endpoint_private_access" {
  description = "Se o endpoint da API Kubernetes é acessível privadamente"
  type        = bool
  default     = false
}

variable "endpoint_public_access" {
  description = "Se o endpoint da API Kubernetes é acessível publicamente"
  type        = bool
  default     = true
}

variable "enabled_cluster_log_types" {
  description = "Lista de tipos de log para habilitar no cluster EKS"
  type        = list(string)
  default     = ["api", "audit", "authenticator"]
}

variable "tags" {
  description = "Tags para aplicar ao cluster EKS"
  type        = map(string)
  default     = {}
}
