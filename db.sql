create database homework;
show databases;
use homework;

create table team(
	idx int not null auto_increment,
	team_name varchar(50) not null,
	team_password varchar(20) not null,
	primary key (idx),
	unique (team_name)
)engine=InnoDB default charset='utf8';

insert into team(team_name, team_password) values ( "fisrt", "1234");
insert into team(team_name, team_password) values ( "second", "1234");
insert into team(team_name, team_password) values ( "third", "1234");

delete from team where idx=4;

select * from team;

create table team_member(
	user_idx int not null auto_increment,
	user_name varchar(50) not null,
	team_idx int not null,
	roll varchar(50),
	primary key (user_idx)
)engine=InnoDB default charset='utf8';

insert into team_member(user_name, team_idx, roll) values ( "aaa", 1,"ÆÀÀå");
insert into team_member(user_name, team_idx, roll) values ( "bbb", 1,"ÆÀ¿ø");
insert into team_member(user_name, team_idx, roll) values ( "ccc", 1,"ÆÀ¿ø");

select * from team_member ;

select user_name from team_member where team_idx=3;

drop table team_member;