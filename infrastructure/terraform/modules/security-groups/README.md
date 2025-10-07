# Módulo Security Groups

## Para que serve?
Cria os security groups que atuam como firewall virtual para controlar o tráfego de rede entre os recursos.

## Recursos criados

### Security Group - EKS Cluster
- **O que é**: Grupo de segurança que define as regras de tráfego para o cluster EKS
- **Função**: Controlar acesso à API do Kubernetes e comunicação interna entre nodes
- **Características**: Regras para porta 443 (API), comunicação interna VPC, egress para internet
- **Uso típico**: Cluster EKS precisa deste security group para comunicação segura entre control plane e nodes

### Security Group Rules
- **Regra Internal Ingress**: Permite todo tráfego interno dentro da VPC (portas 0-0, protocolo -1)
- **Regra Allow HTTPS**: Permite acesso HTTPS à API do Kubernetes na porta 443 de qualquer IP
- **Regra Allow All Egress**: Permite todo tráfego de saída para qualquer destino

## Como usar
~~~hcl
module "security_groups" {
  source = "../../modules/security-groups"
  name = "meu-projeto"
  vpc_id = "vpc-123456"
  vpc_cidr = "10.0.0.0/16"
  tags = {}
}
~~~

## Saídas disponíveis
- `security_group_id`: ID do security group criado para uso em outros módulos
- `security_group_name`: Nome do security group criado