# Módulo Network

## Para que serve?
Cria a infraestrutura de rede base (VPC e subnets) para aplicações na AWS.

## Recursos criados

### VPC (Virtual Private Cloud)
- **O que é**: Rede virtual isolada que funciona como um data center virtual na nuvem
- **Função**: Isolamento completo da rede e controle de espaço IP privado
- **Características**: Define o bloco CIDR principal (ex: 10.0.0.0/16) e gerencia o roteamento interno
- **Uso típico**: Base para todos os outros serviços AWS na região

### Subnets Privadas
- **O que é**: Sub-redes sem acesso direto à internet
- **Função**: Hospedar recursos que não precisam de acesso direto à internet
- **Características**: `map_public_ip_on_launch = false`, tag `kubernetes.io/role/internal-elb = "1"`
- **Uso típico**: Instâncias EKS, bancos de dados RDS/DocumentDB, serviços backend

### Subnets Públicas
- **O que é**: Sub-redes com acesso à internet
- **Função**: Hospedar recursos que precisam de acesso à internet
- **Características**: `map_public_ip_on_launch = true`, tag `kubernetes.io/role/elb = "1"`
- **Uso típico**: Load Balancers Application/Network, NAT Gateways, bastion hosts

## Como usar
~~~hcl
module "network" {
  source = "../../modules/network"
  name = "meu-projeto"
  vpc_cidr = "10.0.0.0/16"
  private_subnets_cidrs = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets_cidrs = ["10.0.101.0/24", "10.0.102.0/24"]
  azs = ["us-east-1a", "us-east-1b"]
  tags = {}
}
~~~

## Saídas disponíveis
- `vpc_id`: ID da VPC criada para uso em outros módulos
- `vpc_cidr`: Bloco CIDR da VPC para regras de security groups
- `private_subnets`: Lista de IDs das subnets privadas
- `public_subnets`: Lista de IDs das subnets públicas