pipeline {
    agent any
    tools {
        nodejs 'NodeJS'  // Tên NodeJS cài trong "Global Tool Configuration"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'ls -la'  // Kiểm tra file
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'echo "Building app..."'
                // Có thể thêm bước build nếu cần (như webpack)
            }
        }
        stage('Deploy') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'pbf42',  // Tên SSH server trong cấu hình Jenkins
                            transfers: [
                                sshTransfer(
                                    sourceFiles: '**/*',
                                    remoteDirectory: 'nodejs-jenkins',
                                    execCommand: 'source /home/aqertybds/nodevenv/nodejs-jenkins/18/bin/activate && cd /home/aqertybds/nodejs-jenkins && npm install && pm2 restart app || pm2 start server.js --name 
app'
                                )
                            ],
                            verbose: true
                        )
                    ]
                )
            }
        }
    }
    post {
        success {
            sh 'curl -s -X POST https://api.telegram.org/bot8180694857:AAGcZY_A-cp3Lc8tXiL2N7U1MVGBBGr8EaY/sendMessage -d 
chat_id=1300039362 -d text="Build ${JOB_NAME} #${BUILD_NUMBER} thành công! URL: ${BUILD_URL}"'
        }
        failure {
            sh 'curl -s -X POST https://api.telegram.org/bot8180694857:AAGcZY_A-cp3Lc8tXiL2N7U1MVGBBGr8EaY/sendMessage -d 
chat_id=1300039362 -d text="Build ${JOB_NAME} #${BUILD_NUMBER} thất bại! URL: ${BUILD_URL}"'
        }
    }
}
