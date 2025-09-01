variable "name" {
  type        = string
  description = "Name of the secret (without environment prefix)"
}

variable "secret_data" {
  type        = map(string)
  description = "Secret key-value pairs"
  sensitive   = true
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Tags to apply to resources"
}
