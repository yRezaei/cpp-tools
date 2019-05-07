const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

class Creator
{
    async create_cmake_project() 
    {
        if(!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage("No folder or workspace available.")
            return;
        }

        const folder_path = vscode.workspace.workspaceFolders[0].uri.path.substr(1);

        const project_name = await vscode.window.showInputBox({
            placeHolder: "Name Your project"
        });

        if(!project_name)
            return;

        const cmake_content = 
        [
            'cmake_minimum_required (VERSION 3.5)',
            '',
            'set( project_name input_project_name)',
            'PROJECT( ${project_name} )',
            '',
            'include_directories( ${CMAKE_SOURCE_DIR}(include) )',
            'file(GLOB SOURCES ${CMAKE_SOURCE_DIR}/src/*.cpp )',
            '',
            'add_executable( ${project_name} ${SOURCES} )',
            'TARGET_LINK_LIBRARIES( ${project_name} )'
        ].join('\n')
         .replace("input_project_name", project_name);
    
        const main_content = 
        [
            '#include <iostream>',
            '',
            'int main(int argc, char** argv)',
            '{',
            '	std::cout << "hello world" << std::endl;',
            '	return 0;',
            '}'
        ].join('\n');
    
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
    
    async create_class() 
    {
        if(!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage("No folder or workspace available.")
            return;
        }

        const is_header_only = await vscode.window.showQuickPick(['no', 'yes'], 
                            { placeHolder: 'Header only?' }
        );

        if(!is_header_only)
            return;

        const file_name = await vscode.window.showInputBox({
            placeHolder: "File name?" }
        );

        if(!file_name)
            return;

        const class_name = await vscode.window.showInputBox({
            placeHolder: "class name?" }
        );

        if(!class_name)
            return;

        let header_content = 
        [
            '#ifndef class_name_uppercase_HPP',
            '#define class_name_uppercase_HPP',
            ' ',
            'class class_name',
            '{',
            'class_ctor_dtor',
            '};',
            ' ',
            '#endif // ! class_name_uppercase_HPP',
        ].join('\n').replace(/class_name_uppercase/g, class_name.toUpperCase());

        const folder_path = vscode.workspace.workspaceFolders[0].uri.path.substr(1);
        
        const header_path = (fs.existsSync(folder_path + "/include")) ? (folder_path + "/include") : folder_path; 
        if(is_header_only == 'yes') {
            let class_body =
            [
                '  public:',
                '   class_name()', 
                '   {',
                '   }',
                '',
                '   ~class_name()',
                '   {',
                '   }',
            ].join('\n');
            header_content = header_content.replace('class_ctor_dtor', class_body ).replace(/class_name/g, class_name);

            fs.writeFile(path.join(header_path, file_name + ".hpp"), header_content, err => {
                if (err) {
                    console.error(err);
                    vscode.window.showErrorMessage("Failed to create" + file_name + ".hpp file.");
                }
                /* else{
                    vscode.window.showInformationMessage("main.cpp file created.");
                } */
            });
        }
        else {
            let class_body = 
            [
                'public:',
                '      class_name();',
                '      ~class_name();',
            ].join('\n');
            header_content = header_content.replace('class_ctor_dtor', class_body ).replace(/class_name/g, class_name);

            fs.writeFile(path.join(header_path, file_name + ".hpp"), header_content, err => {
                if (err) {
                    console.error(err);
                    vscode.window.showErrorMessage("Failed to create" + file_name + ".hpp file.");
                }
                /* else{
                    vscode.window.showInformationMessage("main.cpp file created.");
                } */
            });
            
            const src_path = (fs.existsSync(folder_path + "/src")) ? (folder_path + "/src") : folder_path;
            let src_content = 
            [
                '#include "file_name.hpp"',
                '',
                'class_name::class_name()', 
                '{',
                '}',
                '',
                'class_name::~class_name()',
                '{',
                '}',
            ].join('\n')
            .replace(/class_name/g, class_name)
            .replace(/file_name/g, file_name);
            
            fs.writeFile(path.join(src_path, file_name + ".cpp"), src_content, err => {
                if (err) {
                    console.error(err);
                    vscode.window.showErrorMessage("Failed to create" + file_name + ".cpp file.");
                }
                /* else{
                    vscode.window.showInformationMessage("main.cpp file created.");
                } */
            });
        }
    }

    async update_function_signature()
    {
        if(!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage("No folder or workspace available.");
            return;
        }

        const active_doc = vscode.window.activeTextEditor;
        if(!active_doc)
            return;
        
        let doc_test = active_doc.document.getText();
        


    }
}

module.exports = Creator