{
  "apps": [{
    "name": "magic-bus-app",
    "script": "server.js",
    "instances": 1,
    "exec_mode": "cluster",
    "env": {
      "NODE_ENV": "production",
      "PORT": 8080
    },
    "error_file": "/tmp/pm2-error.log",
    "out_file": "/tmp/pm2-out.log",
    "log_file": "/tmp/pm2-combined.log",
    "time": true
  }]
}
