output "repository_urls" {
  value = {
    for repo_name, repo in aws_ecr_repository.this : repo_name => repo.repository_url
  }
  description = "Map of repository names to their URLs"
}

output "repository_ids" {
  value = {
    for repo_name, repo in aws_ecr_repository.this : repo_name => repo.id
  }
}
