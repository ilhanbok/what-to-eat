const config = () => {
    return {
        s3: {
            REGION: "YOUR_S3_UPLOADS_BUCKET_REGION",
            BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME"
        },
        apiGateway: {
            REGION: "YOUR_API_GATEWAY_REGION",
            URL: "YOUR_API_GATEWAY_URL"
        },
        cognito: {
            REGION: "us-east-2",
            USER_POOL_ID: "us-east-2_wojybVhRi",
            APP_CLIENT_ID: "7b8n23vtqqbfk12mm00dfc1bj7",
            IDENTITY_POOL_ID: "YOUR_IDENTITY_POOL_ID"
        }
    }
}
export default config