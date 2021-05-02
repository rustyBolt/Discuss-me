module.exports={
    "name": "default",
    "type": "postgres",
    "url": process.env.URL,
    "synchronize": true,
    "logging": true,
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "ssl": true,
    "extra": {
      "ssl": {
        "rejectUnauthorized": false
      }
    }
  }