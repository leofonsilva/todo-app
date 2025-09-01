variable "cluster_name" {
  type        = string
  description = "Name of the EKS cluster"
}

variable "cluster_role_arn" {
  type        = string
  description = "ARN of the IAM role for the EKS cluster"
}

variable "subnet_ids" {
  type        = list(string)
  description = "List of subnet IDs where the EKS cluster will be deployed"
}

variable "security_group_ids" {
  type        = list(string)
  description = "List of security group IDs for the EKS cluster"
  default     = []
}

variable "cluster_version" {
  type        = string
  description = "Kubernetes version for the EKS cluster"
  default     = "1.27"
}

variable "endpoint_private_access" {
  type        = bool
  description = "Whether the Kubernetes API endpoint is privately accessible"
  default     = false
}

variable "endpoint_public_access" {
  type        = bool
  description = "Whether the Kubernetes API endpoint is publicly accessible"
  default     = true
}

variable "enabled_cluster_log_types" {
  type        = list(string)
  description = "List of log types to enable for the EKS cluster"
  default     = ["api", "audit", "authenticator"]
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to the EKS cluster"
  default     = {}
}
