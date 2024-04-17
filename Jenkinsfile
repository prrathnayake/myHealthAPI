pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'https://hub.docker.com/u/prrathnayake'
        IMAGE_NAME = 'myHealthAPI'
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    docker.build("${env.IMAGE_NAME}", ".")
                    
                    // Push Docker image to registry
                    docker.withRegistry("${env.DOCKER_REGISTRY}", 'docker-credentials-id') {
                        docker.image("${env.IMAGE_NAME}").push('latest')
                    }
                }
            }
        }
    }
}
