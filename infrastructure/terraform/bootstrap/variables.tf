variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "environments" {
  type    = list(string)
  default = ["dev"] # Others: ["staging", "prod"]
  validation {
    condition     = length(var.environments) > 0 && alltrue([for e in var.environments : can(regex("^[a-z0-9-]+$", e))])
    error_message = "At least one environment must be defined."
  }
}
