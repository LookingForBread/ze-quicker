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
		//对话框
		vscode.window.showInputBox(
			{
				placeHolder: '请输入文件名',
				validateInput: (text) => {
					if (text.length > 0) {
						return null;
					} else {
						return '文件名不能为空';
					}
				}
			}
		).then((value) => {
			let data = {
				context,
				fileUri,
				fileName: value
			}
			create(data);
		})
		//fileUri下创建文件夹
		// vscode.workspace.fs.createDirectory(vscode.Uri.file(fileUri.fsPath + '/zbcp'));
	});
	let insertComponent = vscode.commands.registerCommand('zequicker.insertComponent', function (fileUri) {
		//对话框
		vscode.window.showInputBox(
			{
				placeHolder: '请输入组件名称',
				validateInput: (text) => {
					if (text.length > 0) {
						return null;
					} else {
						return '组件名称不能为空';
					}
				}
			}
		).then((componentsName) => {
			vscode.window.showInputBox(
				{
					placeHolder: '请输入label名称',
					validateInput: (text) => {
						if (text.length > 0) {
							return null;
						} else {
							return 'label名称不能为空';
						}
					}
				}
			).then((labelName) => {
				addComponents({
					context,
					fileUri,
					componentsName,
					labelName
				});
			})
		})
	});


	context.subscriptions.push(zbcp);
	context.subscriptions.push(insertComponent);
}

// This method is called when your extension is deactivated
function deactivate() {}


function addComponents({componentsName="demo",labelName="demo"}) {
	//找到当前焦点位置
	let editor = vscode.window.activeTextEditor;
	let position = editor.selection.active;
	console.log(position);
	//插入文本
	editor.edit((editBuilder) => {
		editBuilder.insert(position, 
`{
	tag: '${componentsName}',
	label: 'label:',
	key: 'username',
	value: '${labelName}',
	default: '',
	attribute: {
		// type: 'text',
		placeholder: '请输入${labelName}',
	},
	rules: [
		{ required: true, message: '请输入${labelName}', trigger: 'blur' },
	],
},`);
	});
}

function create({context,fileUri,fileName='demo'}) {
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
			//1.处理fileName，将-转为驼峰
			let fileNameArr = fileName.split('-');
			let fileNameCamel = fileNameArr[0].substring(0, 1).toUpperCase() + fileNameArr[0].substring(1);
			for (let i = 1; i < fileNameArr.length; i++) {
				fileNameCamel += fileNameArr[i].substring(0, 1).toUpperCase() + fileNameArr[i].substring(1);
			}
			//读取options.js，并写入zbcp目录
			vscode.workspace.fs.readFile(vscode.Uri.file(context.extensionPath + '\\options.js')).then((data) => {
				vscode.workspace.fs.writeFile(vscode.Uri.file(fileUri.fsPath + `\\${fileName}\\options.js`), data);
			});
			//读取demo.vue，并写入zbcp目录
			vscode.workspace.fs.readFile(vscode.Uri.file(context.extensionPath + '\\demo.vue')).then((data) => {
				//替换文件内容
				let dataStr = data.toString();
				dataStr = dataStr.replace(/Demo/g, fileNameCamel);
				//转回buffer
				let dataBuffer = Buffer.from(dataStr);
				vscode.workspace.fs.writeFile(vscode.Uri.file(fileUri.fsPath + `\\${fileName}\\${fileName}.vue`), dataBuffer);
			})
			//读取api.js，并写入zbcp目录
			vscode.workspace.fs.readFile(vscode.Uri.file(context.extensionPath + '\\api.js')).then((data) => {
				//替换文件内容
				let dataStr = data.toString();
				dataStr = dataStr.replace(/Demo/g, fileNameCamel);
				//转回buffer
				let dataBuffer = Buffer.from(dataStr);
				//写入文件
				vscode.workspace.fs.writeFile(vscode.Uri.file(fileUri.fsPath + `\\${fileName}\\api.js`), dataBuffer);
			})
			//找到项目/src目录
			let srcPath = fileUri.fsPath;
			if(fileUri.fsPath.lastIndexOf('\src') != -1){
				srcPath = fileUri.fsPath.substring(0, fileUri.fsPath.lastIndexOf('\src'));
			}
			//判断routes文件是否存在
			vscode.workspace.fs.stat(vscode.Uri.file(srcPath + '\\src\\router\\routes.js')).then((data) => {
				if(data.type == 1){
					//读取api.js，并写入zbcp目录
					vscode.workspace.fs.readFile(vscode.Uri.file(srcPath + '\\src\\router\\routes.js')).then((data) => {
						//判断vue文件与src的相对路径
						let vuePath = fileUri.fsPath + `\\${fileName}\\${fileName}.vue`
						vuePath = vuePath.substring(vuePath.indexOf('src') + 4);
						//右\替换为/
						vuePath = vuePath.replace(/\\/g, '/');
						//替换文件内容
						let dataStr = data.toString();
						//找到最后一个]的位置
						let lastArrIndex = dataStr.lastIndexOf(']');
						dataStr = dataStr.substring(0, lastArrIndex) + 
`	{
		path: '/${fileName}',
		name: '${fileName}',
		component: () => import('@/${vuePath}'),
		meta: {
			title: '${fileNameCamel}',
		},
	},
]
`;
						//转回buffer
						let dataBuffer = Buffer.from(dataStr);
						//写入文件
						vscode.workspace.fs.writeFile(vscode.Uri.file(srcPath + '/src/router/routes.js'), dataBuffer);
					})
				}
			}).catch((error) => {
				console.log('error :>> ', error);
				//提示用户routes.js不存在
				vscode.window.showErrorMessage(`未找到${srcPath + '\\src\\router\\routes.js'}`);
			})
		})
	});
}

module.exports = {
	activate,
	deactivate
}
