CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  display_name VARCHAR(100) NOT NULL,
  bio TEXT,
  avatar_url VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  followers_count INTEGER NOT NULL DEFAULT 0,
  following_count INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  reposts_count INTEGER NOT NULL DEFAULT 0,
  media_url VARCHAR(255)
);

CREATE INDEX IF NOT EXISTS posts_author_id_idx ON posts(author_id);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at);

CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  likes_count INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS comments_author_id_idx ON comments(author_id);
CREATE INDEX IF NOT EXISTS comments_post_id_idx ON comments(post_id);
CREATE INDEX IF NOT EXISTS comments_created_at_idx ON comments(created_at);

CREATE TABLE IF NOT EXISTS follows (
  id UUID PRIMARY KEY,
  follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS follows_follower_id_idx ON follows(follower_id);
CREATE INDEX IF NOT EXISTS follows_following_id_idx ON follows(following_id);
CREATE UNIQUE INDEX IF NOT EXISTS follows_unique_follow ON follows(follower_id, following_id);

CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT check_either_post_or_comment CHECK (
    (post_id IS NOT NULL AND comment_id IS NULL) OR 
    (post_id IS NULL AND comment_id IS NOT NULL)
  )
);

CREATE INDEX IF NOT EXISTS likes_user_post_idx ON likes(user_id, post_id);
CREATE INDEX IF NOT EXISTS likes_user_comment_idx ON likes(user_id, comment_id);
CREATE INDEX IF NOT EXISTS likes_post_id_idx ON likes(post_id);
CREATE INDEX IF NOT EXISTS likes_comment_id_idx ON likes(comment_id);
CREATE UNIQUE INDEX IF NOT EXISTS likes_unique_post ON likes(user_id, post_id) WHERE post_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS likes_unique_comment ON likes(user_id, comment_id) WHERE comment_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  actor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_actor_id_idx ON notifications(actor_id);
CREATE INDEX IF NOT EXISTS notifications_post_id_idx ON notifications(post_id);
CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON notifications(created_at);