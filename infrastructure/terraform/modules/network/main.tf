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

# Cria Internet Gateway para conectar a VPC à internet
resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.this.id
  tags   = merge(var.tags, { Name = "${var.name}-igw" })
}

# Cria Elastic IPs para os NAT Gateways
resource "aws_eip" "nat" {
  count  = length(var.public_subnets_cidrs)
  domain = "vpc"
  tags   = merge(var.tags, { Name = "${var.name}-nat-eip-${count.index}" })
}

# Cria NAT Gateways para permitir que recursos em subnets privadas acessem internet
resource "aws_nat_gateway" "this" {
  count         = length(var.public_subnets_cidrs)
  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id
  tags          = merge(var.tags, { Name = "${var.name}-nat-gw-${count.index}" })

  depends_on = [aws_internet_gateway.this]
}

# Cria Route Table pública com rota para Internet Gateway
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.this.id
  tags   = merge(var.tags, { Name = "${var.name}-public-rt" })
}

# Adiciona rota para internet na Route Table pública
resource "aws_route" "public_internet" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.this.id
}

# Associa subnets públicas à Route Table pública
resource "aws_route_table_association" "public" {
  count          = length(var.public_subnets_cidrs)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# Cria Route Tables privadas com rotas para NAT Gateways
resource "aws_route_table" "private" {
  count  = length(var.private_subnets_cidrs)
  vpc_id = aws_vpc.this.id
  tags   = merge(var.tags, { Name = "${var.name}-private-rt-${count.index}" })
}

# Adiciona rota para internet via NAT Gateway nas Route Tables privadas
resource "aws_route" "private_internet" {
  count                  = length(var.private_subnets_cidrs)
  route_table_id         = aws_route_table.private[count.index].id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.this[count.index % length(aws_nat_gateway.this)].id
}

# Associa subnets privadas às Route Tables privadas
resource "aws_route_table_association" "private" {
  count          = length(var.private_subnets_cidrs)
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}