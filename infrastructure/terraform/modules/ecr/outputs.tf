output "repository_urls" {
  description = "Mapa de nomes de repositórios para suas URLs completas"
  value = {
    for repo_name, repo in aws_ecr_repository.this : repo_name => repo.repository_url
  }
}

output "repository_ids" {
  description = "Mapa de nomes de repositórios para seus IDs"
  value = {
    for repo_name, repo in aws_ecr_repository.this : repo_name => repo.id
  }
}
