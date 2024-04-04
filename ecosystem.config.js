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
      user: 'admin',
      ssh_options: 'IdentitiesOnly=true',
      host: '3.115.190.197',
      ref: 'origin/dev',
      repo: 'git@abc.git',
      path: '/data/sources/cyberlogitec/core-bff',
      'post-deploy': `source ~/.nvm/nvm.sh && npm install && pm2 reload ecosystem.config.js`,
    },
  },
};
