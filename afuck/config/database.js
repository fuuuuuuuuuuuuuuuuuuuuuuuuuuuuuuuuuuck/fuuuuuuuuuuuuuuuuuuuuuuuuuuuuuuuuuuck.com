const database = {
    test: {
        username: process.env.DATABASE_USERNAME_TEST || '',
        password: process.env.DATABASE_PASSWORD_TEST || '',
        database: process.env.DATABASE_NAME_TEST || '',
        host: process.env.DATABASE_HOST_TEST || '127.0.0.1',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    },
    development: {
        username: process.env.DATABASE_USERNAME_DEV || 'root',
        password: process.env.DATABASE_PASSWORD_DEV || 'zeroiice',
        database: process.env.DATABASE_NAME_DEV || 'afuck',
        host: process.env.DATABASE_HOST_DEV || '127.0.0.1',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    },
    production: {
        username: process.env.DATABASE_USERNAME_PRO || 'root',
        password: process.env.DATABASE_PASSWORD_PRO || 'zeroiice',
        database: process.env.DATABASE_NAME_PRO || 'afuck',
        host: process.env.DATABASE_HOST_PRO || '127.0.0.1',
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 5,
            idle: 30000
        }
    }
}

module.exports = database