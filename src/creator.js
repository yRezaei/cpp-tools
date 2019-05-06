const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

class Creator
{
  async create_cmake_project() {

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
    
        const folder_path = vscode.workspace.workspaceFolders[0].uri.path.substr(1);
        fs.existsSync(folder_path + "/src") || fs.mkdirSync(folder_path + "/src");
        fs.existsSync(folder_path + "/include") || fs.mkdirSync(folder_path + "/include");
    
        fs.writeFile(path.join(folder_path, "CMakeLists.txt"), cmake_content, err => {
            if (err) {
                console.error(err);
                vscode.window.showErrorMessage("Failed to CMakeLists.txt file.");
            }
            /* else{
                vscode.window.showInformationMessage("CMakeLists.txt file created.");
            } */
        });
    
        fs.writeFile(path.join(folder_path + "/src", "main.cpp"), main_content, err => {
            if (err) {
                console.error(err);
                vscode.window.showErrorMessage("Failed to main.cpp file.");
            }
            /* else{
                vscode.window.showInformationMessage("main.cpp file created.");
            } */
        });
    
    }
    
    async create_class_header_only() {
        vscode.window.showInformationMessage("create_header called");
    }
    
    async create_class_header_source() {
        vscode.window.showInformationMessage("create_class  called");
    }
}

module.exports = Creator