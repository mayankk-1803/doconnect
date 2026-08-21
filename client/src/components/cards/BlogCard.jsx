import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

/**
 * Reusable Blog Card for Article Lists
 */
const BlogCard = ({ blog }) => {
  // Color helper depending on categories
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Health': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'Tax Saving': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'Claims': return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <article className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover-card-effect flex flex-col justify-between h-full group">
      
      {/* Blog Image */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img
          src={blog.image}
          alt={blog.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm ${getCategoryColor(blog.category)} bg-white/95 backdrop-blur-sm`}>
          {blog.category}
        </span>
      </div>

      {/* Blog Body */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          {/* Metadata: Date and Read Time */}
          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-semibold mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-dark text-base md:text-lg mb-2.5 leading-snug group-hover:text-primary transition-colors">
            <Link to={`/blog/${blog.id}`} className="focus:outline-none">
              {blog.title}
            </Link>
          </h3>

          {/* Summary snippet */}
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4">
            {blog.summary}
          </p>
        </div>

        {/* Card Actions Footer */}
        <div className="border-t border-slate-100/60 pt-4 flex items-center justify-between mt-auto">
          {/* Author */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-slate-600 truncate max-w-[120px]">
              {blog.author}
            </span>
          </div>

          <Link
            to={`/blog/${blog.id}`}
            className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform"
          >
            Read Article
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
