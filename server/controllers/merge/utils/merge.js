const mergeFn = require('deepmerge')
function merge(arrs,options){
    return mergeFn.all(arrs,options)
}
module.exports = merge