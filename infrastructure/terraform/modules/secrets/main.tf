resource "aws_secretsmanager_secret" "this" {
  name        = var.name
  description = "Secret for ${var.name}"  
  recovery_window_in_days = 7

  tags = merge(var.tags, { Name = "${var.name}" })
}

resource "aws_secretsmanager_secret_version" "initial" {
  secret_id     = aws_secretsmanager_secret.this.id
  secret_string = jsonencode(var.secret_data)

  lifecycle {
    ignore_changes = [secret_string]
  }
}
