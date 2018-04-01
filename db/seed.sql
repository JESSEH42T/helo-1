create table users (
    id serial PRIMARY KEY,
    username varchar(20),
    password varchar(20),
    profile_pic TEXT
);

insert into users (username, password, profile_pic) 
values ('Potter', '1', 'https://robohash.org/username.png');

insert into users (username, password, profile_pic) 
values ('Wesley', '2', 'https://robohash.org/usernam.png');

insert into users (username, password, profile_pic) 
values ('Dambaldore', '3', 'https://robohash.org/usern.png');

insert into users (username, password, profile_pic) 
values ('Groot', '4', 'https://robohash.org/user.png');

insert into users (username, password, profile_pic) 
values ('Harmony', '5', 'https://robohash.org/use.png');



create table posts (
    id serial primary key,
    title varchar(45),
    img text,
    content text,
    author_id integer references users(id)
);

insert into posts (title, img, content, author_id) 
values ('Harry Potter and sorcers storne', 'src=dfdsfdsfs', 'This is content', 1);

insert into posts (title, img, content, author_id) 
values ('Harry Potter and The half prince', 'src=dfdsfdsfs', 'This is content', 2);

insert into posts (title, img, content, author_id) 
values ('Deathly hallows', 'src=dfdsfdsfs', 'This is content', 3);

insert into posts (title, img, content, author_id) 
values ('Goblet hallows and fire', 'src=dfdsfdsfs', 'This is content', 4);

insert into posts (title, img, content, author_id) 
values ('The chambers of secret', 'src=dfdsfdsfs', 'This is content', 5);
