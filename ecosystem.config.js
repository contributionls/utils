module.exports = {
  apps: [
    {
      name: "merge-online",
      script: "./index.js",
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "200M",
      env: {
        NODE_ENV: "production",
        MERGE_PORT: "10001"
      }
    }
  ]
};
