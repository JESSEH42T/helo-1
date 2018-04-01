select  posts.id, title, username, profile_pic from users
join  posts on users.id = author_id