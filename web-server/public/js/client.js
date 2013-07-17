/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-7-15
 * Time: 下午4:52
 * To change this template use File | Settings | File Templates.
 */
var pomelo = window.pomelo
var user;
var channel;

function queryEntry(uid, callback) {
    var route = 'gate.gateHandler.queryEntry';
    pomelo.init({
        host: window.location.hostname,
        port: 3014,
        log: true
    }, function() {
        pomelo.request(route, {
            uid: uid
        }, function(data) {
            pomelo.disconnect();
            if(data.code === 500) {
                alert(data.code+'server error');
                return;
            }
            callback(data.host, data.port);
        });
    });
};

$(function(){
   $("#loginbtn").click(function(){
       user=$("#user").val();
       channel=$("#channel").val();
       if(user.length==0 || channel.length==0){
           alert('user or channel length cannot null!');
           return false;
       }
       queryEntry(user,function(host,port){
           pomelo.init({
              host:host,
              port:port,
              log:true
           },function(){
              var route='connector.entryHandler.entry';
              pomelo.request(route,{user:user,channel:channel},function(data){
                 if(data.error){
                     alert('entry game error');
                 }
                 //所有验证完全等待验证

              })
           });
       })
   });
});
