import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import blogsData from '../../data/blogs.json';
import BlogCard from '../../components/cards/BlogCard';
import { Calendar, User, Clock, ArrowLeft, Share2, MessageCircle } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import { toast } from 'react-toastify';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find active blog
  const blog = useMemo(() => {
    return blogsData.find((b) => b.id === parseInt(id));
  }, [id]);

  // Find 3 related articles from same category, excluding active one
  const relatedBlogs = useMemo(() => {
    if (!blog) return [];
    return blogsData
      .filter((b) => b.category === blog.category && b.id !== blog.id)
      .slice(0, 3);
  }, [blog]);

  if (!blog) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 bg-bg-light">
        <h2 className="text-xl font-bold text-dark">Article Not Found</h2>
        <p className="text-slate-500 text-sm">The article you are trying to reach doesn't exist.</p>
        <Link to="/blog" className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-semibold">
          Return to Library
        </Link>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Health Library', path: '/blog' },
    { label: blog.title, path: `/blog/${blog.id}` }
  ];

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this informative article: ${blog.title}`;
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast.success('Article link copied to clipboard!');
      return;
    }

    let shareUrl = '';
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <SEO
        title={blog.title}
        description={blog.summary}
        keywords={blog.tags.join(', ')}
        path={`/blog/${blog.id}`}
        ogImage={blog.image}
      />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back navigation & Breadcrumbs */}
        <div className="flex flex-col gap-3 mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Library
          </Link>
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Article Container */}
        <article className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm p-6 md:p-10 space-y-6">
          
          {/* Header Metadata */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-primary uppercase bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-block">
              {blog.category}
            </span>
            <h1 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-dark leading-snug">
              {blog.title}
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed italic border-l-4 border-slate-200 pl-4 py-1">
              "{blog.summary}"
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 border-y border-slate-100 py-4 text-xs font-bold text-slate-400">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-400" />
                <span>Written by: {blog.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Published: {blog.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Read Time: {blog.readTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Full Text Body Content */}
          <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-6 pt-4 font-sans whitespace-pre-line">
            {blog.content}
          </div>

          {/* Article Footer Tags & Sharing options */}
          <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap gap-1.5">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-bold bg-slate-100 border border-slate-200/50 rounded-lg px-2.5 py-1 text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Sharing buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                <Share2 className="w-3.5 h-3.5" />
                Share
              </span>
              <button
                onClick={() => handleShare('whatsapp')}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-emerald-500 hover:text-white flex items-center justify-center text-slate-500 transition cursor-pointer"
                title="Share on WhatsApp"
              >
                <FaWhatsapp className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-500 transition cursor-pointer"
                title="Share on Facebook"
              >
                <FaFacebook className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-sky-500 hover:text-white flex items-center justify-center text-slate-500 transition cursor-pointer"
                title="Share on Twitter"
              >
                <FaTwitter className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-primary hover:text-white flex items-center justify-center text-slate-500 transition cursor-pointer font-bold text-xs"
                title="Copy Link"
              >
                🔗
              </button>
            </div>
          </div>
        </article>

        {/* Related Articles Columns */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16 space-y-8">
            <h3 className="font-display font-extrabold text-xl md:text-2xl text-dark">
              Related Articles in {blog.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((rel) => (
                <div key={rel.id}>
                  <BlogCard blog={rel} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogDetails;
