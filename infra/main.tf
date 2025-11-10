terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

resource "docker_image" "backend" {
  name = "noteapp-backend"
}

resource "docker_container" "backend" {
  name  = "backend"
  image = docker_image.backend.name
  ports {
    internal = 5000
    external = 5000
  }
}

resource "docker_image" "frontend" {
  name = "noteapp-frontend"
}

resource "docker_container" "frontend" {
  name  = "frontend"
  image = docker_image.frontend.name
  ports {
    internal = 3000
    external = 3000
  }
}
