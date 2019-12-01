export const getBaseUrl = (url, page, projectId) => projectId ? url.replace(`/${page}/${projectId}`, '') : url.replace(`/${page}`, '')

export const getLocation = (url, base, projectId) => projectId ? url.replace(`${base}/`, '').replace(`/${projectId}`, '') : url.replace(base, '')
