variable "name" {
  type        = string
  description = "Base name for security group"
}

variable "vpc_id" {
  type        = string
  description = "VPC ID where security group will be created"
}

variable "vpc_cidr" {
  type        = string
  description = "VPC CIDR block for internal communication"
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Tags to apply to resources"
}
