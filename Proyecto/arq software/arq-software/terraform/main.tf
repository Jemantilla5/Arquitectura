terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.23.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "arq_software_app" {
  name = "arq_software:latest"

  build {
    path = "../arq software"
  }

}

resource "docker_container" "arq_software_container" {
  name  = "arq_software_container"
  image = docker_image.arq_software_app.name

  ports {
    internal = 3000
    external = 3000
  }
}
