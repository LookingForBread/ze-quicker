// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "zequicker" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let zbcp = vscode.commands.registerCommand('zequicker.zbcp', function () {
		
		//当前文件路径
		let filePath = vscode.window.activeTextEditor.document.fileName;
		console.log(filePath);
		console.log(vscode.workspace.workspaceFolders);
		//在当前文件夹下创建一个新的文件夹
		// vscode.workspace.fs.createDirectory(vscode.Uri.file(vscode.workspace.workspaceFolders[0].uri.fsPath + '/zbcp'));

	});

	context.subscriptions.push(zbcp);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
