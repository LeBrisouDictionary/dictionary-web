exports.register = function (plugin, options, next) {	
	process.env.dictionary_web_base_dir = __dirname

	plugin.route(require('./routes'))

	var selection = plugin.select('dictionary-web').servers[0]

  next()
}

exports.register.attributes = {
	name: 'dictionary-web',
  version: '0.0.1',
  // pkg: require('./package.json')
}
