# Cria a VPC (Rede Virtual Privada) para isolamento da infraestrutura
resource "aws_vpc" "this" {
  cidr_block = var.vpc_cidr
  tags       = merge(var.tags, { Name = "${var.name}-vpc" })
}

# Cria subnets privadas para recursos internos como EKS e banco de dados
resource "aws_subnet" "private" {
  count                   = length(var.private_subnets_cidrs)
  vpc_id                  = aws_vpc.this.id
  cidr_block              = var.private_subnets_cidrs[count.index]
  availability_zone       = element(var.azs, count.index)
  map_public_ip_on_launch = false
  tags = merge(var.tags, {
    Name                              = "${var.name}-private-${count.index}"
    "kubernetes.io/role/internal-elb" = "1"
  })
}

# Cria subnets públicas para recursos externos como Load Balancers
resource "aws_subnet" "public" {
  count                   = length(var.public_subnets_cidrs)
  vpc_id                  = aws_vpc.this.id
  cidr_block              = var.public_subnets_cidrs[count.index]
  availability_zone       = element(var.azs, count.index)
  map_public_ip_on_launch = true
  tags = merge(var.tags, {
    Name                     = "${var.name}-public-${count.index}"
    "kubernetes.io/role/elb" = "1"
  })
}
