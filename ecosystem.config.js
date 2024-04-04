module.exports = {
  apps: [
    {
      name: 'core_bff',
      script: 'npm start',
    },
  ],

  deploy: {
    hun_stg_be: {
      key: '~/.ssh/core-bff/id_rsa',
      user: 'root',
      ssh_options: 'IdentitiesOnly=true',
      host: '128.199.255.176',
      ref: 'origin/main',
      repo: 'git@github.com:lamquangmanh/core-bff.git',
      path: '/data/sources/cyberlogitec/core-bff',
      'post-deploy': `source ~/.nvm/nvm.sh && npm install && pm2 reload ecosystem.config.js`,
    },
  },
};
