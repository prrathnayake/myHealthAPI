pipeline {
    agent any
    
    environment {
        GIT_REPO_URL = 'https://github.com/prrathnayake/myHealthAPI.git'
        DOCKER_REGISTRY = 'https://hub.docker.com'
        IMAGE_NAME = 'myHealthAPI'
    }
    
    stages {
        stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', credentialsId: 'your-credentials-id', url: "${env.GIT_REPO_URL}"
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    docker.build("${env.IMAGE_NAME}", ".")
                    
                    // Push Docker image to registry
                    docker.withRegistry("${env.DOCKER_REGISTRY}", 'dckr_pat_oLT4Wesix76Ez20nmoFmQD--ciI') {
                        docker.image("${env.IMAGE_NAME}").push('latest')
                    }
                }
            }
        }
    }
}
