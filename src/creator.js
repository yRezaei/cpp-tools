const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const tmp = require('./templates');

async function create_cmake_project() {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showErrorMessage("No folder or workspace available.")
        return;
    }

    const folder_path = vscode.workspace.workspaceFolders[0].uri.path.substr(1);

    const project_name = await vscode.window.showInputBox({
        placeHolder: "Name Your project"
    });

    if (!project_name)
        return;

    const cmake_content = tmp.cmakefile_txt.replace("input_project_name", project_name);

    fs.existsSync(folder_path + "/src") || fs.mkdirSync(folder_path + "/src");
    fs.existsSync(folder_path + "/include") || fs.mkdirSync(folder_path + "/include");

    fs.writeFile(path.join(folder_path, "CMakeLists.txt"), cmake_content, err => {
        if (err) {
            console.error(err);
            vscode.window.showErrorMessage("Failed to CMakeLists.txt file.");
        }
    });

    fs.writeFile(path.join(folder_path + "/src", "main.cpp"), tmp.main_cpp, err => {
        if (err) {
            console.error(err);
            vscode.window.showErrorMessage("Failed to main.cpp file.");
        }
    });

}

async function create_class() {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showErrorMessage("No folder or workspace available.")
        return;
    }

    const is_header_only = await vscode.window.showQuickPick(['no', 'yes'],
        { placeHolder: 'Header only?' }
    );

    if (!is_header_only)
        return;

    const file_name = await vscode.window.showInputBox({
        placeHolder: "File name?"
    }
    );

    if (!file_name)
        return;

    const class_name = await vscode.window.showInputBox({
        placeHolder: "class name?"
    }
    );

    if (!class_name)
        return;

    let header_content = tmp.header_hpp.replace(/class_name_uppercase/g, class_name.toUpperCase());

    const folder_path = vscode.workspace.workspaceFolders[0].uri.path.substr(1);

    const header_path = (fs.existsSync(folder_path + "/include")) ? (folder_path + "/include") : folder_path;
    if (is_header_only == 'yes') {
        header_content = header_content.replace('class_ctor_dtor', tmp.class_body_inline).replace(/class_name/g, class_name);

        fs.writeFile(path.join(header_path, file_name + ".hpp"), header_content, err => {
            if (err) {
                console.error(err);
                vscode.window.showErrorMessage("Failed to create" + file_name + ".hpp file.");
            }
        });
    }
    else {
        header_content = header_content.replace('class_ctor_dtor', tmp.class_body).replace(/class_name/g, class_name);

        fs.writeFile(path.join(header_path, file_name + ".hpp"), header_content, err => {
            if (err) {
                console.error(err);
                vscode.window.showErrorMessage("Failed to create" + file_name + ".hpp file.");
            }
        });

        const src_path = (fs.existsSync(folder_path + "/src")) ? (folder_path + "/src") : folder_path;
        let src_content = tmp.source_cpp.replace(/class_name/g, class_name) .replace(/file_name/g, file_name);

        fs.writeFile(path.join(src_path, file_name + ".cpp"), src_content, err => {
            if (err) {
                console.error(err);
                vscode.window.showErrorMessage("Failed to create" + file_name + ".cpp file.");
            }
        });
    }
}

async function update_function_signature() {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showErrorMessage("No folder or workspace available.");
        return;
    }

    const active_doc = vscode.window.activeTextEditor;
    if (!active_doc)
        return;

    let doc_test = active_doc.document.getText();
    const full_path_splited = active_doc.document.fileName.split('\\');
    const file_name = full_path_splited[full_path_splited.length-1].split('.');
    vscode.window.showInformationMessage(file_name[0]);

    //vscode.workspace.findFiles("**\\" + file_name[0] + ".h");
    const header_file = await vscode.workspace.findFiles("**/" + file_name[0] + "{.hpp,.h}", ""); 
    if(header_file.length == 0) {
        
    }
        vscode.window.showInformationMessage(header_file[0].fsPath);
}

module.exports = { 
    create_cmake_project, 
    create_class, 
    update_function_signature 
}