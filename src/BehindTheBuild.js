import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WWSFooter from "./WWSFooter";

// Mock data structure - replace with actual data/API later
const mockPosts = [
  {
    id: "1",
    type: "studio-note",
    title: "Welcome to Behind the Build",
    slug: "welcome-behind-the-build",
    excerpt: "This is the hub for everything happening inside Well Walt Studios...",
    content: "This is the hub for everything happening inside Well Walt Studios — the wins, the challenges, the experiments, and the evolution.\n\nYou'll see:\n\n✦ Studio Notes: quick updates and thoughts from me\n✦ Blogs: the deeper breakdowns — the why, the how, and the lessons\n✦ Vlogs: real-time building, behind-the-scenes work, and product walkthroughs\n✦ Embedded social posts: snapshots of what I'm making day-to-day\n\nIt's all raw, transparent, and straight from the middle of the build. Thanks for tuning in — there's a lot coming.",
    embedUrl: null,
    tags: ["studio-notes", "welcome"],
    createdAt: "2025-11-21T15:00:00Z"
  },
  {
    id: "2",
    type: "studio-note",
    title: "Here's What We Did This Week",
    slug: "weekly-update-nov-21",
    excerpt: "Updates across Gypsy, Aurova, WellWaltStudios, and a productivity ecosystem...",
    content: "Here's what we accomplished this week:\n\n✦ Pushed a fresh update to Gypsy and started laying the groundwork for the mobile app.\n✦ Expanded Aurova with friendships, integrations, and new workflow features.\n✦ Revamped the Well Walt Studios site and rolled out updated service offerings.\n✦ Started building the foundation for a full productivity + home tech ecosystem.\n\nIf you're not locked in yet… you're about to want to be.",
    embedUrl: null,
    tags: ["studio-notes", "weekly-update", "gypsy", "aurova"],
    createdAt: "2025-11-21T10:00:00Z"
  }
];

export default function BehindTheBuild() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [daysUntilBlog, setDaysUntilBlog] = useState(0);

  // Calculate days until first blog
  useEffect(() => {
    const blogDate = new Date('2025-11-23T10:10:00-06:00'); // CST
    const today = new Date();
    const diffTime = blogDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilBlog(diffDays > 0 ? diffDays : 0);
  }, []);

  const filters = [
    { id: "all", label: "All" },
    { id: "article", label: "Articles" },
    { id: "video", label: "Videos" },
    { id: "studio-note", label: "Studio Notes" }
  ];

  const filteredPosts = activeFilter === "all"
    ? mockPosts
    : mockPosts.filter(post => post.type === activeFilter);

  const getPostTypeStyle = (type) => {
    switch(type) {
      case "article":
        return "bg-purple text-white";
      case "video":
        return "bg-pink text-white";
      case "studio-note":
        return "bg-gold-dark text-textDark";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getPostTypeLabel = (type) => {
    switch(type) {
      case "article":
        return "Article";
      case "video":
        return "Video";
      case "studio-note":
        return "Studio Note";
      default:
        return type;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="font-body bg-bgWarm text-textDark min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-8 bg-white/80 backdrop-blur-md shadow-glass sticky top-0 z-50 border-b border-pink-light/20">
        <Link to="/" className="flex items-center space-x-4">
          <img
            src="/favicon.ico"
            alt="Well Walt Studios"
            className="h-12 w-12 rounded-full shadow-glow-pink animate-float"
          />
          <span className="text-xl font-heading bg-gradient-pink-gold bg-clip-text text-transparent font-bold">
            Well Walt Studios
          </span>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-pink-light/30 px-8 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-shimmer opacity-10 animate-shimmer"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
            Behind the Build
          </h1>
          <p className="text-xl md:text-2xl text-textGray mb-8 leading-relaxed">
            Unfiltered updates on the work, the wins, and the human behind the build — in real time.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-8 py-8 bg-white border-b border-pink-light/20 sticky top-[88px] z-40">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-pink-purple text-white shadow-glow-pink'
                    : 'bg-white/80 border-2 border-pink-light/30 text-textGray hover:border-purple hover:scale-105'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="px-8 py-12 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-purple/10 to-pink/10 p-8 rounded-2xl border-2 border-purple/20 shadow-glass text-center">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 bg-gradient-pink-purple bg-clip-text text-transparent">
            First Blog Coming Soon
          </h3>
          <p className="text-lg text-textGray mb-6">
            "Why I Built Aurova"
          </p>
          <div className="inline-flex items-center gap-4 bg-white/80 px-8 py-4 rounded-xl shadow-glass">
            <div className="text-center">
              <div className="text-5xl font-heading font-bold bg-gradient-pink-purple bg-clip-text text-transparent">
                {daysUntilBlog}
              </div>
              <div className="text-sm text-textGray mt-2">
                {daysUntilBlog === 1 ? 'day' : 'days'}
              </div>
            </div>
          </div>
          <p className="text-sm text-textGray mt-4">
            Sunday, November 23 @ 10:10 AM CST
          </p>
        </div>
      </section>

      {/* Content Feed */}
      <section className="px-8 py-12 max-w-4xl mx-auto">
        <div className="space-y-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-textGray">No posts found in this category.</p>
            </div>
          ) : (
            filteredPosts.map(post => (
              <article
                key={post.id}
                className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-[1.02] transition-all duration-300"
              >
                {/* Post Type Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${getPostTypeStyle(post.type)}`}>
                    {getPostTypeLabel(post.type)}
                  </span>
                  <time className="text-sm text-textGray">
                    {formatDate(post.createdAt)}
                  </time>
                </div>

                {/* Post Title */}
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 bg-gradient-pink-purple bg-clip-text text-transparent group-hover:bg-gradient-pink-gold transition-all">
                  {post.title}
                </h2>

                {/* Video Embed */}
                {post.type === "video" && post.embedUrl && (
                  <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                    <div className="relative" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        src={post.embedUrl}
                        title={post.title}
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                {/* Post Excerpt/Content */}
                {post.type === "studio-note" && post.content ? (
                  <div className="text-lg text-textGray leading-relaxed mb-6 whitespace-pre-line">
                    {post.content}
                  </div>
                ) : (
                  <p className="text-lg text-textGray leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                )}

                {/* Read More / View Link (for articles) */}
                {post.type === "article" && (
                  <Link
                    to={`/behind-the-build/${post.slug}`}
                    className="inline-flex items-center gap-2 text-purple hover:text-pink font-semibold transition-colors group-hover:gap-3 transition-all"
                  >
                    Read full article →
                  </Link>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-pink-light/20">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-semibold bg-bgWarm rounded-full text-textGray"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))
          )}
        </div>

        {/* Empty State when no content */}
        {mockPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-12 rounded-2xl border border-pink-light/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-heading font-bold mb-4 bg-gradient-pink-purple bg-clip-text text-transparent">
                Coming Soon
              </h3>
              <p className="text-lg text-textGray mb-6">
                The content feed is being built. Check back soon for articles, vlogs, and studio notes!
              </p>
            </div>
          </div>
        )}
      </section>

      <WWSFooter />
    </div>
  );
}
