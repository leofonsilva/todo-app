variable "name" {
  type        = string
  description = "Base name for DocumentDB resources"
}

variable "vpc_id" {
  type        = string
  description = "VPC ID where database will be deployed"
}

variable "vpc_cidr" {
  type        = string
  description = "CIDR block of the VPC for security group rules"
}

variable "subnet_ids" {
  type        = list(string)
  description = "List of private subnet IDs for database"
}

variable "master_username" {
  type        = string
  default     = "admin"
  description = "Master username for database"
  sensitive   = true
}

variable "instance_class" {
  type        = string
  default     = "db.t3.medium"
  description = "DB instance class (db.t3.medium, db.r5.large, etc.)"
}

variable "instance_count" {
  type        = number
  default     = 1
  description = "Number of DB instances (1 for dev, 2+ for prod)"
}

variable "backup_retention_days" {
  type        = number
  default     = 3
  description = "Backup retention period in days (3 for dev, 7+ for prod)"
}

variable "deletion_protection" {
  type        = bool
  default     = false
  description = "Enable deletion protection (false for dev, true for prod)"
}

variable "storage_encrypted" {
  type        = bool
  default     = true
  description = "Enable storage encryption (true for all environments)"
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Tags to apply to resources"
}