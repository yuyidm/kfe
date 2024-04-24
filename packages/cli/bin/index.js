#!/usr/bin/env node

const commander = require('commander');
const pkg = require('../package.json');

const program = new commander.Command();

program.name(pkg.name).usage('<command> [options]').version(`${pkg.name} ${pkg.version}`);

program
  .command('create <app-name>')
  .description('创建一个新工程，项目名称')
  .action((name, options) => {
    require('../lib/create')(name, options);
  });

program
  .command('start')
  .description('启动本地开发环境')
  .action(() => {
    require('../lib/start')();
  });

program
  .command('build')
  .description('打包项目')
  .action(() => {
    require('../lib/build')();
  });

program
  .command('analy')
  .description('打包分析')
  .action(arg => {
    require('../lib/analy')(arg);
  });

program.parse(process.argv);
