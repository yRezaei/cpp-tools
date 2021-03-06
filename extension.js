// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const creator = require('./src/creator');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) 
{
	console.log('[C++Tools] is now active!');

	let disposable_create_cmake_project = vscode.commands.registerCommand(
		'extension.create_cmake_project',
		function () {
			creator.create_cmake_project();
		}
	);
	context.subscriptions.push(disposable_create_cmake_project);

	let disposable_create_class = vscode.commands.registerCommand(
		'extension.create_class',
		function () {
			creator.create_class();
		}
	);
	context.subscriptions.push(disposable_create_class);

	let disposable_update_function_signature = vscode.commands.registerCommand(
		'extension.update_function_signature',
		function () {
			creator.update_function_signature();
		}
	);
	context.subscriptions.push(disposable_update_function_signature);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
