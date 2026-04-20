import { useState, useRef, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const BRAND = '#317FA4';
const BRAND_LIGHT = '#e8f0f8';
const BRAND_GRAD = 'linear-gradient(135deg,#317FA4 0%,#2a6494 100%)';

const tagColors = {
  Hot:      { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
  Solved:   { bg: '#F0FDF4', color: '#16A34A', border: '#BBF7D0' },
  Trending: { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE' },
  New:      { bg: '#F5F3FF', color: '#7C3AED', border: '#DDD6FE' },
  Pinned:   { bg: '#F0F9FF', color: '#0891B2', border: '#BAE6FD' },
};

const seedPosts = [
  {
    id: 1,
    title: 'How to answer Tell me about yourself in under 2 minutes?',
    author: 'Priya Sharma', avatar: 'PS', time: '2 hours ago',
    category: 'Interview Prep', tag: 'Hot',
    excerpt: 'I have an interview tomorrow and struggling with this classic opener. What is the best structure for freshers?',
    likes: 89,
    replies: [
      { id: 1, author: 'Rahul Verma', avatar: 'RV', time: '1 hour ago',
        text: 'Use Present-Past-Future structure. Start with your current role, background, then what you are aiming for.', likes: 34 },
      { id: 2, author: 'Anjali Mehta', avatar: 'AM', time: '45 min ago',
        text: 'Practice out loud at least 5 times. It makes a huge difference in delivery and confidence.', likes: 21 },
    ],
  },
  {
    id: 2,
    title: 'ATS not picking up my resume � what am I doing wrong?',
    author: 'Karan Joshi', avatar: 'KJ', time: '5 hours ago',
    category: 'Resume Help', tag: 'Solved',
    excerpt: 'Applied to 50+ jobs and got zero callbacks. I think it is an ATS issue. Here is my current format.',
    likes: 56,
    replies: [
      { id: 1, author: 'Sneha Iyer', avatar: 'SI', time: '3 hours ago',
        text: 'Avoid tables and fancy graphics. Use a simple single-column layout with standard section headings.', likes: 48 },
    ],
  },
  {
    id: 3,
    title: 'Got an offer of 12 LPA � is it good for 3 years experience in Pune?',
    author: 'Deepak Nair', avatar: 'DN', time: '1 day ago',
    category: 'Salary Talk', tag: 'Trending',
    excerpt: 'I am a React developer with 3 years experience. The offer is 12 LPA with no bonus. Should I negotiate?',
    likes: 124, replies: [],
  },
  {
    id: 4,
    title: 'Best Python and Data Science institute in Delhi?',
    author: 'Rohan Singh', avatar: 'RS', time: '2 days ago',
    category: 'Training', tag: 'New',
    excerpt: 'Looking for a good institute in Delhi with placement support. Budget is around 30-40k.',
    likes: 43, replies: [],
  },
  {
    id: 5,
    title: 'How to switch from IT support to software development at 28?',
    author: 'Meera Patel', avatar: 'MP', time: '3 days ago',
    category: 'Career Guidance', tag: 'Hot',
    excerpt: 'I have been in IT support for 4 years and want to move into dev. Learning Python on the side.',
    likes: 97, replies: [],
  },
];

const seedGroups = [
  {
    id: 1, name: 'React & Frontend Developers', icon: '', members: 2840, category: 'Tech',
    description: 'Discuss React, Vue, Angular, CSS tricks, and frontend career tips.',
    posts: [
      { id: 1, author: 'Vikram R.', avatar: 'VR', time: '1 hour ago',
        text: 'What is the best way to manage global state � Redux Toolkit or Zustand?',
        likes: 32, comments: [{ id: 1, author: 'Nisha K.', avatar: 'NK', time: '30 min ago', text: 'Zustand is simpler for medium apps. Redux for enterprise scale.' }] },
      { id: 2, author: 'Abhi S.', avatar: 'AS', time: '3 hours ago',
        text: 'Just got my first React internship! Any advice on code reviews?', likes: 18, comments: [] },
    ],
  },
  {
    id: 2, name: 'Freshers Job Hunt Support', icon: '', members: 5120, category: 'Career',
    description: 'A safe space for fresh graduates looking for their first job.',
    posts: [
      { id: 1, author: 'Pooja L.', avatar: 'PL', time: '2 hours ago',
        text: 'Finally got a call from TCS after 3 months of applying! Do not give up everyone!', likes: 145,
        comments: [{ id: 1, author: 'Raj M.', avatar: 'RM', time: '1 hour ago', text: 'Congratulations! What profile did you apply for?' }] },
    ],
  },
  {
    id: 3, name: 'Data Science & AI Professionals', icon: '', members: 3250, category: 'Tech',
    description: 'ML, NLP, computer vision discussions and job leads.',
    posts: [
      { id: 1, author: 'Dr. Arun P.', avatar: 'AP', time: '4 hours ago',
        text: 'Gemini 2.0 just dropped. How will this change the NLP job market?', likes: 67, comments: [] },
    ],
  },
  {
    id: 4, name: 'HR & Recruitment Professionals', icon: '', members: 1870, category: 'HR',
    description: 'For HR managers, recruiters, and talent acquisition teams.', posts: [],
  },
  {
    id: 5, name: 'Startup & Entrepreneurship', icon: '', members: 2100, category: 'Business',
    description: 'Discuss startups, fundraising, product ideas, and building a team.',
    posts: [
      { id: 1, author: 'Simran T.', avatar: 'ST', time: '6 hours ago',
        text: 'Looking for a co-founder with backend skills for a HR-tech SaaS. DM me!', likes: 22, comments: [] },
    ],
  },
  {
    id: 6, name: 'Remote Work & Digital Nomads', icon: '', members: 4300, category: 'Career',
    description: 'Remote jobs, productivity tools, and work-life balance tips.', posts: [],
  },
];

const seedChats = [
  {
    id: 1, contact: 'Rahul Verma', avatar: 'RV', online: true,
    lastMsg: 'Sure, let us connect on LinkedIn!', lastTime: '10:42 AM',
    messages: [
      { id: 1, from: 'them', text: 'Hi! I saw your question about ATS. I had the same issue last year.', time: '10:35 AM' },
      { id: 2, from: 'me',   text: 'Oh really? What did you end up doing?', time: '10:36 AM' },
      { id: 3, from: 'them', text: 'Switched to a plain single-column format. Got callbacks within a week.', time: '10:38 AM' },
      { id: 4, from: 'me',   text: 'That is super helpful, thank you!', time: '10:40 AM' },
      { id: 5, from: 'them', text: 'Sure, let us connect on LinkedIn!', time: '10:42 AM' },
    ],
  },
  {
    id: 2, contact: 'Anjali Mehta', avatar: 'AM', online: false,
    lastMsg: 'Good luck with your interview tomorrow', lastTime: 'Yesterday',
    messages: [
      { id: 1, from: 'them', text: 'Hey, how did the interview go?', time: 'Yesterday' },
      { id: 2, from: 'me',   text: 'I have it tomorrow actually', time: 'Yesterday' },
      { id: 3, from: 'them', text: 'Good luck with your interview tomorrow!', time: 'Yesterday' },
    ],
  },
  {
    id: 3, contact: 'Sneha Iyer', avatar: 'SI', online: true,
    lastMsg: 'Which city are you targeting?', lastTime: '9:15 AM',
    messages: [
      { id: 1, from: 'them', text: 'I noticed you are looking at Data Science roles.', time: '9:10 AM' },
      { id: 2, from: 'me',   text: 'Yes! Do you have any leads?', time: '9:12 AM' },
      { id: 3, from: 'them', text: 'Which city are you targeting?', time: '9:15 AM' },
    ],
  },
  {
    id: 4, contact: 'Deepak Nair', avatar: 'DN', online: false,
    lastMsg: 'I would negotiate for at least 14 LPA.', lastTime: 'Mon',
    messages: [
      { id: 1, from: 'me',   text: 'Hey Deepak, did you negotiate your offer?', time: 'Mon' },
      { id: 2, from: 'them', text: 'I would negotiate for at least 14 LPA.', time: 'Mon' },
    ],
  },
];

const seedAnnouncements = [
  { id: 1, type: 'pinned', icon: '',
    title: 'Platform Update: New Resume Builder Now Live!',
    body: 'We have launched an AI-powered Resume Builder. Create a professional resume in minutes. Head to the Resume section to try it out!',
    time: 'Today, 9:00 AM' },
  { id: 2, type: 'alert', icon: '',
    title: 'Scheduled Maintenance � April 10, 2026 (2 AM to 4 AM IST)',
    body: 'The platform will be temporarily unavailable for scheduled maintenance. Please save your work before 2 AM.',
    time: 'Today, 8:30 AM' },
  { id: 3, type: 'news', icon: '',
    title: 'Top Hiring Companies This Month: TCS, Infosys, Flipkart and More',
    body: 'Over 1,200 new job listings have been posted in the last 7 days. Check out the most active hiring companies.',
    time: 'Yesterday, 11:00 AM' },
  { id: 4, type: 'tip', icon: '',
    title: 'Career Tip: Polish Your LinkedIn Before Applying',
    body: 'Recruiters check LinkedIn 8 out of 10 times before making a hiring decision. Make sure your profile is complete.',
    time: '2 days ago' },
  { id: 5, type: 'news', icon: '',
    title: 'Free Webinar: Cracking Top MNC Interviews � April 15, 2026',
    body: 'Join our free webinar with experts from Google, Amazon, and Microsoft. Register now � limited seats!',
    time: '2 days ago' },
  { id: 6, type: 'tip', icon: '',
    title: 'New Blog: 10 Most Common Interview Mistakes',
    body: 'Our latest career guide covers the most common mistakes. Read it on the Blog section.',
    time: '3 days ago' },
];

/* -- Shared UI --------------------------------------------------- */
function Avatar({ initials, size = 40, color = BRAND }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(135deg,' + color + ',#2a6494)',
      color: '#fff', display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontWeight: 700,
      fontSize: size * 0.35, flexShrink: 0, userSelect: 'none',
    }}>{initials}</div>
  );
}

function Btn({ children, onClick, variant = 'primary', style: sx = {}, small = false }) {
  const base = {
    border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer',
    transition: 'all 0.18s', display: 'inline-flex', alignItems: 'center', gap: 5,
    padding: small ? '5px 14px' : '9px 22px',
    fontSize: small ? '0.78rem' : '0.88rem',
  };
  const v = {
    primary: { background: BRAND, color: '#fff' },
    outline: { background: '#fff', color: BRAND, border: '1.5px solid ' + BRAND },
    ghost:   { background: 'none', color: '#6B7280', padding: small ? '4px 8px' : '6px 12px' },
    success: { background: '#D1FAE5', color: '#065F46' },
  };
  return <button onClick={onClick} style={{ ...base, ...v[variant], ...sx }}>{children}</button>;
}

/* -- FORUM SECTION ----------------------------------------------- */
function ReplyBox({ onSubmit, onCancel }) {
  const [text, setText] = useState('');
  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
      <Avatar initials="ME" size={34} color="#6366F1" />
      <div style={{ flex: 1 }}>
        <textarea rows={2} placeholder="Write a thoughtful reply..." value={text}
          onChange={e => setText(e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #E5E7EB',
            borderRadius: 8, fontSize: '0.85rem', resize: 'vertical', outline: 'none',
            boxSizing: 'border-box', fontFamily: 'inherit' }} />
        <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
          <Btn small onClick={() => { if (text.trim()) { onSubmit(text.trim()); setText(''); } }}>Post Reply</Btn>
          <Btn small variant="ghost" onClick={onCancel}>Cancel</Btn>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, onLike, onReply, onLikeReply }) {
  const [expanded, setExpanded] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const tag = tagColors[post.tag] || {};
  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E5E7EB',
      padding: '20px 22px', marginBottom: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Avatar initials={post.avatar} size={44} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, color: '#111827', fontSize: '0.87rem' }}>{post.author}</span>
            <span style={{ fontSize: '0.73rem', color: '#9CA3AF' }}>{post.time}</span>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 9px', borderRadius: 20,
              background: tag.bg, color: tag.color, border: '1px solid ' + tag.border }}>{post.tag}</span>
            <span style={{ fontSize: '0.68rem', fontWeight: 600, padding: '2px 9px', borderRadius: 20,
              background: BRAND_LIGHT, color: BRAND, border: '1px solid #c4daee' }}>{post.category}</span>
          </div>
          <h3 style={{ margin: '6px 0 4px', fontSize: '1rem', fontWeight: 700, color: '#111827', lineHeight: 1.4 }}>
            {post.title}
          </h3>
          <p style={{ margin: 0, fontSize: '0.84rem', color: '#6B7280', lineHeight: 1.55 }}>{post.excerpt}</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 14, paddingTop: 12,
        borderTop: '1px solid #F3F4F6', flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={() => onLike(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 5, color: '#6B7280', fontSize: '0.81rem', fontWeight: 600, padding: 0 }}>
          {post.likes}
        </button>
        <button onClick={() => setExpanded(!expanded)} style={{ background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 5, color: BRAND, fontSize: '0.81rem', fontWeight: 600, padding: 0 }}>
          {post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}
        </button>
        <button onClick={() => { setShowReply(!showReply); setExpanded(true); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', fontSize: '0.81rem', fontWeight: 600, padding: 0 }}>
          • Reply
        </button>
      </div>
      {expanded && post.replies.length > 0 && (
        <div style={{ marginTop: 14, paddingLeft: 16, borderLeft: '3px solid ' + BRAND_LIGHT,
          display: 'flex', flexDirection: 'column', gap: 12 }}>
          {post.replies.map(r => (
            <div key={r.id} style={{ display: 'flex', gap: 10 }}>
              <Avatar initials={r.avatar} size={34} color="#2a6494" />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#111827' }}>{r.author}</span>
                  <span style={{ fontSize: '0.71rem', color: '#9CA3AF' }}>{r.time}</span>
                </div>
                <p style={{ margin: '4px 0 5px', fontSize: '0.83rem', color: '#374151', lineHeight: 1.5 }}>{r.text}</p>
                <button onClick={() => onLikeReply(post.id, r.id)} style={{ background: 'none', border: 'none',
                  cursor: 'pointer', color: '#9CA3AF', fontSize: '0.75rem', fontWeight: 600, padding: 0 }}>
                  {r.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showReply && (
        <ReplyBox
          onSubmit={t => { onReply(post.id, t); setShowReply(false); }}
          onCancel={() => setShowReply(false)}
        />
      )}
    </div>
  );
}

function ForumSection() {
  const [posts, setPosts] = useState(seedPosts);
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newCat, setNewCat] = useState('Interview Prep');
  const [sortBy, setSortBy] = useState('recent');

  const cats = ['All', 'Interview Prep', 'Resume Help', 'Salary Talk', 'Training', 'Career Guidance', 'General'];
  const filtered = posts
    .filter(p => {
      const mc = activeCat === 'All' || p.category === activeCat;
      const ms = p.title.toLowerCase().includes(search.toLowerCase()) ||
                 p.author.toLowerCase().includes(search.toLowerCase());
      return mc && ms;
    })
    .sort((a, b) => sortBy === 'popular' ? b.likes - a.likes : b.id - a.id);

  const handleLike = id => setPosts(ps => ps.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  const handleLikeReply = (pid, rid) => setPosts(ps => ps.map(p => p.id === pid
    ? { ...p, replies: p.replies.map(r => r.id === rid ? { ...r, likes: r.likes + 1 } : r) } : p));
  const handleReply = (pid, text) => setPosts(ps => ps.map(p => p.id === pid
    ? { ...p, replies: [...p.replies, { id: Date.now(), author: 'You', avatar: 'ME', time: 'Just now', text, likes: 0 }] } : p));
  const handlePost = () => {
    if (!newTitle.trim()) return;
    setPosts(ps => [{
      id: Date.now(), title: newTitle.trim(), author: 'You', avatar: 'ME',
      time: 'Just now', category: newCat, tag: 'New', excerpt: newExcerpt.trim(), likes: 0, replies: [],
    }, ...ps]);
    setNewTitle(''); setNewExcerpt(''); setShowNew(false);
  };

  const stats = [
    { label: 'Total Posts', value: '24K+', icon: '' },
    { label: 'Members',     value: '12.4K', icon: '' },
    { label: 'Solved Today',value: '48',    icon: '' },
    { label: 'Active Now',  value: '234',   icon: '' },
  ];

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(110px,1fr))', gap: 12, marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: '14px 16px',
            textAlign: 'center', border: '1px solid #E5E7EB', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '1.4rem' }}>{s.icon}</div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: BRAND, marginTop: 4 }}>{s.value}</div>
            <div style={{ fontSize: '0.72rem', color: '#9CA3AF', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <input placeholder="Search questions, authors..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 180, padding: '10px 14px', border: '1.5px solid #E5E7EB',
            borderRadius: 10, fontSize: '0.88rem', outline: 'none', background: '#fff' }} />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          style={{ padding: '10px 12px', border: '1.5px solid #E5E7EB', borderRadius: 10,
            fontSize: '0.84rem', color: '#374151', outline: 'none', cursor: 'pointer' }}>
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
        </select>
        <Btn onClick={() => setShowNew(v => !v)}>+ Ask Question</Btn>
      </div>

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 20 }}>
        {cats.map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)}
            style={{ padding: '6px 15px', borderRadius: 20, fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer',
              border: '1.5px solid ' + (activeCat === cat ? BRAND : '#E5E7EB'),
              background: activeCat === cat ? BRAND : '#fff',
              color: activeCat === cat ? '#fff' : '#6B7280' }}>{cat}</button>
        ))}
      </div>

      {showNew && (
        <div style={{ background: '#fff', borderRadius: 14, border: '2px solid ' + BRAND,
          padding: '22px', marginBottom: 22, boxShadow: '0 4px 22px rgba(26,75,115,0.13)' }}>
          <h3 style={{ margin: '0 0 14px', color: BRAND, fontWeight: 800, fontSize: '1rem' }}>Post a New Question</h3>
          <input placeholder="Question title *" value={newTitle} onChange={e => setNewTitle(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8,
              fontSize: '0.9rem', marginBottom: 10, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
          <textarea rows={3} placeholder="Describe your question..." value={newExcerpt} onChange={e => setNewExcerpt(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8,
              fontSize: '0.86rem', resize: 'vertical', outline: 'none', marginBottom: 10,
              boxSizing: 'border-box', fontFamily: 'inherit' }} />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <select value={newCat} onChange={e => setNewCat(e.target.value)}
              style={{ padding: '8px 12px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: '0.84rem', color: '#374151', outline: 'none' }}>
              {cats.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
            </select>
            <Btn onClick={handlePost}>Post Question</Btn>
            <Btn variant="ghost" onClick={() => setShowNew(false)}>Cancel</Btn>
          </div>
        </div>
      )}

      {filtered.length === 0
        ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF' }}>
            <div style={{ fontSize: '3rem' }}></div>
            <p style={{ fontWeight: 600, marginTop: 8 }}>No questions found.</p>
          </div>
        )
        : filtered.map(p => (
          <PostCard key={p.id} post={p}
            onLike={handleLike} onReply={handleReply} onLikeReply={handleLikeReply} />
        ))
      }
    </>
  );
}

/* -- GROUPS SECTION ---------------------------------------------- */
function GroupPost({ gp }) {
  const [likes, setLikes] = useState(gp.likes);
  const [comments, setComments] = useState(gp.comments);
  const [showBox, setShowBox] = useState(false);
  const [txt, setTxt] = useState('');
  return (
    <div style={{ background: '#FAFAFA', borderRadius: 10, border: '1px solid #F0F0F0',
      padding: '14px 16px', marginBottom: 12 }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <Avatar initials={gp.avatar} size={36} color="#2a6494" />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{gp.author}</span>
            <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{gp.time}</span>
          </div>
          <p style={{ margin: '6px 0', fontSize: '0.87rem', color: '#374151', lineHeight: 1.5 }}>{gp.text}</p>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <button onClick={() => setLikes(l => l + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer',
              color: '#6B7280', fontSize: '0.78rem', fontWeight: 600, padding: 0 }}>{likes}</button>
            <button onClick={() => setShowBox(!showBox)} style={{ background: 'none', border: 'none', cursor: 'pointer',
              color: BRAND, fontSize: '0.78rem', fontWeight: 600, padding: 0 }}>
              {comments.length} Comment{comments.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      </div>
      {comments.length > 0 && (
        <div style={{ marginTop: 10, paddingLeft: 14, borderLeft: '2px solid ' + BRAND_LIGHT }}>
          {comments.map(c => (
            <div key={c.id} style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <Avatar initials={c.avatar} size={28} color="#6366F1" />
              <div>
                <span style={{ fontWeight: 700, fontSize: '0.78rem' }}>{c.author}</span>
                <span style={{ fontSize: '0.7rem', color: '#9CA3AF', marginLeft: 6 }}>{c.time}</span>
                <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: '#374151' }}>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {showBox && (
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <Avatar initials="ME" size={30} color="#6366F1" />
          <div style={{ flex: 1, display: 'flex', gap: 8 }}>
            <input value={txt} onChange={e => setTxt(e.target.value)} placeholder="Write a comment..."
              style={{ flex: 1, padding: '6px 12px', border: '1.5px solid #E5E7EB', borderRadius: 8,
                fontSize: '0.82rem', outline: 'none', fontFamily: 'inherit' }} />
            <Btn small onClick={() => {
              if (!txt.trim()) return;
              setComments(cs => [...cs, { id: Date.now(), author: 'You', avatar: 'ME', time: 'Just now', text: txt.trim() }]);
              setTxt(''); setShowBox(false);
            }}>Post</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

function GroupsSection() {
  const [groups, setGroups] = useState(seedGroups);
  const [joined, setJoined] = useState([1, 2]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [newPost, setNewPost] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const cats = ['All', 'Tech', 'Career', 'HR', 'Business'];
  const visible = filterCat === 'All' ? groups : groups.filter(g => g.category === filterCat);

  const postToGroup = () => {
    if (!newPost.trim() || !activeGroup) return;
    const np = { id: Date.now(), author: 'You', avatar: 'ME', time: 'Just now', text: newPost.trim(), likes: 0, comments: [] };
    setGroups(gs => gs.map(g => g.id === activeGroup.id ? { ...g, posts: [np, ...g.posts] } : g));
    setActiveGroup(ag => ({ ...ag, posts: [np, ...ag.posts] }));
    setNewPost('');
  };

  if (activeGroup) {
    const grp = groups.find(g => g.id === activeGroup.id);
    return (
      <>
        <button onClick={() => setActiveGroup(null)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: BRAND,
            fontWeight: 700, fontSize: '0.9rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          • Back to Groups
        </button>
        <div style={{ background: '#fff', borderRadius: 14, padding: '20px 22px',
          border: '1.5px solid #E5E7EB', marginBottom: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ fontSize: '2.2rem' }}>{grp.icon}</div>
            <div>
              <h2 style={{ margin: 0, color: BRAND, fontSize: '1.2rem', fontWeight: 800 }}>{grp.name}</h2>
              <p style={{ margin: '4px 0 0', fontSize: '0.83rem', color: '#6B7280' }}>{grp.description}</p>
              <span style={{ fontSize: '0.78rem', color: '#9CA3AF', fontWeight: 600 }}>
                {grp.members.toLocaleString()} members � {grp.posts.length} posts
              </span>
            </div>
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #E5E7EB', padding: '16px', marginBottom: 18 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <Avatar initials="ME" size={38} color="#6366F1" />
            <div style={{ flex: 1 }}>
              <textarea rows={2} placeholder="Share something with the group..."
                value={newPost} onChange={e => setNewPost(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #E5E7EB',
                  borderRadius: 8, fontSize: '0.86rem', resize: 'vertical', outline: 'none',
                  boxSizing: 'border-box', fontFamily: 'inherit' }} />
              <Btn style={{ marginTop: 8 }} onClick={postToGroup}>Post to Group</Btn>
            </div>
          </div>
        </div>
        {grp.posts.length === 0
          ? <div style={{ textAlign: 'center', padding: '40px 0', color: '#9CA3AF' }}>
              <p style={{ fontWeight: 600 }}>No posts yet. Be the first!</p>
            </div>
          : grp.posts.map(gp => <GroupPost key={gp.id} gp={gp} />)
        }
      </>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilterCat(c)}
            style={{ padding: '6px 15px', borderRadius: 20, fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer',
              border: '1.5px solid ' + (filterCat === c ? BRAND : '#E5E7EB'),
              background: filterCat === c ? BRAND : '#fff',
              color: filterCat === c ? '#fff' : '#6B7280' }}>{c}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: 16 }}>
        {visible.map(g => {
          const isJoined = joined.includes(g.id);
          return (
            <div key={g.id} style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E5E7EB',
              padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: '2rem', background: BRAND_LIGHT, borderRadius: 10,
                  width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {g.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#111827', lineHeight: 1.3 }}>
                    {g.name}
                  </h3>
                  <span style={{ fontSize: '0.7rem', background: '#F3F4F6', color: '#6B7280',
                    padding: '2px 8px', borderRadius: 6, fontWeight: 600 }}>{g.category}</span>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#6B7280', lineHeight: 1.5 }}>{g.description}</p>
              <span style={{ fontSize: '0.76rem', color: '#9CA3AF', fontWeight: 600 }}>
                {g.members.toLocaleString()} members � {g.posts.length} posts
              </span>
              <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                <Btn small variant={isJoined ? 'success' : 'primary'}
                  onClick={() => setJoined(j => isJoined ? j.filter(x => x !== g.id) : [...j, g.id])}
                  style={{ flex: 1, justifyContent: 'center' }}>
                  {isJoined ? '? Joined' : 'Join Group'}
                </Btn>
                {isJoined && (
                  <Btn small variant="outline"
                    onClick={() => setActiveGroup(g)} style={{ flex: 1, justifyContent: 'center' }}>
                    View
                  </Btn>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* -- CHAT SECTION ------------------------------------------------ */
function ChatSection() {
  const [chats, setChats] = useState(seedChats);
  const [activeId, setActiveId] = useState(1);
  const [draft, setDraft] = useState('');
  const [searchC, setSearchC] = useState('');
  const bottomRef = useRef(null);
  const active = chats.find(c => c.id === activeId);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [activeId, chats]);

  const sendMsg = () => {
    if (!draft.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChats(cs => cs.map(c => c.id === activeId
      ? { ...c, messages: [...c.messages, { id: Date.now(), from: 'me', text: draft.trim(), time: now }],
          lastMsg: draft.trim(), lastTime: 'Now' }
      : c));
    setDraft('');
  };

  const filteredC = chats.filter(c => c.contact.toLowerCase().includes(searchC.toLowerCase()));

  return (
    <div style={{
      display: 'flex', borderRadius: 18, overflow: 'hidden',
      boxShadow: '0 8px 40px rgba(26,75,115,0.13)',
      border: '1.5px solid #E5E7EB',
      height: 620, background: '#fff',
    }}>

      {/* -- Sidebar -- */}
      <div style={{
        width: 280, flexShrink: 0,
        display: 'flex', flexDirection: 'column',
        background: '#F8FAFD',
        borderRight: '1.5px solid #EEF2F8',
      }}>
        {/* Sidebar header */}
        <div style={{
          padding: '20px 18px 14px',
          background: BRAND_GRAD,
        }}>
          <p style={{ margin: '0 0 12px', fontWeight: 800, fontSize: '1rem', color: '#fff', letterSpacing: '0.2px' }}>
            Messages
          </p>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
              fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)',
            }}></span>
            <input
              placeholder="Search contacts..."
              value={searchC}
              onChange={e => setSearchC(e.target.value)}
              style={{
                width: '100%', padding: '8px 10px 8px 30px',
                border: '1.5px solid rgba(255,255,255,0.25)',
                borderRadius: 10, fontSize: '0.78rem', outline: 'none',
                boxSizing: 'border-box', background: 'rgba(255,255,255,0.15)',
                color: '#fff', fontFamily: 'inherit',
              }}
            />
          </div>
        </div>

        {/* Contact list */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {filteredC.map(c => {
            const isActive = c.id === activeId;
            return (
              <div key={c.id} onClick={() => setActiveId(c.id)} style={{
                display: 'flex', gap: 12, padding: '14px 16px', cursor: 'pointer',
                background: isActive ? '#EEF4FB' : 'transparent',
                borderLeft: isActive ? '4px solid ' + BRAND : '4px solid transparent',
                transition: 'all 0.15s',
                alignItems: 'center',
              }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <Avatar initials={c.avatar} size={42} />
                  {c.online && (
                    <div style={{
                      position: 'absolute', bottom: 1, right: 1,
                      width: 11, height: 11, borderRadius: '50%',
                      background: '#22C55E', border: '2px solid #fff',
                    }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontWeight: isActive ? 800 : 700,
                      fontSize: '0.83rem',
                      color: isActive ? BRAND : '#111827',
                    }}>{c.contact}</span>
                    <span style={{ fontSize: '0.65rem', color: '#9CA3AF', flexShrink: 0 }}>{c.lastTime}</span>
                  </div>
                  <div style={{
                    fontSize: '0.73rem', color: '#9CA3AF', marginTop: 3,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{c.lastMsg}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* -- Chat window -- */}
      {active && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

          {/* Chat header */}
          <div style={{
            display: 'flex', gap: 12, alignItems: 'center',
            padding: '14px 22px',
            background: '#fff',
            borderBottom: '1.5px solid #F0F4FA',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            <div style={{ position: 'relative' }}>
              <Avatar initials={active.avatar} size={44} />
              {active.online && (
                <div style={{
                  position: 'absolute', bottom: 2, right: 2,
                  width: 11, height: 11, borderRadius: '50%',
                  background: '#22C55E', border: '2px solid #fff',
                }} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: '0.97rem', color: '#111827' }}>{active.contact}</p>
              <p style={{
                margin: '2px 0 0', fontSize: '0.72rem', fontWeight: 600,
                color: active.online ? '#22C55E' : '#9CA3AF',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: active.online ? '#22C55E' : '#D1D5DB',
                  display: 'inline-block',
                }} />
                {active.online ? 'Online' : 'Offline'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['', '', ''].map(icon => (
                <button key={icon} style={{
                  width: 36, height: 36, borderRadius: '50%',
                  border: '1.5px solid #E5E7EB', background: '#F9FAFB',
                  fontSize: '0.9rem', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>{icon}</button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '20px 22px',
            display: 'flex', flexDirection: 'column', gap: 14,
            background: 'linear-gradient(180deg, #F8FAFD 0%, #F0F4FB 100%)',
          }}>
            {active.messages.map((m, idx) => {
              const isMe = m.from === 'me';
              const showAvatar = !isMe && (idx === 0 || active.messages[idx - 1].from !== 'them');
              return (
                <div key={m.id} style={{
                  display: 'flex',
                  justifyContent: isMe ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end', gap: 8,
                }}>
                  {!isMe && (
                    <div style={{ flexShrink: 0, opacity: showAvatar ? 1 : 0 }}>
                      <Avatar initials={active.avatar} size={30} />
                    </div>
                  )}
                  <div style={{ maxWidth: '62%', display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <div style={{
                      padding: '10px 16px',
                      borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      background: isMe ? BRAND_GRAD : '#fff',
                      color: isMe ? '#fff' : '#1F2937',
                      fontSize: '0.85rem', lineHeight: 1.55,
                      border: isMe ? 'none' : '1.5px solid #EEF2F8',
                      boxShadow: isMe
                        ? '0 4px 14px rgba(26,75,115,0.25)'
                        : '0 2px 8px rgba(0,0,0,0.06)',
                      wordBreak: 'break-word',
                    }}>{m.text}</div>
                    <div style={{
                      fontSize: '0.65rem', color: '#9CA3AF',
                      textAlign: isMe ? 'right' : 'left',
                      paddingLeft: isMe ? 0 : 4,
                      paddingRight: isMe ? 4 : 0,
                    }}>{m.time} {isMe && ''}</div>
                  </div>
                  {isMe && (
                    <div style={{ flexShrink: 0 }}>
                      <Avatar initials="ME" size={30} color="#6366F1" />
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div style={{
            padding: '14px 18px',
            background: '#fff',
            borderTop: '1.5px solid #F0F4FA',
            display: 'flex', gap: 10, alignItems: 'center',
          }}>
            <button style={{
              width: 38, height: 38, borderRadius: '50%',
              border: '1.5px solid #E5E7EB', background: '#F9FAFB',
              fontSize: '1.1rem', cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}></button>
            <input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMsg()}
              placeholder="Write a message..."
              style={{
                flex: 1, padding: '10px 18px',
                border: '1.5px solid #E5E7EB', borderRadius: 24,
                fontSize: '0.86rem', outline: 'none', fontFamily: 'inherit',
                background: '#F8FAFD', transition: 'border 0.15s',
              }}
            />
            <button
              onClick={sendMsg}
              style={{
                width: 44, height: 44, borderRadius: '50%', border: 'none',
                background: BRAND_GRAD, color: '#fff', fontSize: '1.1rem',
                cursor: 'pointer', flexShrink: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(26,75,115,0.35)',
                transition: 'transform 0.15s',
              }}
            >?</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* -- ANNOUNCEMENTS SECTION --------------------------------------- */
const annStyles = {
  pinned: {
    bg: BRAND_GRAD, border: 'none',
    badge: 'Pinned', badgeBg: 'rgba(255,255,255,0.22)', badgeColor: '#fff',
    bodyColor: 'rgba(255,255,255,0.88)', titleColor: '#fff', timeColor: 'rgba(255,255,255,0.65)',
  },
  alert: {
    bg: '#FFF7ED', border: '1.5px solid #FED7AA',
    badge: 'Alert', badgeBg: '#FEF3C7', badgeColor: '#D97706',
    bodyColor: '#4B5563', titleColor: '#111827', timeColor: '#9CA3AF',
  },
  news: {
    bg: '#EFF6FF', border: '1.5px solid #BFDBFE',
    badge: 'News', badgeBg: '#DBEAFE', badgeColor: '#2563EB',
    bodyColor: '#4B5563', titleColor: '#111827', timeColor: '#9CA3AF',
  },
  tip: {
    bg: '#F0FDF4', border: '1.5px solid #BBF7D0',
    badge: 'Tip', badgeBg: '#D1FAE5', badgeColor: '#059669',
    bodyColor: '#4B5563', titleColor: '#111827', timeColor: '#9CA3AF',
  },
};

function AnnouncementsSection() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'pinned', 'alert', 'news', 'tip'];
  const visible = filter === 'All' ? seedAnnouncements : seedAnnouncements.filter(a => a.type === filter);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff',
        borderRadius: 12, border: '1.5px solid #E5E7EB', padding: '14px 18px', marginBottom: 22 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: BRAND_GRAD,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
          
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 800, fontSize: '0.95rem', color: BRAND }}>Admin Announcements</p>
          <p style={{ margin: '3px 0 0', fontSize: '0.78rem', color: '#6B7280' }}>
            Official messages from the Sabkaplacement team � highlighted for all members.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '6px 16px', borderRadius: 20, fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer',
              border: '1.5px solid ' + (filter === f ? BRAND : '#E5E7EB'),
              background: filter === f ? BRAND : '#fff',
              color: filter === f ? '#fff' : '#6B7280',
              textTransform: 'capitalize' }}>{f === 'All' ? 'All Types' : f}</button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {visible.map(ann => {
          const s = annStyles[ann.type];
          return (
            <div key={ann.id} style={{ borderRadius: 14, padding: '20px 22px',
              background: s.bg, border: s.border, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.5rem', flexShrink: 0, marginTop: 2 }}>{ann.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '3px 10px',
                      borderRadius: 20, background: s.badgeBg, color: s.badgeColor }}>{s.badge}</span>
                    <span style={{ fontSize: '0.7rem', color: s.timeColor, fontWeight: 600 }}>{ann.time}</span>
                  </div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '1rem', fontWeight: 800,
                    color: s.titleColor, lineHeight: 1.4 }}>{ann.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.65, color: s.bodyColor }}>{ann.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* -- ROOT -------------------------------------------------------- */
const TABS = [
  { id: 'forum',         label: 'Forum',        sub: 'Ask & Discuss' },
  { id: 'chat',          label: 'Messages',      sub: 'Direct Chat' },
];

export default function Forum() {
  const [activeTab, setActiveTab] = useState('forum');
  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: 'ease-out-cubic', offset: 60 });
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#F4F6FB', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar />
      {/* -- Hero Image with overlay -------------------------------- */}
      <div style={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Full image � no crop */}
        <img
          src="/forum.png"
          alt="Community Forum"
          style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: '320px' }}
        />
      </div>

      {/* -- Title Block below hero --------------------------------- */}
      <div style={{
        background: 'linear-gradient(180deg,#f0f6ff 0%,#f8fbff 100%)',
        textAlign: 'center',
        padding: '44px 24px 0px',
      }}>
        {/* Decorative pill above heading */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: BRAND_LIGHT,
          color: BRAND,
          fontSize: '0.74rem', fontWeight: 700, letterSpacing: '1.2px',
          textTransform: 'uppercase',
          padding: '5px 18px', borderRadius: 30,
          marginBottom: 14,
          border: '1.5px solid #c8dbee',
        }}>
          Welcome to the Hub
        </div>

        <h1 style={{
          margin: '0 0 14px',
          fontSize: 'clamp(2rem,4.5vw,2.8rem)',
          fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.15,
          background: BRAND_GRAD,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>Community Forum</h1>

        {/* Short decorative divider */}
        <div style={{
          width: 56, height: 4, borderRadius: 4,
          background: BRAND_GRAD,
          margin: '0 auto 16px',
        }} />

        <p style={{
          margin: '0 auto',
          maxWidth: 500,
          fontSize: '1rem',
          fontWeight: 400,
          color: '#6B7280',
          lineHeight: 1.85,
          letterSpacing: '0.3px',
          paddingBottom: '36px',
        }}>
          Connect with thousands of professionals. Ask questions, share experiences, and grow together.
          </p>
      </div>

      {/* -- Tab Bar ------------------------------------------------ */}
      <div style={{
        background: 'linear-gradient(180deg,#f8fbff 0%,#fff 100%)',
        borderBottom: 'none',
        boxShadow: '0 3px 16px rgba(0,0,0,0.07)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 940, margin: '0 auto', display: 'flex', flexWrap: 'wrap', padding: '0 16px', justifyContent: 'center' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: '16px 30px', border: 'none', cursor: 'pointer',
              background: 'transparent',
              color: activeTab === t.id ? BRAND : '#6B7280',
              fontWeight: 700, fontSize: '0.88rem',
              borderBottom: activeTab === t.id ? '3px solid ' + BRAND : '3px solid transparent',
              transition: 'all 0.2s',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            }}>
              <span>{t.label}</span>
              <span style={{ fontSize: '0.66rem', fontWeight: 500, opacity: 0.7 }}>{t.sub}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 940, margin: '0 auto', padding: '28px 16px 60px' }}>
        {activeTab === 'forum'         && <ForumSection />}
        {activeTab === 'chat'          && <ChatSection />}

      </div>
      <Footer />
    </div>
  );
}

