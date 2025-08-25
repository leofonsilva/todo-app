variable "repository_names" {
  type        = list(string)
  description = "List of ECR repository names to create"
  default     = []
}

variable "image_tag_mutability" {
  type        = string
  default     = "MUTABLE"
}

variable "tags" {
  type        = map(string)
  default     = {}
}
