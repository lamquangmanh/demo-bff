module.exports = {
  apps: [
    {
      name: 'core_bff',
      script: 'npm run start:prod',
    },
  ],

  deploy: {
    core_bff: {
      key: '~/.ssh/core-bff/id_rsa',
      user: 'root',
      ssh_options: 'IdentitiesOnly=true',
      host: '128.199.225.176',
      ref: 'origin/main',
      repo: 'git@github.com:lamquangmanh/core-bff.git',
      path: '/data/sources/cyberlogitec/core-bff',
      'post-deploy': `source ~/.nvm/nvm.sh && npm install && npm run build && echo 'hello' && pm2 reload ecosystem.config.js`,
    },
  },
};
