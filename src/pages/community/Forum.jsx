import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingParticles from "../../components/FloatingParticles";
import { addForumComment, createForumPost, getForumComments, getForumPosts, upvoteForumPost } from "../../services/forumApi";

const STYLES = `
  .cf-hero { padding: 32px 16px 28px; }
  .cf-wrap { max-width: 800px; margin: 0 auto; padding: 20px 16px; }
  .cf-card { padding: 14px 16px; margin-bottom: 12px; border-radius: 12px; }
  .cf-avatar-lg { width: 38px !important; height: 38px !important; font-size: 13px !important; }
  .cf-cat-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; overflow-x: auto; padding-bottom: 4px; }
  .cf-cat-row::-webkit-scrollbar { display: none; }
  @media (max-width: 480px) {
    .cf-hero { padding: 22px 14px 20px; }
    .cf-wrap { padding: 14px 10px; }
    .cf-card { padding: 12px 12px; }
    .cf-card-title { font-size: 0.88rem !important; }
    .cf-card-excerpt { font-size: 0.78rem !important; }
    .cf-form { padding: 14px !important; }
    .cf-search { font-size: 0.82rem !important; padding: 8px 12px !important; }
    .cf-cat-btn { font-size: 0.7rem !important; padding: 4px 10px !important; }
    .cf-action-btn { font-size: 0.74rem !important; }
    .cf-hero h1 { font-size: 1.35rem !important; }
    .cf-hero p { font-size: 0.83rem !important; }
    .cf-ask-btn { font-size: 0.82rem !important; padding: 8px 18px !important; }
    .cf-reply-area { font-size: 0.8rem !important; }
  }
  @media (min-width: 481px) and (max-width: 767px) {
    .cf-hero { padding: 28px 18px 24px; }
    .cf-wrap { padding: 18px 14px; }
  }
`;

const BRAND = "#317FA4";
const BRAND_LIGHT = "#e8f0f8";

