create table users (
    id serial PRIMARY KEY,
    username varchar(20),
    password varchar(20),
    profile_pic TEXT
);

insert into users (username, password, profile_pic) 
values ('Potter', '12345', 'src=dfdfsfdsfd');


create table posts (
    id serial primary key,
    title varchar(45),
    img text,
    content text,
    author_id integer references users(id)
);

insert into posts (title, img, content) 
values ('Scaped from askaban', 'src=dfdsfdsfs', 'This is content');

-- alter table posts
-- add column author_id
-- integer references users(id);
