let isTest = false
export let HTTP = isTest ? 'http://127.0.0.1:21654/api/' : 'http://54.238.237.51/api/'
export let LOGIN_REQ = `${HTTP}login`
export let HOME_REQ = `${HTTP}home`
export let TASK_REQ = `${HTTP}task`
export let TASK_UPDATE_REQ = `${HTTP}task-update`
export let TASK_DEL_REQ = `${HTTP}task-del`
export let TASK_ADD_REQ = `${HTTP}task-add`
export let UPLOAD_REQ = `${HTTP}upload-data`
export let USER_INFO_REQ = `${HTTP}user-info`