const tagColors = {
  Hot: { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" },
  Solved: { bg: "#F0FDF4", color: "#16A34A", border: "#BBF7D0" },
  Trending: { bg: "#EFF6FF", color: "#2563EB", border: "#BFDBFE" },
  New: { bg: "#F5F3FF", color: "#7C3AED", border: "#DDD6FE" },
  Pinned: { bg: "#F0F9FF", color: "#0891B2", border: "#BAE6FD" },
};

const FORUM_CATEGORIES = [
  "Interview Doubts",
  "Job Experiences",
  "Career Questions",
  "Help other users",
  "Technologies",
  "Preparation Strategies",
];

function Avatar({ initials, size = 36, color = BRAND }) {
  return (
    <div
      className="cf-avatar-lg"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${color}, #2a6494)`,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: size * 0.35,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function ReplyBox({ onSubmit }) {
  const [text, setText] = useState("");
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
      <Avatar initials="ME" size={28} color="#6366F1" />
      <div style={{ flex: 1 }}>
        <textarea
          rows={2}
          placeholder="Write a reply..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="cf-reply-area"
          style={{
            width: "100%",
            padding: "7px 10px",
            border: "1.5px solid #E5E7EB",
            borderRadius: 8,
            fontSize: "0.83rem",
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={() => { if (text.trim()) { onSubmit(text.trim()); setText(""); } }}
          style={{
            marginTop: 5,
            padding: "5px 14px",
            background: BRAND,
            color: "#fff",
            border: "none",
            borderRadius: 7,
            fontWeight: 600,
            fontSize: "0.78rem",
            cursor: "pointer",
          }}
        >
          Reply
        </button>
      </div>
    </div>
  );
}

function PostCard({ post, onLike, onReply, onLikeReply }) {
  const [expanded, setExpanded] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const tagStyle = tagColors[post.tag] || {};

  return (
    <div
      className="cf-card"
      style={{
        background: "#fff",
        border: "1.5px solid #E5E7EB",
        boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <Avatar initials={post.avatar} size={36} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, color: "#111827", fontSize: "0.83rem" }}>
              {post.author}
            </span>
            <span style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>{post.time}</span>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "1px 7px", borderRadius: 20,
              background: tagStyle.bg, color: tagStyle.color, border: `1px solid ${tagStyle.border}` }}>
              {post.tag}
            </span>
            <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "1px 7px", borderRadius: 20,
              background: BRAND_LIGHT, color: BRAND, border: `1px solid #c4daee` }}>
              {post.category}
            </span>
          </div>
          <h3 className="cf-card-title" style={{ margin: "5px 0 3px", fontSize: "0.94rem", fontWeight: 700,
            color: "#111827", lineHeight: 1.35 }}>
            {post.title}
          </h3>
          <p className="cf-card-excerpt" style={{ margin: 0, fontSize: "0.82rem", color: "#6B7280", lineHeight: 1.5 }}>
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10, paddingTop: 10,
        borderTop: "1px solid #F3F4F6", flexWrap: "wrap" }}>
        <button onClick={() => onLike(post.id)} className="cf-action-btn"
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex",
            alignItems: "center", gap: 4, color: "#6B7280", fontSize: "0.78rem", fontWeight: 600, padding: 0 }}>
          👍 {post.likes}
        </button>
        <button onClick={() => setExpanded(!expanded)} className="cf-action-btn"
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex",
            alignItems: "center", gap: 4, color: BRAND, fontSize: "0.78rem", fontWeight: 600, padding: 0 }}>
          💬 {post.replies.length} {post.replies.length === 1 ? "Reply" : "Replies"}
        </button>
        <button onClick={() => { setShowReplyBox(!showReplyBox); setExpanded(true); }} className="cf-action-btn"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280",
            fontSize: "0.78rem", fontWeight: 600, padding: 0 }}>
          ↩ Reply
        </button>
      </div>

      {/* Replies */}
      {expanded && post.replies.length > 0 && (
        <div style={{ marginTop: 10, paddingLeft: 12, borderLeft: `2px solid ${BRAND_LIGHT}`,
          display: "flex", flexDirection: "column", gap: 10 }}>
          {post.replies.map((reply) => (
            <div key={reply.id} style={{ display: "flex", gap: 8 }}>
              <Avatar initials={reply.avatar} size={28} color="#2a6494" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.78rem", color: "#111827" }}>{reply.author}</span>
                  <span style={{ fontSize: "0.68rem", color: "#9CA3AF" }}>{reply.time}</span>
                </div>
                <p style={{ margin: "3px 0 5px", fontSize: "0.8rem", color: "#374151", lineHeight: 1.45 }}>
                  {reply.text}
                </p>
                <button onClick={() => onLikeReply(post.id, reply.id)}
                  style={{ background: "none", border: "none", cursor: "pointer",
                    color: "#9CA3AF", fontSize: "0.72rem", fontWeight: 600, padding: 0 }}>
                  👍 {reply.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showReplyBox && (
        <ReplyBox onSubmit={(text) => { onReply(post.id, text); setShowReplyBox(false); }} />
      )}
    </div>
  );
}

export default function CommunityForum() {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newCategory, setNewCategory] = useState("General");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isLoggedIn = Boolean(
    localStorage.getItem("token") ||
    localStorage.getItem("companyToken") ||
    localStorage.getItem("trainerToken")
  );

  const requireLogin = () => {
    if (isLoggedIn) return true;
    const redirect = encodeURIComponent(location.pathname || "/forum");
    navigate(`/login?redirect=${redirect}`);
    return false;
  };

  useEffect(() => {
    const load = async () => {
      try {
        const apiPosts = await getForumPosts();
        const mapped = await Promise.all(
          apiPosts.map(async (p) => {
            let comments = [];
            try {
              comments = await getForumComments(p._id);
            } catch {
              comments = [];
            }
            return {
              id: p._id,
              title: p.title,
              author: p.author?.name || "Anonymous",
              avatar: (p.author?.name || "AN").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
              time: new Date(p.createdAt).toLocaleDateString(),
              category: p.category || "Career Questions",
              tag: p.tags?.[0] || "New",
              excerpt: p.content || "",
              likes: Array.isArray(p.upvotes) ? p.upvotes.length : 0,
              replies: comments.map((c) => ({
                id: c._id,
                author: c.author?.name || "Anonymous",
                avatar: (c.author?.name || "AN").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
                time: new Date(c.createdAt).toLocaleDateString(),
                text: c.content || "",
                likes: 0,
              })),
            };
          })
        );
        setPosts(mapped);
      } catch (err) {
        setError(err.message || "Failed to load forum");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = ["All", ...FORUM_CATEGORIES];

  const filtered = posts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleLike = async (postId) => {
    if (!requireLogin()) return;
    try {
      const updated = await upvoteForumPost(postId);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, likes: Array.isArray(updated.upvotes) ? updated.upvotes.length : p.likes + 1 }
            : p
        )
      );
    } catch {
      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)));
    }
  };

  const handleReply = async (postId, text) => {
    if (!requireLogin()) return;
    try {
      const created = await addForumComment(postId, text);
      setPosts((prev) => prev.map((p) => (p.id === postId
        ? {
            ...p,
            replies: [...p.replies, {
              id: created?._id || Date.now(),
              author: created?.author?.name || "You",
              avatar: (created?.author?.name || "ME").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
              time: created?.createdAt ? new Date(created.createdAt).toLocaleDateString() : "Just now",
              text,
              likes: 0,
            }],
          }
        : p)));
    } catch (err) {
      setError(err.message || "Failed to add comment");
    }
  };

  const handleLikeReply = (postId, replyId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              replies: p.replies.map((r) =>
                r.id === replyId ? { ...r, likes: r.likes + 1 } : r
              ),
            }
          : p
      )
    );
  };

  const handleNewPost = async () => {
    if (!requireLogin()) return;
    if (!newTitle.trim()) return;
    try {
      const created = await createForumPost({
        title: newTitle.trim(),
        content: newExcerpt.trim() || newTitle.trim(),
        category: newCategory,
        tags: ["New"],
      });
      setPosts((prev) => [{
        id: created?._id || Date.now(),
        title: created?.title || newTitle.trim(),
        author: created?.author?.name || "You",
        avatar: (created?.author?.name || "ME").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
        time: created?.createdAt ? new Date(created.createdAt).toLocaleDateString() : "Just now",
        category: created?.category || newCategory,
        tag: created?.tags?.[0] || "New",
        excerpt: created?.content || newExcerpt.trim(),
        likes: Array.isArray(created?.upvotes) ? created.upvotes.length : 0,
        replies: [],
      }, ...prev]);
      setNewTitle("");
      setNewExcerpt("");
      setShowNewPost(false);
    } catch (err) {
      setError(err.message || "Failed to create post");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fb", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <style>{STYLES}</style>
      <Navbar />

      {/* Hero */}
      <div className="cf-hero" style={{
        background: `linear-gradient(135deg, ${BRAND} 0%, #2a6494 100%)`,
        textAlign: "center", color: "#fff",
        position: "relative", overflow: "hidden",
      }}>
        <FloatingParticles color="#ffffff" count={16} opacity={0.3} />
        <h1 style={{ margin: 0, fontSize: "clamp(1.35rem, 4vw, 2rem)", fontWeight: 800 }}>
          Community Forum
        </h1>
        <p style={{ margin: "8px auto 0", fontSize: "0.9rem", maxWidth: 480, opacity: 0.88, lineHeight: 1.5 }}>
          Ask questions, share experiences, and help each other grow.
        </p>
        <button className="cf-ask-btn" onClick={() => {
          if (!requireLogin()) return;
          setShowNewPost(!showNewPost);
        }}
          style={{ marginTop: 16, padding: "9px 22px", background: "#fff", color: BRAND,
            border: "none", borderRadius: 9, fontWeight: 700, fontSize: "0.88rem",
            cursor: "pointer", boxShadow: "0 3px 10px rgba(0,0,0,0.14)" }}>
          + Ask a Question
        </button>
      </div>

      <div className="cf-wrap">
        {/* New Post Form */}
        {showNewPost && (
          <div className="cf-form" style={{ background: "#fff", borderRadius: 12,
            border: `2px solid ${BRAND}`, padding: "18px", marginBottom: 16,
            boxShadow: "0 3px 16px rgba(26,75,115,0.10)" }}>
            <h3 style={{ margin: "0 0 12px", color: BRAND, fontWeight: 700, fontSize: "0.95rem" }}>
              Post a New Question
            </h3>
            <input placeholder="Question title *" value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E7EB",
                borderRadius: 8, fontSize: "0.88rem", marginBottom: 8, outline: "none",
                boxSizing: "border-box", fontFamily: "inherit" }} />
            <textarea rows={2} placeholder="Describe your question (optional)" value={newExcerpt}
              onChange={(e) => setNewExcerpt(e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E7EB",
                borderRadius: 8, fontSize: "0.84rem", resize: "vertical", outline: "none",
                marginBottom: 8, boxSizing: "border-box", fontFamily: "inherit" }} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}
                style={{ padding: "7px 10px", border: "1.5px solid #E5E7EB", borderRadius: 8,
                  fontSize: "0.82rem", color: "#374151", outline: "none" }}>
                {FORUM_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <button onClick={handleNewPost}
                style={{ padding: "7px 18px", background: BRAND, color: "#fff", border: "none",
                  borderRadius: 8, fontWeight: 700, fontSize: "0.83rem", cursor: "pointer" }}>
                Post
              </button>
              <button onClick={() => setShowNewPost(false)}
                style={{ padding: "7px 14px", background: "#F3F4F6", color: "#6B7280", border: "none",
                  borderRadius: 8, fontWeight: 600, fontSize: "0.83rem", cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        <input className="cf-search" placeholder="Search questions..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: "9px 14px", border: "1.5px solid #E5E7EB",
            borderRadius: 9, fontSize: "0.88rem", outline: "none", marginBottom: 12,
            boxSizing: "border-box", background: "#fff" }} />

        {/* Category Filter */}
        <div className="cf-cat-row">
          {categories.map((cat) => (
            <button key={cat} className="cf-cat-btn" onClick={() => setActiveCategory(cat)}
              style={{ padding: "5px 13px", borderRadius: 20, whiteSpace: "nowrap",
                border: `1.5px solid ${activeCategory === cat ? BRAND : "#E5E7EB"}`,
                background: activeCategory === cat ? BRAND : "#fff",
                color: activeCategory === cat ? "#fff" : "#6B7280",
                fontWeight: 600, fontSize: "0.76rem", cursor: "pointer", flexShrink: 0 }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Posts */}
        {loading && <p style={{ color: "#6B7280", fontSize: "0.9rem", marginBottom: 10 }}>Loading forum posts...</p>}
        {error && <p style={{ color: "#DC2626", fontSize: "0.82rem", marginBottom: 10 }}>{error}</p>}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px 0", color: "#9CA3AF" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>🔍</div>
            <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>No questions found.</p>
          </div>
        ) : (
          filtered.map((post) => (
            <PostCard key={post.id} post={post}
              onLike={handleLike} onReply={handleReply} onLikeReply={handleLikeReply} />
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}
