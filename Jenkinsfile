pipeline {
  agent any

  tools {nodejs "node"}

  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/anhnguyenbstock/provider-example'
        script {
              if(isUnix()){
                  sh 'npm install'
                }
              else {
                  bat 'npm install'
                }
            }
      }
    }

    stage('Verify contract and send result to broker') {
        steps {
            script{
             if(isUnix()){
                  sh 'npm run test:pact'
              }
              else {
                  bat 'npm run test:pact'
              }
            }
        }
    }

    stage('Can-I-Deploy Server') {
        steps {
            script {
              if(isUnix()){
                  sh 'npx pact-broker can-i-deploy --pacticipant Provider-cicd --latest --broker-base-url $PACT_BROKER_URL --broker-token $PACT_BROKER_TOKEN'
                }
              else {
                  bat 'npx pact-broker can-i-deploy --pacticipant Provider-cicd --latest master --broker-base-url $PACT_BROKER_URL --broker-token $PACT_BROKER_TOKEN'
                }
            }
        }
    }
  }
}