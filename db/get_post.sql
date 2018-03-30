select title, author, profile_pic from users
join posts on users.id = posts.author.id