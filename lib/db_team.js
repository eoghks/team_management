var db = require('./db_db');
var template = require('./db_template.js');
var qs = require('querystring');
var url = require("url");

exports.home = function (request, response) {
    db.query(`SELECT * FROM team`, function (error, teams) {
        var title = "팀 관리";
        var html = template.TeamHome(title,
            `
            ${template.TeamTable(teams)}
                <style>
                    table{
                    border-collapse:collapse;
                    }
                    td{
                        border:1px solid black;
                    }
                </style>
                <form action="/create_team_process" method="post">
                    <p><input type="text" name="team_name" placeholder="팀명"></p>
                    <p><input type="text" name="password" placeholder="비밀번호"></p>
                    <p><input type="text" name="password_check" placeholder="비밀번호 확인"></p>
                <p><input type="submit" value="팀 생성"></p>
                </form>
                `,
            ``);
        response.writeHead(200);
        response.end(html);

    });
}

exports.create_team_process = function (request, response) {
    var body = "";
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        if (post.password === post.password_check) {
            db.query(`INSERT INTO team (team_name, team_password) VALUES (?, ?)`,
                [post.team_name, post.password], function (error, results) {
                    if (error) {
                        throw error;
                    }
                    response.writeHead(302, { Location: `/team_management` });
                    response.end();
                });
        }
        else {
            response.writeHead(302, { Location: `/password_check_error` });
            response.end();
        }
    });
}

exports.update_team = function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM team where idx=?`, [queryData.idx], function (error, team) {
        if (error) {
            throw error;
        }
        var title = "팀명 변경";
        var html = template.TeamHome(title,
            `
                <form action="/update_team_process" method="post">
                    <p><input type="hidden" name="idx" value=${queryData.idx}></p>
                    <p><input type="text" name="team_name" placeholder="팀명" value=${team[0].team_name}></p>
                    <p><input type="text" name="password" placeholder="비밀번호"></p>
                <p><input type="submit" value="팀명 변경"></p>
                </form>
                `,
            ``);
        response.writeHead(200);
        response.end(html);
    });
}

exports.update_team_process = function (request, response) {
    var body = "";
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        db.query(`SELECT * FROM team where idx=?`, [post.idx], function (error, team) {
            if (error) {
                throw error;
            }
            checkpassword = team[0].team_password;
            if (checkpassword === post.password) {
                db.query(`UPDATE team SET team_name=? WHERE idx=? `,
                    [post.team_name, post.idx], function (error2, results) {
                        if (error2) {
                            throw error;
                        }
                        response.writeHead(302, { Location: `/team_management` });
                        response.end();
                    });
            } else {
                response.writeHead(302, { Location: `/password_error` });
                response.end();
            }
        });
    });
}

exports.delete_team = function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM team where idx=?`, [queryData.idx], function (error, team) {
        if (error) {
            throw error;
        }
        var title = "팀 삭제";
        var html = template.TeamHome(title,
            `
                <p>${team[0].team_name}</p>
                <form action="/delete_team_process" method="post">
                    <p><input type="hidden" name="idx" value=${queryData.idx}></p>
                    <p><input type="text" name="password" placeholder="비밀번호"></p>
                <p><input type="submit" value="팀삭제"></p>
                </form>
                `,
            ``);
        response.writeHead(200);
        response.end(html);
    });
}

exports.delete_team_process = function (request, response) {
    var body = "";
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        db.query(`SELECT * FROM team where idx=?`, [post.idx], function (error, team) {
            if (error) {
                throw error;
            }
            checkpassword = team[0].team_password;
            if (checkpassword === post.password) {
                db.query(`DELETE FROM team where idx=? `,
                    [post.idx], function (error2, results) {
                        if (error2) {
                            throw error2;
                        }
                        response.writeHead(302, { Location: `/team_management` });
                        response.end();
                    });
            } else {
                response.writeHead(302, { Location: `/password_error` });
                response.end();
            }
        });
    });
}



