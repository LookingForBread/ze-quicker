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
	let zbcp = vscode.commands.registerCommand('zequicker.zbcp', function (fileUri) {
		//弹窗
		vscode.window.showInputBox({
			placeHolder: '请输入文件名',
			validateInput: (text) => {
				if (text.length > 0) {
					return null;
				} else {
					return '文件名不能为空';
				}
			}
		}).then((value) => {
			create({
				context,
				fileUri,
				value
			});
		})
		


		//fileUri下创建文件夹
		// vscode.workspace.fs.createDirectory(vscode.Uri.file(fileUri.fsPath + '/zbcp'));
	});


	context.subscriptions.push(zbcp);
}

// This method is called when your extension is deactivated
function deactivate() {}

function create({context,fileUri,fileName}) {
	vscode.workspace.fs.stat(fileUri).then((data) => {
		let createP = null;
		if(data.type == 2){//文件夹
			createP = vscode.workspace.fs.createDirectory(vscode.Uri.file(fileUri.fsPath + `/${fileName}`))
		}else{//向上一级创建
			//判断是否是根目录
			if(fileUri.fsPath.indexOf('/') == -1){
				createP = vscode.workspace.fs.createDirectory(vscode.Uri.file(fileUri.fsPath + `/${fileName}`))
			}else{
				let path = fileUri.fsPath.substring(0, fileUri.fsPath.lastIndexOf('/'));
				createP = vscode.workspace.fs.createDirectory(vscode.Uri.file(path + `/${fileName}`))
			}
		}
		createP.then(() => {
			//读取options.js，并写入zbcp目录
			vscode.workspace.fs.readFile(vscode.Uri.file(context.extensionPath + '/options.js')).then((data) => {
				vscode.workspace.fs.writeFile(vscode.Uri.file(fileUri.fsPath + `/${fileName}/options.js`), data);
			});
			//读取demo.vue，并写入zbcp目录
			vscode.workspace.fs.readFile(vscode.Uri.file(context.extensionPath + '/demo.vue')).then((data) => {
				vscode.workspace.fs.writeFile(vscode.Uri.file(fileUri.fsPath + `/${fileName}/${fileName}.vue`), data);
			})
		})
	});
}

module.exports = {
	activate,
	deactivate
}
