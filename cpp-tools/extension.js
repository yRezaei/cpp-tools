// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

async function create_cmake_project() {
  
	// User Input to name Gist file
	const project_name = await vscode.window.showInputBox({
	  placeHolder: "Name Your project"
	});

	const cmake_content = ("cmake_minimum_required (VERSION 3.5)\n" +
		"\n" +
		"set( project_name input_project_name)\n" +
		"PROJECT( ${project_name} )\n" +
		"file(GLOB SOURCES ${CMAKE_SOURCE_DIR}/src/*.cpp )\n" +
		"add_executable( ${project_name} ${SOURCES} )\n" +
		"TARGET_LINK_LIBRARIES( ${project_name} )\n").replace("input_project_name", project_name);
	;

	const main_content = "#include <iostream>\n" +
		"\n" +
		"int main(int argc, char** argv)\n" +
		"{\n" +
		"	std::cout << \"hello world\" << std::endl;\n" +
		"	return 0;\n" +
		"}\n"
	;

	const folder_path =  vscode.workspace.workspaceFolders[0].uri.path.substr(1);

	fs.writeFile(path.join(folder_path, "CMakeLists.txt"), cmake_content, err => {
		if(err) {
			console.error(err);
			vscode.window.showErrorMessage("Failed to CMakeLists.txt file.");
		}
		/* else{
			vscode.window.showInformationMessage("CMakeLists.txt file created.");
		} */
	});

	fs.existsSync(folder_path + "/src") || fs.mkdirSync(folder_path + "/src");

	fs.writeFile(path.join(folder_path + "/src", "main.cpp"), main_content, err => {
		if(err) {
			console.error(err);
			vscode.window.showErrorMessage("Failed to main.cpp file.");
		}
		/* else{
			vscode.window.showInformationMessage("main.cpp file created.");
		} */
	});
	
  }
  

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cpp-tools" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(
		'extension.create_cmake_project', 
		function () {
			create_cmake_project();
		}
	);

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
