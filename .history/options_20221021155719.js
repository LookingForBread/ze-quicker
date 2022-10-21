export const baseModelOptions = ()=>{
    return [
        
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
        }
    ]
}