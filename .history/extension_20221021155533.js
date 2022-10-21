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
		vscode.workspace.fs.stat(fileUri).then((data) => {
			let createP = null;
			if(data.type == 2){//文件夹
				createP = vscode.workspace.fs.createDirectory(vscode.Uri.file(fileUri.fsPath + '/zbcp'))
			}else{//向上一级创建
				//判断是否是根目录
				if(fileUri.fsPath.indexOf('/') == -1){
					createP = vscode.workspace.fs.createDirectory(vscode.Uri.file(fileUri.fsPath + '/zbcp'))
				}else{
					let path = fileUri.fsPath.substring(0, fileUri.fsPath.lastIndexOf('/'));
					createP = vscode.workspace.fs.createDirectory(vscode.Uri.file(path + '/zbcp'))
				}
			}
			createP.then(() => {
				//继续创建2个文件
				vscode.workspace.fs.writeFile(vscode.Uri.file(fileUri.fsPath + '/zbcp/options.js'), Buffer.from(
					`export const baseModelOptions = ()=>{
						return [
						  {
							tag: 'el-input',
							label: '用户名:',
							key: 'username',
							value: '',
							default: '',
							attribute: {//属性
							  type: 'text',
							  placeholder: '请输入用户名',
							},
							rules: [
							  { required: true, message: '请输入用户名', trigger: 'blur' },
							],
						  },
						  {
							tag: 'BaseSelect',
							label: '所属部门:',
							key: 'deptId',
							value: '',
							default: '',
							attribute: {//属性
							  placeholder: '请选择部门',
							  options: []
							},
						  },
						  {
							tag: 'el-input',
							label: '密码:',
							key: 'password',
							disEdit: true,
							value: '',
							default: '',
							attribute: {//属性
							  type: 'password',
							  placeholder: '请输入密码',
							},
							rules: [
							  { required: true, message: '请输入密码', trigger: 'blur' },
							],
							customFormatter: function(value){
							  return sha1(value)
							}
						  },
						  {
							tag: 'el-input',
							label: '真实姓名:',
							key: 'realName',
							value: '',
							default: '',
							attribute: {//属性
							  type: 'text',
							  placeholder: '请输入真实姓名',
							},
							rules: [
							  { required: true, message: '请输入真实姓名', trigger: 'blur' },
							],
						  },
						  {
							tag: 'BaseRadioGroup',
							label: '性别:',
							key: 'gender',
							value: 1,
							default: 1,
							attribute: {//属性
							  options:[
								{label: '男',value: 1},
								{label: '女',value: 2},
								{label: '未知',value: 3},
							  ]
					  
							},
						  },
						  {
							tag: 'el-input',
							label: '邮箱:',
							key: 'email',
							value: '',
							default: '',
							attribute: {//属性
							  type: 'text',
							  placeholder: '请输入邮箱',
							},
							rules: [
							  { required: true, message: '请输入邮箱', trigger: 'blur' },
							],
						  },
						  {
							tag: 'el-input',
							label: '手机号:',
							key: 'mobile',
							value: '',
							default: '',
							attribute: {//属性
							  type: 'text',
							  placeholder: '请输入手机号',
							},
							rules: [
							  { required: true, message: '请输入手机号', trigger: 'blur' },
							],
						  },
						  {
							tag: 'BaseSelect',
							label: '角色:',
							key: 'roleIdList',
							value: '',
							default: '',
							attribute: {//属性
							  multiple: true,
							  placeholder: '请选择角色',
							  options: []
							},
						  },
						  {
							tag: 'BaseSelect',
							label: '状态:',
							key: 'status',
							value: 1,
							default: 1,
							attribute: {//属性
							  options: [
								{
								  value: 1,
								  label: '启用',
								},
								{
								  value: 0,
								  label: '停用',
								},
							  ]
							},
						  },
						]
					  }
						
						export const baseFilterOptions = ()=>{
						  return [
							{
							  tag: 'el-input',
							  label: '用户名:',
							  key: 'username',
							  value: '',
							  attribute: {//属性
								type: 'text',
								placeholder: '请输入用户名'
							  },
							},
							// {
							//   tag: 'el-input',
							//   label: '姓名:',
							//   key: 'name',
							//   value: '',
							//   attribute: {//属性
							//     type: 'text',
							//     placeholder: '请输入姓名'
							//   },
							// },
							// {
						  ]
						}`
				));
			})
		});
		


		//fileUri下创建文件夹
		// vscode.workspace.fs.createDirectory(vscode.Uri.file(fileUri.fsPath + '/zbcp'));
	});


	context.subscriptions.push(zbcp);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
