pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
              checkout scm
              app = docker.build("getintodevops/hellonode")
            }
        }
        
        stage('Test') {
            steps {

            }
        }
        
        stage('Code Quality Analysis') {
            steps {

            }
        }
        
        stage('Deploy') {
            steps {

            }
        }
        
        stage('Release') {
            steps {

            }
        }
        
        stage('Monitoring and Alerting') {
            steps {

            }
        }
    }
}
