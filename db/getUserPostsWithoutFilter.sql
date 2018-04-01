select  title, username, profile_pic from users
join  posts on users.id = author_id
where users.id = $1