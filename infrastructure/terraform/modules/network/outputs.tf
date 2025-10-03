output "vpc_id" {
  description = "ID da VPC criada"
  value       = aws_vpc.this.id
}

output "vpc_cidr" {
  description = "CIDR block da VPC"
  value       = aws_vpc.this.cidr_block
}

output "private_subnets" {
  description = "IDs das subnets privadas"
  value       = aws_subnet.private[*].id
}

output "public_subnets" {
  description = "IDs das subnets públicas"
  value       = aws_subnet.public[*].id
}
