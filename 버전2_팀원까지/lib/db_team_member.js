var db = require('./db_db');
var template = require('./db_template.js');
var qs = require('querystring');
var url = require("url");

exports.home = function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM team_member where team_idx=? `, [queryData.idx], function (error, team_member) {
        if (error) {
            throw error;
        }
        db.query(`SELECT * FROM team where idx=? `, [queryData.idx], function (error2, team) {
            if (error2) {
                throw error;
            }
            var html = template.MEMBERHOME(team[0].team_name,
                `
                ${template.TeamMemberTable(team_member)}
                    <style>
                        table{
                        border-collapse:collapse;
                        }
                        td{
                            border:1px solid black;
                        }
                    </style>
                    <form action="/create_team_member_process" method="post">
                        <p><input type="hidden" name="team_idx" value=${queryData.idx}></p>
                        <p><input type="text" name="name" placeholder="name"></p>
                        <p><input type="text" name="roll" placeholder="roll"></p>
                    <p><input type="submit" value="팀원 추가"></p>
                    </form>
                    `,
                ``);
            response.writeHead(200);
            response.end(html);
        });
    });
}

exports.create_team_member_process = function (request, response) {
    var body = "";
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        var post = qs.parse(body);

        db.query(`INSERT INTO team_member (user_name, team_idx, roll) VALUES (?, ?, ?)`,
            [post.name, post.team_idx, post.roll], function (error, results) {
                if (error) {
                    throw error;
                }
                response.writeHead(302, { Location: `/team_member_home?idx=${post.team_idx}` });
                response.end();
            });


    });
}

exports.delete_team_member_process = function (request, response) {
    var body = "";
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        db.query(`DELETE FROM team_member where user_idx=? `,
            [post.user_idx], function (error2, results) {
                if (error2) {
                    throw error2;
                }
                response.writeHead(302, { Location: `/team_member_home?idx=${post.team_idx}` });
                response.end();
            });
    });
}
