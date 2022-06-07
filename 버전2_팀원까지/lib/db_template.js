module.exports = {
  HOME: function (title, select, body) {
    return `
      <!doctype html>
      <html>
      <head>
        <title>team - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><p><a href="/">HOME</a></p></h1>
        <p><a href="/team_management">팀 관리</a></p>
        <form action="/password_check" method="post">
          <p>팀 선택 ${select}</p>
          <p>비밀번호 <input type="text" name="password" placeholder="password"></p>
          <p> <input type="submit" value="접속"> </p>
        </form>
        ${body}
      </body>
      </html>
      `;
  },
  /******* 팀관련 템플릿********/
  Teamlist: function (teams) {
    var list = "<ul>";
    var i = 0;
    while (i < teams.length) {
      list = list + `<li><a href="/?id=${teams[i].idx}">${teams[i].team_name}</a></li>`;
      i = i + 1;
    }
    list = list + "</ul>";
    return list;
  },
  TeamSelect: function (teams) {
    var tag = '';
    var i = 0
    while (i < teams.length) {
      tag = tag + `<option value=${teams[i].idx}>${teams[i].team_name}</option>`
      i = i + 1;
    }
    return `
    <select name="team">
     ${tag}
    </select>
    `
  },
  TeamHome: function (title, body) {
    return `
      <!doctype html>
      <html>
      <head>
        <title>team - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><p><a href="/">HOME-${title}</a></p></h1>
        ${body}
      </body>
      </html>
      `;
  },
  TeamTable: function (teams) {
    var tag = '<table>';
    var i = 0
    while (i < teams.length) {
      tag += `
      <tr>
        <td>${teams[i].team_name}</td>
        <td><a href="/team/update?idx=${teams[i].idx}">팀명 변경</td>
        <td><a href="/team/delete?idx=${teams[i].idx}">팀 삭제</td>
        <td><a href="/team_member_home?idx=${teams[i].idx}">팀원 관리</td>
      </tr>
       `
      i++;
    }
    tag += "</table>";
    return tag;
  },
  TeamMain: function (title, body) {
    return `
      <!doctype html>
      <html>
      <head>
        <title>team - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><p><a href="/">초기화면으로가기</a></p></h1>
        <h2>${body}</h2>
      </body>
      </html>
      `;
  },
  /******* 팀원관련 템플릿********/
  MEMBERHOME: function (title, body) {
    return `
      <!doctype html>
      <html>
      <head>
        <title>team - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><p><a href="/team_management">팀 관리</a></p></h1>
        <h1><p>${title}</p></h1>
        ${body}
      </body>
      </html>
      `;
  },
  TeamMemberTable: function (team) {
    var tag = '<table>';
    var i = 0
    while (i < team.length) {
      tag += `
      <tr>
        <td>${team[i].user_name}</td>
        <td>${team[i].roll}</td>
        <td><form action="/delete_team_member_process" method="post">
             <input type="hidden" name="team_idx" value=${team[i].team_idx}>
             <input type="hidden" name="user_idx" value=${team[i].user_idx}>
             <input type="submit" value="팀원 삭제">
             </form></td>
      </tr>
       `
      i++;
    }
    tag += "</table>";
    return tag;
  },
  /******* 에러처리 템플릿********/
  PasswordError: function () {
    return `
    <!doctype html>
    <html>
    <head>
      <title>패스워드가 틀립니다.</title>
      <meta charset="utf-8">
    </head>
    <body>
      <p>패스워드가 틀렸습니다. 다시 입력해주세요.</p>
    </body>
    </html>
    `;
  },
  PasswordCheckError: function () {
    return `
    <!doctype html>
    <html>
    <head>
      <title>패스워드가 틀립니다.</title>
      <meta charset="utf-8">
    </head>
    <body>
      <p>비밀번호와 비밀번호 확인이 틀립니다. 다시 입력하세요.</p>
    </body>
    </html>
    `;
  }
}
