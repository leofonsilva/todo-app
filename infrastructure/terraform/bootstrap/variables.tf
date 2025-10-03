variable "aws_region" {
  description = "Região AWS onde os recursos serão criados"
  type        = string
  default     = "us-east-1"
}

variable "environments" {
  description = "Lista de ambientes para os quais criar recursos de estado do Terraform"
  type        = list(string)
  default     = ["dev"] # Others: ["staging", "prod"]
  validation {
    condition     = length(var.environments) > 0 && alltrue([for e in var.environments : can(regex("^[a-z0-9-]+$", e))])
    error_message = "At least one environment must be defined."
  }
}
