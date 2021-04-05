while getopts ":i:" opt; do
  case $opt in
    i) CI_PIPELINE_ID="$OPTARG"
    ;;
    \?) echo "Invalid option -$OPTARG, example: -id gomzylocal1" >&2
    ;;
  esac
done

npm install
npm run clean
npm run build
npm run dist

export CLIENT_ID=383ad85e-4656-4806-8bea-c64f3cd6aec0
export CLIENT_SECRET=ddc24d90-eab3-4e7f-bc21-f1a60c321569
export DEFAULT_REGION=us-east-1
export PROJECT_NAME=reminder-app-nodejs
export BUCKET_NAME=elasticbeanstalk-us-east-1-716492775336
export APP_NAME=gti-beanstalk
export ENV=gti-develop
export CI_PIPELINE_ID=$CI_PIPELINE_ID

# aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
# aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
# aws configure set region $DEFAULT_REGION
# aws s3 cp build/$PROJECT_NAME.zip s3://$BUCKET_NAME/$PROJECT_NAME-$CI_PIPELINE_ID.zip
# aws elasticbeanstalk create-application-version --application-name $APP_NAME --version-label $APP_NAME-$CI_PIPELINE_ID --source-bundle S3Bucket=$BUCKET_NAME,S3Key=$PROJECT_NAME-$CI_PIPELINE_ID.zip --region $DEFAULT_REGION
# aws elasticbeanstalk update-environment --application-name $APP_NAME --environment-name $ENV --version-label $APP_NAME-$CI_PIPELINE_ID --region $DEFAULT_REGION