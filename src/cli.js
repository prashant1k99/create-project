import arg from 'arg';

function parseArgumentsIntoOptions(rawArgs) {
  try {
    const args = arg(
      {
        '--git': Boolean,
        '--version': Boolean,
        '--install': Boolean,
        '--help': Boolean,
        '--type': String,
        '--js': Boolean,
        '--ts': Boolean,
        '-g': '--git',
        '-i': '--install',
        '-V': '--version',
        '-h': '--help',
      },
      {
        argv: rawArgs.slice(2),
      }
    );
    return {
      git: args['--git'] || false,
      appName: args._[0],
      runInstall: args['--install'] || false,
      version: args['--version'] || false,
      help: args['--help'] || false,
      type: args['--type'] || null
    };
  } catch (error) {
    return (error.message)
  }
}

export function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  if (typeof options === 'string' ) {
    return console.log(options)
  }
  if (options.version) {
    return console.log('0.0.1')
  }
  if (options.help) {
    console.log('List of helps:')
    return
  }
  console.log(options);
}