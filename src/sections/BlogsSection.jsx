import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import blogsData from '../data/blogs.json';
import BlogCard from '../components/cards/BlogCard';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BlogsSection = () => {
  const sectionRef = useRef(null);

  // Take the first 3 articles for the home page list
  const latestBlogs = blogsData.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.blog-wrapper');
      
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-[60px] md:py-[90px] lg:py-[120px] bg-[#F8FBFF] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 border border-secondary/20 px-3.5 py-1.5 rounded-full">
              Resources
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-dark mt-4">
              Latest from Our Health Library
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">
              Educational articles covering tax deductions, claims guides, policy wait-times, and nutritional advice curated by health specialists.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline hover:gap-2.5 transition-all shrink-0"
          >
            Browse all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog) => (
            <div key={blog.id} className="blog-wrapper">
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
