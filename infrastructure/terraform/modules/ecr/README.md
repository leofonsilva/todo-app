# Módulo ECR

## Para que serve?
Cria repositórios no Elastic Container Registry (ECR) para armazenar e versionar imagens Docker das aplicações.

## Recursos criados

### ECR Repository
- **O que é**: Registro privado de containers Docker gerenciado pela AWS
- **Função**: Armazenar, versionar e distribuir imagens Docker de forma segura
- **Características**: Integração nativa com EKS, scan de vulnerabilidades, políticas de lifecycle
- **Uso típico**: Imagens Docker de aplicações, microserviços, jobs em containers

## Como usar
~~~hcl
module "ecr" {
  source = "../../modules/ecr"
  repository_names = ["backend", "frontend", "api"]
  image_tag_mutability = "MUTABLE"
  tags = {}
}
~~~

## Saídas disponíveis
- `repository_urls`: Mapa de nomes de repositórios para suas URLs
- `repository_ids`: Mapa de nomes de repositórios para seus IDs
