# Schema Information

## users
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
username    | string    | not null, indexed
email       | string    | not null
pwd_digest  | string    | not null
session_tkn | string    | not null
type        | string    | not null, included in [individual, organization]
description | text      |
website     | string    |
prof_img    | file      |

## harvests
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
title       | string    | not null
description | string    | not null
address     | string    | not null
privacy     | string    | not null, included in [private, public]
start_date  | datetime  |
end_date    | datetime  |
image       | file      |

## shares
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
harvest_id  | integer   | not null, foreign key (references harvests), indexed
shared_id   | integer   | not null, foreign key (references users), indexed

## notifications
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
type        | string    | not null, polymorphic attribute
type_id     | integer   | not null, foreign key (references shares or messages)

## messages
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
body        | text      | not null
sender_id   | integer   | not null, foreign key (references users), indexed
receiver_id | integer   | not null, foreign key (references users), indexed
