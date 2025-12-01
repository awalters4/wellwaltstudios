import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import WWSFooter from "./WWSFooter";
import { mockPosts } from "./data/posts";

export default function ArticlePage() {
  const { slug } = useParams();
  const article = mockPosts.find(post => post.slug === slug && post.type === "article");

  // If article not found or not an article type, redirect to Behind the Build
  if (!article) {
    return <Navigate to="/behind-the-build" replace />;
  }

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
        <nav className="flex items-center space-x-6">
          <Link
            to="/behind-the-build"
            className="text-textGray hover:text-pink transition-colors font-semibold"
          >
            ← Back to Behind the Build
          </Link>
        </nav>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-8 py-12">
        {/* Article Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-purple text-white">
              Article
            </span>
            <time className="text-sm text-textGray">
              {formatDate(article.createdAt)}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight bg-gradient-pink-purple bg-clip-text text-transparent">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-xl md:text-2xl text-textGray italic mb-8 leading-relaxed">
              {article.excerpt}
            </p>
          )}
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          <div className="text-lg text-textDark leading-relaxed whitespace-pre-line bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-glass border-2 border-pink-light/30">
            {article.content}
          </div>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-pink-light/20">
            {article.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-semibold bg-white/80 rounded-full text-textGray border border-pink-light/30"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Back to Behind the Build CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/behind-the-build"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-pink-purple text-white font-semibold rounded-xl shadow-glow-pink hover:scale-105 transition-transform"
          >
            ← Back to all posts
          </Link>
        </div>
      </article>

      <WWSFooter />
    </div>
  );
}
