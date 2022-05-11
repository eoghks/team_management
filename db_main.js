var http = require("http");
var url = require("url");
var team_page = require('./lib/db_team_page');
var team = require('./lib/db_team');
var team_member = require('./lib/db_team_member');
var template = require('./lib/db_template.js');


var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if (pathname === "/") {
        team_page.home(request, response);
    } else if (pathname === '/password_check') {
        team_page.team_check(request, response);
    } /**********팀 관리 관련**********/
    else if (pathname === '/team_management') {
        team.home(request, response);
    } else if (pathname === '/create_team_process') {
        team.create_team_process(request, response);
    } else if (pathname === '/team/update') {
        team.update_team(request, response);
    } else if (pathname === '/update_team_process') {
        team.update_team_process(request, response);
    } else if (pathname === '/team/delete') {
        team.delete_team(request, response);
    } else if (pathname === '/delete_team_process') {
        team.delete_team_process(request, response);
    } /******팀원 관리 관련 *******/
    else if (pathname === '/team_member_home') {
        team_member.home(request, response);
    } else if (pathname === '/create_team_member_process') {
        team_member.create_team_member_process(request, response);
    } else if (pathname === '/delete_team_member_process') {
        team_member.delete_team_member_process(request, response);
    }/**********오류 처리 관련**********/
    else if (pathname === '/password_error') {
        response.writeHead(200);
        response.end(template.PasswordError());
    } else if (pathname === '/password_check_error') {
        response.writeHead(200);
        response.end(template.PasswordCheckError());
    } else {
        response.writeHead(404);
        response.end("Not Found");
    }
});
app.listen(3000);

