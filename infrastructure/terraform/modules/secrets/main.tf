# Cria segredo no AWS Secrets Manager para armazenar informações sensíveis
resource "aws_secretsmanager_secret" "this" {
  name                    = var.name
  description             = "Secret for ${var.name}"
  recovery_window_in_days = 7 # Período para recuperar segredo deletado acidentalmente

  tags = merge(var.tags, { Name = "${var.name}" })
}

# Cria versão inicial do segredo com os dados fornecidos
resource "aws_secretsmanager_secret_version" "initial" {
  secret_id     = aws_secretsmanager_secret.this.id
  secret_string = jsonencode(var.secret_data) # Converte mapa para JSON

  lifecycle {
    ignore_changes = [secret_string] # Evita recriação se dados mudarem
  }
}
