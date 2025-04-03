pipeline {
    agent any
    tools {
        nodejs 'nodejs 18.20.7'  // Tên NodeJS cài trong "Global Tool Configuration"
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
                                    sourceFiles: '**/*',  // Gửi tất cả file
                                    excludes: 'node_modules/**',  // Loại bỏ node_modules
                                    remoteDirectory: 'nodejs-jenkins',
                                    execCommand: 'source /home/aqertybds/nodevenv/nodejs-jenkins/18/bin/activate && cd /home/aqertybds/nodejs-jenkins && npm install && npm install pm2 -g && pm2 restart app || pm2 start app.js --name app'
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
            sh 'curl -s -X POST https://api.telegram.org/bot6503951829:AAHoJfF-HN858dY6E7sMTCLFBJs42uzFI4w/sendMessage -d chat_id=-1001634041658 -d text="Build ${JOB_NAME} #${BUILD_NUMBER} thành công! URL: ${BUILD_URL}"'
        }
        failure {
            sh 'curl -s -X POST https://api.telegram.org/bot6503951829:AAHoJfF-HN858dY6E7sMTCLFBJs42uzFI4w/sendMessage -d chat_id=-1001634041658 -d text="Build ${JOB_NAME} #${BUILD_NUMBER} thất bại! URL: ${BUILD_URL}"'
        }
    }
}
