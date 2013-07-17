/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-7-15
 * Time: 下午5:35
 * To change this template use File | Settings | File Templates.
 */
module.exports=function(app){
    return new Handler(app);
}

var Handler=function(app){
    this.app=app;
}

var handler=Handler.prototype;

handler.queryEntry=function(msg,session,next){
    var user=msg.uid;
    console.log(user);
    if(!user){
        next(null,{code:500});
        return ;
    }
}

