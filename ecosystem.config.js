module.exports = {
  apps: [
    {
      name: 'core_bff_fcm',
      script: 'npm start',
    },
  ],

  deploy: {
    core_bff_fcm: {
      key: '~/.ssh/core-bff/id_rsa',
      user: 'root',
      ssh_options: 'IdentitiesOnly=true',
      host: '128.199.225.176',
      ref: 'origin/main',
      repo: 'git@github.com:lamquangmanh/core-bff.git',
      path: '/data/sources/cyberlogitec/core-bff',
      'post-deploy': `source ~/.nvm/nvm.sh && npm install & npm run build && pm2 reload ecosystem.config.js`,
    },
  },
};
