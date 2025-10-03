locals {
  bucket_names = { for e in var.environments : e => "lfs-todo-${e}-terraform-state" }
  table_names  = { for e in var.environments : e => "lfs-todo-${e}-terraform-locks" }
}

resource "aws_s3_bucket" "tf_state" {
  for_each      = toset(var.environments)
  bucket        = local.bucket_names[each.key]
  force_destroy = true # Definido 'true' apenas por ser um projeto de teste

  tags = {
    Name        = local.bucket_names[each.key]
    Environment = each.key
    project     = "todo-app-bootstrap"
    owner       = "leofonsilva"
    managed-by  = "terraform"
  }
}

resource "aws_s3_bucket_versioning" "tf_state" {
  for_each = toset(var.environments)
  bucket   = aws_s3_bucket.tf_state[each.key].id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "tf_state" {
  for_each = toset(var.environments)
  bucket   = aws_s3_bucket.tf_state[each.key].id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "tf_state" {
  for_each = toset(var.environments)
  bucket   = aws_s3_bucket.tf_state[each.key].id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_dynamodb_table" "tf_locks" {
  for_each     = toset(var.environments)
  name         = local.table_names[each.key]
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Environment = each.key
    project     = "todo-app-bootstrap"
    owner       = "leofonsilva"
    managed-by  = "terraform"
  }
}