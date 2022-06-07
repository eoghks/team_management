var db = require('./db_db');
var template = require('./db_template.js');
var url = require("url");
var qs = require('querystring');


exports.home = function (request, response) {
    db.query(`SELECT * FROM team`, function (error, teams) {
        var title = "Home";
        var description = `<p>1.상단의 <팀관리> 클릭하여 팀관리 메뉴에서 팀을 만드세요. </p>
                           <p>2.팀관리 메뉴에서 팀원을 추가하세요.</p>
                           <p>3.홈으로 돌아와 접속하세요. </p>
                           <p>4.이후 자유롭게 글을 쓰세요.`;
        var team_select = template.TeamSelect(teams);
        var html = template.HOME(title, team_select,
            `<h2>사용방법</h2>${description}`);
        response.writeHead(200);
        response.end(html);
    });
}

exports.team_check = function (request, response) {
    var body = "";
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        console.log(post.team);
        console.log(post.password);
        db.query(`SELECT * FROM team where idx=? `, [post.team], function (error, results) {
            if (error) {
                throw error;
            }
            if (post.password === results[0].team_password) {
                response.writeHead(200);
                response.end(template.TeamMain(results[0].team_name, `${results[0].team_name}팀 페이지에 오신것을 환영합니다.`));
            }
            else {
                response.writeHead(302, { Location: `/password_error` });
                response.end();
            }
        });
    });

}


