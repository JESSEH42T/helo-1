select  posts.id, title, img, content, username, profile_pic from users
join  posts on users.id = author_id
where posts.id = $1