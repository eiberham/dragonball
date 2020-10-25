module.exports = {
    aws: {
        key: "YOUR_ACCESS_KEY",
        secret: "YOUR_ACCESS_SECRET",
        ses: {
            from: {
                // replace with actual email address
                default: '"Example.com" <noreply@example.com>'
            },
            // e.g. us-west-2
            region: "us-east-1"
        }
    },
    redis: {
        host: "localhost", //redis
        port: 6379
    }
};
